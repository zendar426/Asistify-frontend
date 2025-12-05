<template>
    <BaseButton variant="secondary" size="lg" @click="showModal=true"> Editar empresa </BaseButton>
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <!-- Header Icon -->
            <div class="flex items-start gap-4 mb-6">
                <div class="bg-indigo-100 rounded-full p-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="flex-1">
                    <h2 class="text-2xl font-semibold text-gray-900">Editar Empresa</h2>
                </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-6">
                Completa los siguientes campos para registrar una nueva empresa en el sistema.
            </p>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Nombre Field -->
                <div>
                    <label for="nombre" class="block text-sm font-medium text-gray-900 mb-2">
                        Nombre
                    </label>
                    <input id="nombre" v-model="formData.name" type="text"
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                </div>

                <!-- Categoría Field -->
                <div>
                    <label for="categoria" class="block text-sm font-medium text-gray-900 mb-2">
                        Categoría
                    </label>
                    <div class="relative">
                        <select id="categoria" v-model="formData.categoryId"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer">
                            <option v-for="category in storedCategories" :value="category.id">{{ category.name }}</option>
                            <!-- <option value="Clínica">Clínica</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Consultorio">Consultorio</option>
                            <option value="Farmacia">Farmacia</option> -->
                        </select>
                        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-3 pt-2">
                    <button type="button" @click="showModal=false"
                        class="px-6 py-2.5 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 text-sm font-medium rounded-full border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/feature/auth/stores/userStore'
import { ref } from 'vue'

let storedCategoriesReq=await api.get("/enterprise-categories")
let storedCategories=storedCategoriesReq.data

let userStore=useUserStore()
let showModal=ref(false)
interface CompanyFormData {
    name: string
    categoryId: string
}

interface Props {
    initialData?: CompanyFormData
}

const props = withDefaults(defineProps<Props>(), {
    initialData: () => ({
        name: 'Clínica Toltén',
        categoryId: 'Clínica',
    })
})

const emit = defineEmits<{
    submit: [data: CompanyFormData]
    cancel: []
}>()

const formData = {
    name: props.initialData.name,
    categoryId: props.initialData.categoryId
}

const handleSubmit = async () => {
    let enterpriseProfile=await api.get(`/enterprise-profiles/profile/${userStore.getUser().id}`)
    let enterpriseId=enterpriseProfile.data[0].enterpriseId
    console.log("tosend ",formData)
    let response=await api.patch(`/enterprises/${enterpriseId}`,formData)
    if (response??{status:400}.status>299){
        //coso
    }
    else{
        window.location.reload()
    }
    
}

const handleCancel = () => {
    emit('cancel')
}
</script>