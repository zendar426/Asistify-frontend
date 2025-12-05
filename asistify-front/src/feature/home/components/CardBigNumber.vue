<script setup lang="ts">
// Props
defineProps<{
  number: number,
  description?: string
}>()

</script>

<template>
  <div class="flex flex-col items-center justify-center bg-white shadow rounded-lg h-20 w-full font-bold text-gray-900 border-l-4 border-primary">
    <div class="text-2xl">{{number}}</div>
    <div class="text-sm">{{description}}</div>
  </div>

</template>

<style scoped>

</style>
