<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReceptionistConfigForm from '@/feature/receptionist/components/ReceptionistConfigForm.vue'
import { useReceptionistStore } from '@/feature/receptionist/stores/ReceptionistStore'
import type { Receptionist } from '@/feature/receptionist/models/Receptionist'
import { ReceptionistService } from '../service/ReceptionistService'
import type { Result } from '@/utils/types'
import { useToastStore } from '@/stores/ToastStore'

const route = useRoute()
const router = useRouter()
const receptionistStore = useReceptionistStore()
const receptionistService = ReceptionistService.getInstance()
const toastStore = useToastStore()

const isEditMode = ref(!!route.params.id)
const receptionist = ref<Receptionist | undefined>(undefined)
const loading = ref(true)

onMounted(async () => {
    if (route.params.id) {
        const id = route.params.id as string

        // Try to find in store first
        receptionist.value = receptionistStore.receptionist.find((r) => r.id === id)

        // If not in store, fetch from API
        if (!receptionist.value) {
            // TODO: Fetch from API
            // const result = await receptionistService.findById(id)
            // if (result.success) {
            //     receptionist.value = result.data
            // }
        }

        loading.value = false
    } else {
        // Create mode
        isEditMode.value = false
        loading.value = false
    }
})

const handleUpdate = async (data: Receptionist) => {
    console.log('Update receptionist with data:', data)
    const result: Result<Receptionist | void> = await receptionistService.update(data)

    toastStore.addToast(result.type, result.message)

    router.push({ name: 'receptionist' })
}

const handleClose = () => {
    router.push({ name: 'receptionist' })
}
</script>

<template>
    <div class="min-h-screen bg-background flex flex-col">
        <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
            <div v-if="loading" class="flex justify-center items-center py-12">
                <BaseSpinner size="lg" />
            </div>
            <ReceptionistConfigForm
                v-else
                :is-edit-mode="isEditMode"
                :receptionist="receptionist"
                @submit="handleUpdate"
                @cancel="handleClose"
            />
        </div>
    </div>
</template>
