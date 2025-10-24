<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  namePlan: {
    type: String,
    default: 'Standard plan'
  },
  price: {
    type: Number,
    default: 49990
  },
  description: {
    type: String,
    default: 'The standard plan is perfect for small teams or individuals who need to manage their tasks and projects efficiently.'
  },
  features: {
    type: Array as () => string[],
    default: () => [
      '2 team members',
      '20GB Cloud storage',
      'Integration help',
      'Sketch Files',
      'API Access',
      'Complete documentation',
      '24×7 phone & email support'
    ]
  },
});
</script>

<template>
  <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100">
    <h5 class="mb-4 text-xl font-medium text-gray-500">{{ namePlan }}</h5>
    <div class="flex items-baseline text-gray-900 ">
      <span class="text-3xl font-semibold"></span>
      <span class="text-5xl font-extrabold tracking-tight">{{ new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price) }}</span>
      <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/mes</span>
    </div>
    <ul role="list" class="space-y-5 my-7">
      <li>
        <span class="shrink-0 w-4 h-4 text-blue-700 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">{{description}}</span>
      </li>
      <li v-for="(feature, index) in features" class="flex" :key="index">
        <svg class="shrink-0 w-4 h-4 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{{feature}}</span>
      </li>

    </ul>
    <div class=" text-center">
      <RouterLink :to="{name: 'register', query: { plan: namePlan }}">
    <BaseButton size="md">Elegir Plan</BaseButton>
      </RouterLink>
    </div>
    </div>


</template>

<style scoped>

</style>
