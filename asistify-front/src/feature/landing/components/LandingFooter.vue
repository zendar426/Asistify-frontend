<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white border-t border-gray-200 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center text-gray-600 text-sm">
        <p>© Asistify {{ currentYear }} | UFRO - P. Innov.</p>
      </div>
    </div>
  </footer>
</template>
