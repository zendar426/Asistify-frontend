<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import VoipCallModal from './VoipCallModal.vue'
import { Receptionist } from '../models/Receptionist'
import { useReceptionistStore } from '../stores/ReceptionistStore'

interface Props {
    id: string
    name: string
    cellphone?: string
    avatar?: { id: string; url: string }
    levelFormality?: number
    levelDynamism?: number
    anticipationMaxDays?: number
    anticipationMinDays?: number
}

const props = withDefaults(defineProps<Props>(), {
    cellphone: '',
    levelFormality: 5,
    levelDynamism: 5,
    anticipationMaxDays: 30,
    anticipationMinDays: 1
})

const emit = defineEmits<{
    delete: [id: string]
}>()

const router = useRouter()
const receptionistStore = useReceptionistStore()
const showDropdown = ref(false)
const showVoipModal = ref(false)

// Get the full receptionist object from store
const receptionist = computed(() => {
    const found = receptionistStore.receptionist.find(r => r.id === props.id)
    if (found) return found
    
    // Fallback: create a Receptionist object from props
    return new Receptionist(
        props.id,
        props.name,
        props.cellphone,
        props.avatar?.id,
        props.avatar,
        '', // enterpriseInformation
        '', // clientInformation
        '', // businessRestrictions
        props.levelFormality,
        props.levelDynamism,
        props.anticipationMaxDays,
        props.anticipationMinDays
    )
})

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const handleEdit = () => {
    router.push({ 
        name: 'receptionistConfigEdit', 
        params: { id: props.id } 
    })
    showDropdown.value = false
}

const handleDelete = () => {
    emit('delete', props.id)
    showDropdown.value = false
}

const handleCall = () => {
    showVoipModal.value = true
    showDropdown.value = false
}

const closeVoipModal = () => {
    showVoipModal.value = false
}

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
    showDropdown.value = false
}
</script>

<template>
    <div
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        @click="closeDropdown"
    >
        <div class="flex items-start justify-between gap-4 mb-4">
            <!-- Left section: Profile Picture and Info -->
            <div class="flex items-center gap-4 flex-1 min-w-0">
                <!-- Profile Picture -->
                <div class="flex-shrink-0">
                    <div v-if="avatar?.url" class="w-16 h-16 rounded-full overflow-hidden">
                        <img :src="avatar.url" :alt="name" class="w-full h-full object-cover" />
                    </div>
                    <div
                        v-else
                        class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold"
                    >
                        {{ getInitials(name) }}
                    </div>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-dark/90 truncate">{{ name }}</h3>
                    <p v-if="cellphone" class="text-dark/80 text-sm mt-1">
                        <font-awesome-icon icon="fa-solid fa-phone" class="mr-2" />
                        {{ cellphone }}
                    </p>
                </div>
            </div>

            <!-- Right section: Actions Menu -->
            <div class="flex-shrink-0 relative">
                <button
                    @click.stop="toggleDropdown"
                    class="p-2 hover:bg-dark/10 rounded-full transition-colors cursor-pointer"
                >
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="text-dark/80" />
                </button>

                <!-- Dropdown Menu -->
                <div
                    v-if="showDropdown"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-dark/10 z-10"
                    @click.stop
                >
                    <button
                        @click="handleCall"
                        class="w-full px-4 py-2 text-left text-sm text-dark/80 hover:bg-primary/10 flex items-center gap-2 rounded-t-lg"
                    >
                        <font-awesome-icon icon="fa-solid fa-phone" class="text-primary" />
                        Llamar
                    </button>
                    <button
                        @click="handleEdit"
                        class="w-full px-4 py-2 text-left text-sm text-dark/80 hover:bg-dark/10 flex items-center gap-2"
                    >
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-primary" />
                        Editar
                    </button>
                    <button
                        @click="handleDelete"
                        class="w-full px-4 py-2 text-left text-sm text-alert hover:bg-alert/10 flex items-center gap-2 rounded-b-lg"
                    >
                        <font-awesome-icon icon="fa-solid fa-trash" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-dark/20">
            <!-- Formality Level -->
            <div>
                <p class="text-xs text-dark/80 mb-1">Formalidad</p>
                <div class="flex items-center gap-2">
                    <div class="flex-1 bg-dark/10 rounded-full h-2">
                        <div 
                            class="bg-primary h-2 rounded-full"
                            :style="{ width: `${levelFormality * 10}%` }"
                        />
                    </div>
                    <span class="text-xs font-medium text-dark/80">{{ (levelFormality * 10).toFixed(0) }}%</span>
                </div>
            </div>

            <!-- Dynamism Level -->
            <div>
                <p class="text-xs text-dark/80 mb-1">Dinamismo</p>
                <div class="flex items-center gap-2">
                    <div class="flex-1 bg-dark/10 rounded-full h-2">
                        <div 
                            class="bg-green-600 h-2 rounded-full"
                            :style="{ width: `${levelDynamism * 10}%` }"
                        />
                    </div>
                    <span class="text-xs font-medium text-dark/80">{{ (levelDynamism * 10).toFixed(0) }}%</span>
                </div>
            </div>

            <!-- Anticipation Min Days -->
            <div>
                <p class="text-xs text-dark/80 mb-1">Días mínimos</p>
                <p class="text-sm font-semibold text-dark/90">
                    {{ anticipationMinDays }} 
                    <span class="text-xs font-normal text-dark/80">{{ anticipationMinDays === 1 ? 'día' : 'días' }}</span>
                </p>
            </div>

            <!-- Anticipation Max Days -->
            <div>
                <p class="text-xs text-dark/80 mb-1">Días máximos</p>
                <p class="text-sm font-semibold text-dark/90">
                    {{ anticipationMaxDays }} 
                    <span class="text-xs font-normal text-dark/80">{{ anticipationMaxDays === 1 ? 'día' : 'días' }}</span>
                </p>
            </div>
        </div>

        <!-- VoIP Call Modal -->
        <VoipCallModal
            :receptionist="receptionist"
            :is-open="showVoipModal"
            @close="closeVoipModal"
        />
    </div>
</template>
