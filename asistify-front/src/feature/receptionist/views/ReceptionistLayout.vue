<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import ReceptionistView from '@/feature/receptionist/views/ReceptionistView.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <SideBar />

        <div class="sm:ml-64">
            <ReceptionistView />
        </div>
    </div>
</template>

<style scoped></style>
