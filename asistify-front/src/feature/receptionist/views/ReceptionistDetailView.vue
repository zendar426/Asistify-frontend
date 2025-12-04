<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-6">
                    <!-- Back button -->
                    <button @click="goBack" class="text-gray-700 hover:text-gray-900">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <!-- Profile Section -->
                    <div class="flex items-center gap-4">
                        <!-- Profile Placeholder -->
                        <div
                            class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-yellow-200 flex items-center justify-center relative">
                            <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
                            </div>
                        </div>

                        <!-- Info -->
                        <div>
                            <h1 class="text-lg font-medium text-gray-900">{{ receptionistName }}</h1>
                            <p class="text-sm text-gray-600">{{ receptionistId }}</p>
                        </div>
                    </div>

                    <!-- Title -->
                </div>

                <!-- Branding -->
                <div class="text-xs text-gray-600">
                    ASYSTIFY | asistify@asistify.cl
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-6 py-8">
            <div class="grid grid-cols-2 gap-6">
                <!-- Llamadas Section -->
                <div>
                    <h3 class="text-sm font-medium text-gray-700 mb-4">Llamadas</h3>
                    <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
                        <h4 class="text-base font-medium text-gray-900 mb-6">Llamadas respondidas</h4>
                        <div class="text-6xl font-light text-gray-900 mb-4">{{ callsAnswered }}</div>
                        <p class="text-sm text-gray-600">{{ callsComparison }}</p>
                    </div>
                </div>

                <!-- Información Section -->
                <div>
                    <h3 class="text-sm font-medium text-gray-700 mb-4">Información</h3>
                    <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
                        <h4 class="text-base font-medium text-gray-900 mb-6">Tiempo de respuesta promedio</h4>
                        <div class="text-6xl font-light text-gray-900 mb-4">{{ avgResponseTime }}</div>
                        <p class="text-sm text-gray-600">{{ responseComparison }}</p>
                    </div>
                </div>

                <!-- Contacto Section -->
                <div>
                    <h3 class="text-sm font-medium text-gray-700 mb-4">Contacto</h3>
                    <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6">
                        <p class="text-xs text-gray-500 mb-4">{{ contactCount }}</p>

                        <!-- Table Header -->
                        <div class="grid grid-cols-[1fr,1.5fr,1fr] gap-4 mb-4 pb-2 border-b border-gray-200">
                            <div class="text-sm font-medium text-gray-700">Nombre</div>
                            <div class="text-sm font-medium text-gray-700">Recepción</div>
                            <div class="text-sm font-medium text-gray-700">Número</div>
                        </div>

                        <!-- Table Rows -->
                        <div class="space-y-4">
                            <div v-for="contact in contacts" :key="contact.number"
                                class="grid grid-cols-[1fr,1.5fr,1fr] gap-4 items-center">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-900">{{ contact.name }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full" :class="{
                                        'bg-green-500': contact.reception === 'satisfecho',
                                        'bg-red-500': contact.reception === 'insatisfecho',
                                        'bg-gray-600': contact.reception === 'No responde'
                                    }"></div>
                                    <span class="text-sm text-gray-900">{{ contact.reception }}</span>
                                </div>
                                <div class="text-sm text-gray-900">{{ contact.number }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Datos exportados Section -->
                <div>
                    <h3 class="text-sm font-medium text-gray-700 mb-4">Datos exportados</h3>
                    <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 flex flex-col gap-4">
                        <!-- Ver información detallada button -->
                        <button @click="viewDetails"
                            class="flex items-center gap-3 text-left hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span class="text-sm text-gray-900">Ver información detallada</span>
                        </button>

                        <!-- Exportar a csv button -->
                        <button @click="exportToCsv"
                            class="flex items-center gap-3 text-left hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div class="w-10 h-10 bg-black rounded flex items-center justify-center flex-shrink-0">
                                <span class="text-white text-xs font-bold">CSV</span>
                            </div>
                            <span class="text-sm text-gray-900">Exportar a csv</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Contact {
    name: string
    reception: 'satisfecho' | 'insatisfecho' | 'No responde'
    number: string
}

interface Props {
    receptionistName?: string
    receptionistId?: string
    callsAnswered?: number
    callsComparison?: string
    avgResponseTime?: string
    responseComparison?: string
    contactCount?: string
    contacts?: Contact[]
}
// TODO: Definir que las props consuman a los endpoints reales.

const props = withDefaults(defineProps<Props>(), {
    receptionistName: 'Recepcionista nuevos clientes',
    receptionistId: '800 300 697',
    callsAnswered: 7,
    callsComparison: '+2 que el día pasado.',
    avgResponseTime: '0.5s',
    responseComparison: '0.1s más rápido que el promedio semanal',
    contactCount: '179.57.233.152' || '',
    contacts: () => [
        {
            name: 'Sergio Sepulveda',
            reception: 'satisfecho',
            number: '9645567698'
        },
        {
            name: 'Carolina Muñoz',
            reception: 'insatisfecho',
            number: '9645567698'
        },
        {
            name: 'Sebastian Vega',
            reception: 'No responde',
            number: '9645567698'
        }
    ]
})

const emit = defineEmits<{
    back: []
    viewDetails: []
    exportCsv: []
}>()

const goBack = () => {
    emit('back')
}

const viewDetails = () => {
    emit('viewDetails')
}

const exportToCsv = () => {
    emit('exportCsv')
}
</script>