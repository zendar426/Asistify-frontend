<script setup lang="ts">
interface Props {
  title: string
  value: number | string
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6 border-l-4 border-primary hover:shadow-lg transition-shadow duration-300">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-600 mb-1">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
        <div v-if="trend" class="mt-2 flex items-center text-sm">
          <span
            :class="trend.isPositive ? 'text-green-600' : 'text-red-600'"
            class="font-medium"
          >
            {{ trend.isPositive ? '↑' : '↓' }} {{ Math.abs(trend.value) }}%
          </span>
          <span class="ml-2 text-gray-500">vs último mes</span>
        </div>
      </div>
      <div v-if="icon" class="flex-shrink-0">
        <div class="bg-primary/10 p-3 rounded-full">
          <span class="text-primary text-2xl">{{ icon }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
