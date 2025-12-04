<script setup lang="ts">

import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="flex h-screen">
    <SideBar />
    <main class="flex-1 bg-gray-100 overflow-y-auto sm:ml-64">
      <RouterView />
    </main>
  </div>

</template>

<style scoped>

</style>
