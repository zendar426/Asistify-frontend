<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import ReceptionistConfigView from '@/feature/receptionist/views/ReceptionistConfigView.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <SideBar />

        <div class="sm:ml-64">
            <ReceptionistConfigView />
        </div>
    </div>
</template>
