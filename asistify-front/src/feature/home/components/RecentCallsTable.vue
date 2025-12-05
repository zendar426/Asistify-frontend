<script setup lang="ts">
import type { ICallHistory } from '@/api/dashboard.ts'

// No es necesario asignar a una variable si solo usas las props en el template,
// pero defineProps es suficiente.
defineProps<{
    history: ICallHistory[]
}>()

const getStatusClass = (status: string) => {
    const atendidaClass = 'bg-[#c6cbe5] text-[#5a69cd]'
    const noAtendidaClass = 'bg-[#5a69cd] text-white'

    // Clases base comunes
    const baseClass = 'px-2 py-1 rounded-full text-xs font-semibold'

    return status === 'Atendida'
        ? `${baseClass} ${atendidaClass}`
        : `${baseClass} ${noAtendidaClass}`
}

// Helper para formatear la hora (asumiendo que viene fecha completa ISO)
const formatTime = (secondsString: string) => {
    // 1. Validaciones básicas
    if (!secondsString) return '-'
    const totalSeconds = parseInt(secondsString, 10)
    if (isNaN(totalSeconds)) return '-'

    // 2. Cálculo matemático
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    // 3. Helper para agregar el cero a la izquierda (ej: 5 -> 05)
    const pad = (num: number) => num.toString().padStart(2, '0')

    // 4. Retorno formato 05:30
    return `${pad(minutes)}:${pad(seconds)}`
}
const toSpanishState = (state: string) => {
    switch (state) {
        case 'completed':
            return 'Atendida'
        case 'missed':
            return 'No Atendida'
        default:
            return state
    }
}

// Helper para duración
const formatDuration = (seconds: number) => {
    return `${seconds} s`
}
</script>

<template>
    <div class="bg-white p-3 rounded-xl shadow-md h-full flex flex-col">
        <h2 class="text-base font-bold mb-4 text-[#263238]">Últimas llamadas a recepcionistas</h2>

        <div class="overflow-x-auto flex-grow">
            <table class="min-w-full table-auto">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-100">
                        <th
                            class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                            Hora
                        </th>
                        <th
                            class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                            Cliente
                        </th>
                        <th
                            class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                            Recepcionista
                        </th>
                        <th
                            class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                            Estado
                        </th>
                        <th
                            class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                            Duración
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-if="history.length === 0">
                        <td colspan="5" class="px-4 py-8 text-center text-sm text-gray-400">
                            No hay llamadas registradas hoy.
                        </td>
                    </tr>

                    <tr
                        v-for="(call, index) in history"
                        :key="index"
                        class="hover:bg-gray-50 transition-colors"
                    >
                        <td class="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                            {{ formatTime(call.date) }}
                        </td>
                        <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                            {{ call.clientName }}
                        </td>
                        <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-600">
                            #{{ call.receptionistId }}
                        </td>
                        <td class="px-3 py-3 whitespace-nowrap">
                            <span :class="getStatusClass(call.state)">
                                {{ toSpanishState(call.state) }}
                            </span>
                        </td>
                        {{
                            formatTime(call.durationInSeconds)
                        }}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
