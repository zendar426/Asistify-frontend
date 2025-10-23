<script setup lang="ts">
import { ref } from 'vue'

// Mock data for recent calls
const recentCalls = ref([
  {
    id: 1,
    time: '10:30',
    caller: 'María González',
    receptionist: 'Jane Doe',
    status: 'Atendida',
    duration: '5m 23s'
  },
  {
    id: 2,
    time: '10:15',
    caller: 'Carlos Rodríguez',
    receptionist: 'John Smith',
    status: 'Atendida',
    duration: '3m 45s'
  },
  {
    id: 3,
    time: '09:58',
    caller: 'Ana Martín',
    receptionist: 'Emily Davis',
    status: 'Atendida',
    duration: '7m 12s'
  },
  {
    id: 4,
    time: '09:42',
    caller: 'Pedro Sánchez',
    receptionist: 'Jane Doe',
    status: 'No atendida',
    duration: '-'
  },
  {
    id: 5,
    time: '09:25',
    caller: 'Laura López',
    receptionist: 'John Smith',
    status: 'Atendida',
    duration: '4m 18s'
  }
])

const getStatusClass = (status: string) => {
  // El tono más claro de la paleta anterior: #c6cbe5
  const atendidaClass = 'bg-[#c6cbe5] text-[#5a69cd] px-2 py-1 rounded-full text-xs';

  // Tu color base (el más oscuro): #5a69cd
  const noAtendidaClass = 'bg-[#5a69cd] text-white px-2 py-1 rounded-full text-xs';

  return status === 'Atendida'
    ? atendidaClass
    : noAtendidaClass;
}
</script>

<template>
  <div class="bg-white p-3 rounded-xl shadow-md">
    <h2 class="text-lg font-semibold mb-2">Últimas llamadas a recepcionistas</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-50">
            <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
            <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recepcionista</th>
            <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="call in recentCalls" :key="call.id" class="hover:bg-gray-50">
            <td class="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ call.time }}
            </td>
            <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
              {{ call.caller }}
            </td>
            <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
              {{ call.receptionist }}
            </td>
            <td class="px-2 py-2 whitespace-nowrap">
              <span :class="getStatusClass(call.status)">
                {{ call.status }}
              </span>
            </td>
            <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
              {{ call.duration }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
