<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import ReceptionistConfigView from '@/feature/receptionist/views/ReceptionistConfigView.vue'
import ReceptionistConfigForm from '@/feature/receptionist/components/ReceptionistConfigForm.vue'
import { ReceptionistService } from '../service/ReceptionistService'
import type { Receptionist } from '../models/Receptionist'
import type { Result } from '@/utils/types'
import { useToastStore } from '@/stores/ToastStore'
import type { ReceptionistData } from '../dto/ReceptionistData'
import { logger } from '@/utils/logger'
import { useRouter } from 'vue-router'

const router = useRouter()
const receptionistService = ReceptionistService.getInstance()
const toastStore = useToastStore()

const handleSubmit = async (data: ReceptionistData) => {
    logger.debug('Submitting form with data:', data);
    const result: Result<Receptionist | void> = await receptionistService.create(data);
    
    toastStore.addToast(result.type, result.message);
    
    router.push({ name: 'receptionist' })
}

const handleCancel = () => {
    logger.debug('Form submission canceled')

    router.push({ name: 'receptionist' })
}

</script>

<template>
    <div class="flex min-h-screen bg-background flex-col ">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
            <div class="border-l-4 border-primary pl-4 mb-8">
                <h1 class="text-3xl font-bold text-dark/90">Configuración de Recepcionista</h1>
                <p class="text-dark/80 mt-2">Configura los detalles de tu recepcionista virtual</p>
            </div>
            <ReceptionistConfigForm @submit="handleSubmit" @cancel="handleCancel" />  
        </div>
    </div>
</template>
