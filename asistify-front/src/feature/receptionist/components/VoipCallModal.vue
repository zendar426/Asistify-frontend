<script setup lang="ts">
import { ref, onBeforeUnmount, computed, watch } from 'vue'
import { Device, Call } from '@twilio/voice-sdk'
import type { Receptionist } from '../models/Receptionist'
import { logger } from '@/utils/logger'
import api from '@/utils/axios'

interface Props {
    receptionist: Receptionist
    isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
}>()

// VoIP state
let device: Device | null = null
let connection: Call | null = null
const callStatus = ref<'disconnected' | 'ready' | 'connecting' | 'connected'>('disconnected')
const statusMessage = ref('Initializing...')
const identity = ref('user_' + Math.random().toString(36).substr(2, 9))
const isCallInProgress = ref(false)

// Server configuration
const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const canCall = computed(() => callStatus.value === 'ready' && !isCallInProgress.value)
const canHangup = computed(() => isCallInProgress.value)

const statusClass = computed(() => {
    switch (callStatus.value) {
        case 'disconnected':
            return 'bg-alert/10 text-alert/90 border-red-200'
        case 'ready':
            return 'bg-positive/10 text-positive/90 border-positive/50'
        case 'connecting':
            return 'bg-paused/10 text-yellow-600 border-paused/50'
        case 'connected':
            return 'bg-primary/10 text-blue-600 border-blue-200 animate-pulse'
        default:
            return 'bg-dark/10 text-gray-600 border-gray-200'
    }
})

function updateStatus(message: string, status: typeof callStatus.value) {
    statusMessage.value = message
    callStatus.value = status
    logger.debug(`VoIP status updated: ${status} - ${message}`)
}

// --- Microphone processing (Web Audio) ---
let audioContext: AudioContext | null = null
let rawStream: MediaStream | null = null
let processedStream: MediaStream | null = null
let sourceNode: MediaStreamAudioSourceNode | null = null
let gainNode: GainNode | null = null
const micGain = ref<number>(1)
const isTalking = ref(false)

async function startMicProcessing() {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            logger.warn('getUserMedia not available in this browser')
            return
        }

        rawStream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        sourceNode = audioContext.createMediaStreamSource(rawStream)
        gainNode = audioContext.createGain()
        gainNode.gain.value = micGain.value

        const dest = audioContext.createMediaStreamDestination()

        sourceNode.connect(gainNode)
        gainNode.connect(dest)

        processedStream = dest.stream
        logger.debug('Mic processing started, gain =', micGain.value)
    } catch (err: any) {
        logger.error('Failed to start mic processing', err)
    }
}

function stopMicProcessing() {
    try {
        if (rawStream) {
            rawStream.getTracks().forEach((t) => t.stop())
            rawStream = null
        }

        if (audioContext) {
            try { audioContext.close() } catch (_) { /* ignore */ }
            audioContext = null
        }

        sourceNode = null
        gainNode = null
        processedStream = null
        logger.debug('Mic processing stopped')
    } catch (err: any) {
        logger.error('Error stopping mic processing', err)
    }
}

function setMicGain(value: number) {
    micGain.value = value
    if (gainNode) gainNode.gain.value = value
}

function startTalking() {
    isTalking.value = true
    if (connection) {
        connection.mute(false)
        logger.debug('Push to talk: started talking (unmuted) and sent message')
    }
}

function stopTalking() {
    isTalking.value = false
    if (connection) {
        connection.mute(true)
        logger.debug('Push to talk: stopped talking (muted) and sent message')
    }
}

// keep gain node in sync if user changes slider
watch(micGain, (v) => { if (gainNode) gainNode.gain.value = v })

async function setupDevice() {
    try {
        logger.info('Setting up Twilio Device for receptionist:', props.receptionist.name)
        updateStatus('Requesting access token...', 'connecting')

        // Get token from backend
        const response = await api.get(
            `${SERVER_URL}/twilio/token?identity=${identity.value}&receptionistId=${props.receptionist.id}`,
        )
        const data = await response.data

        if (data.error) {
            updateStatus('❌ Error: ' + data.message, 'disconnected')
            logger.error('Token error:', data)
            return
        }

        logger.debug('Token received from backend')
        updateStatus('Conectando dispositivo...', 'connecting')

        // Initialize Twilio Device
        const newDevice = new Device(data.token, {
            codecPreferences: ['opus' as any, 'pcmu' as any],
            logLevel: 1,
        })

        newDevice.on('registered', () => {
            updateStatus('✅ Listo para llamar!', 'ready')
            logger.info('Device registered and ready')
        })

        newDevice.on('error', (error) => {
            updateStatus('❌ Error de dispositivo: ' + error.message, 'disconnected')
            logger.error('Device error:', error)
        })

        // Register the device
        await newDevice.register()
        logger.debug('Device registration initiated')

        // Handle incoming connections
        newDevice.on('incoming', (call: Call) => {
            logger.info('Incoming call received')
            connection = call
            setupCallHandlers(call)
            call.accept()
        })

        device = newDevice
    } catch (error: any) {
        updateStatus('❌ Error de conexión: ' + error.message, 'disconnected')
        logger.error('Setup error:', error)
    }
}

function setupCallHandlers(call: Call) {
    call.on('accept', () => {
        updateStatus('📞 Llamada en curso - ¡Habla ahora!', 'connected')
        isCallInProgress.value = true
        logger.info('Call accepted and connected')
    })

    call.on('disconnect', () => {
        updateStatus('✅ Listo para llamar!', 'ready')
        isCallInProgress.value = false
        connection = null
        logger.info('Call disconnected')
    })

    call.on('cancel', () => {
        updateStatus('✅ Listo para llamar!', 'ready')
        isCallInProgress.value = false
        connection = null
        logger.info('Call cancelled')
    })

    // Mute event
    call.on('mute', (isMuted: boolean, call: Call) => {
        logger.info('Device mute event, isMuted =', isMuted)
        call.mute(isMuted)
        isMuted ? call.sendDigits("1") : call.sendDigits("0")
    })
}

async function handleCall() {
    if (device) {
        updateStatus('☎️ Conectando llamada...', 'connecting')
        logger.info('Initiating call to receptionist:', props.receptionist.name)

        try {
            const options: any = {
                params: {
                    receptionistId: props.receptionist.id,
                    receptionistName: props.receptionist.name,
                },
            }

            // If we have a processed mic stream, try passing it to Twilio connect.
            // The SDK may accept a `localStream` option; cast to any to avoid TS mismatches.
            if (processedStream) {
                options.localStream = processedStream
                logger.debug('Passing processed localStream to Twilio connect')
            }

            const call = await (device as any).connect(options)
            connection = call
            setupCallHandlers(call)
        } catch (error: any) {
            updateStatus('❌ Error de llamada: ' + error.message, 'disconnected')
            logger.error('Call error:', error)
        }
    }
}

function handleHangup() {
    if (connection) {
        logger.debug('Hanging up call')
        connection.disconnect()
    }
}

function handleClose() {
    logger.debug('Closing VoIP modal')
    cleanupVoIP()
    emit('close')
}

function cleanupVoIP() {
    logger.debug('Cleaning up VoIP resources')

    // Disconnect any active call before closing
    if (connection) {
        logger.debug('Disconnecting active call during cleanup')
        connection.disconnect()
        connection = null
    }

    // Destroy device completely (this closes WebSocket and stops heartbeats)
    if (device) {
        logger.debug('Destroying Twilio device')
        device.destroy()
        device = null
    }

    // Stop and release mic processing resources
    try { stopMicProcessing() } catch (e) { logger.debug('stopMicProcessing error', e) }

    // Reset state
    updateStatus('Disconnected', 'disconnected')
    isCallInProgress.value = false
}

// Watch for modal open/close to setup/cleanup device
watch(
    () => props.isOpen,
    async (isOpen) => {
        if (isOpen) {
                try {
                    // start mic capture/processing early so user can adjust gain before calling
                    await startMicProcessing()
                    await setupDevice()
                } catch (error) {
                logger.error('Failed to initialize VoIP:', error)
                updateStatus('❌ Falló al cargar el cliente VoIP', 'disconnected')
            }
        } else {
            // Modal is closing, cleanup immediately
            cleanupVoIP()
        }
    },
)

onBeforeUnmount(() => {
    logger.debug('VoIP modal unmounting, cleaning up resources')
    cleanupVoIP()
})
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                @click.self="handleClose"
            >
                <div
                    class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 transform transition-all"
                    @click.stop
                >
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-dark/90">Recepcionista Virtual</h2>
                            <p class="text-sm text-dark/80 mt-1">
                                Llamando: <span class="font-semibold">{{ receptionist.name }}</span>
                            </p>
                        </div>
                        <button
                            @click="handleClose"
                            class="p-2 hover:bg-dark/10 rounded-full transition-colors"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-xmark"
                                class="text-dark/80 text-xl"
                            />
                        </button>
                    </div>

                    <!-- Status -->
                    <div :class="['p-4 rounded-lg mb-6 font-medium border', statusClass]">
                        {{ statusMessage }}
                        <span v-if="callStatus === 'connecting'" class="inline-block ml-2">
                            <font-awesome-icon icon="fa-solid fa-spinner" spin />
                        </span>
                    </div>

                    <!-- Call Controls -->
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <button
                            @click="handleCall"
                            :disabled="!canCall"
                            class="py-4 px-6 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                        >
                            <font-awesome-icon icon="fa-solid fa-phone" class="mr-2" />
                            Iniciar llamada
                        </button>
                        <button
                            @click="handleHangup"
                            :disabled="!canHangup"
                            class="py-4 px-6 bg-alert text-white rounded-lg font-semibold text-lg hover:bg-alert/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                        >
                            <font-awesome-icon icon="fa-solid fa-phone-slash" class="mr-2" />
                            Colgar
                        </button>
                        <button
                            @mousedown="startTalking"
                            @mouseup="stopTalking"
                            @mouseleave="stopTalking"
                            :disabled="!isCallInProgress"
                            :class="[
                                'py-4 px-6 rounded-lg font-semibold text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
                                isTalking ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-secondary text-white hover:bg-secondary/90'
                            ]"
                        >
                            <font-awesome-icon icon="fa-solid fa-microphone" class="mr-2" />
                            Push to Talk
                        </button>
                    </div>

                    <!-- Mic Gain Control -->
                    <div class="mb-6">
                        <label class="block text-sm text-dark/80 mb-2 font-medium">Volumen del micrófono</label>
                        <div class="flex items-center gap-3">
                            <input
                                type="range"
                                min="0.2"
                                max="3"
                                step="0.1"
                                v-model.number="micGain"
                                @input="setMicGain(micGain)"
                                class="w-full"
                            />
                            <div class="w-16 text-right text-sm text-dark/80">{{ (micGain * 100).toFixed(0) }}%</div>
                        </div>
                        <p class="text-xs text-dark/60 mt-2">Aumenta el volumen de entrada del micrófono. Ten cuidado con la distorsión al subir mucho.</p>
                    </div>

                    <!-- Info -->
                    <div class="bg-gray-50 p-4 rounded-lg text-sm text-dark/80">
                        <p class="font-semibold mb-2">Instrucciones:</p>
                        <ol class="list-decimal list-inside space-y-1 mb-3">
                            <li>Haz clic en "Iniciar llamada" para conectarte con el recepcionista</li>
                            <li>Permite el acceso al micrófono cuando se te solicite</li>
                            <li>¡Habla con {{ receptionist.name }}!</li>
                        </ol>
                        <p class="text-xs">
                            <span class="font-semibold">Identidad:</span> {{ identity }}
                        </p>
                    </div>

                    <!-- Receptionist Details -->
                    <div class="mt-4 p-4 bg-primary/5 rounded-lg">
                        <p class="text-xs font-semibold text-dark/80 mb-2">
                            Configuración del Recepcionista:
                        </p>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span class="text-dark/80">Formalidad:</span>
                                <span class="font-semibold ml-1"
                                    >{{ (receptionist.formalityLevel || 0.5) * 100 }}%</span
                                >
                            </div>
                            <div>
                                <span class="text-dark/80">Dinamismo:</span>
                                <span class="font-semibold ml-1"
                                    >{{ (receptionist.dynamismLevel || 0.5) * 100 }}%</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
