<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import ReceptionistConfigView from '@/feature/receptionist/views/ReceptionistConfigView.vue'
import ReceptionistConfigForm from '@/feature/receptionist/components/ReceptionistConfigForm.vue'
</script>

<template>
    <div class="flex min-h-screen bg-background flex-col ">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
            <div class="border-l-4 border-primary pl-4 mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Configuración de Recepcionista</h1>
                <p class="text-gray-600 mt-2">Configura los detalles de tu recepcionista virtual</p>
            </div>
            <ReceptionistConfigForm />  
        </div>
    </div>
</template>
