<script setup lang="ts">
import { api } from '@/api/axios'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/feature/auth/stores/userStore'
import router from '@/router'
import { useMembershipStore } from '@/stores/membershipStore'

import { reactive, ref } from 'vue'


let showModal=ref(false)
type FormData = {
    name: string
    categoryId: string
}

let storedCategoriesReq=await api.get("/enterprise-categories")
let storedCategories=storedCategoriesReq.data

const formData = reactive<FormData>({
    name: '',
    categoryId: ""
})
//!!!!
//const receivedCategories=api.get("/enterprise-categories")
async function openModalOrGo(){
    let membershipStore=useMembershipStore()
    if (membershipStore.getSelectedIdMembership()==""||membershipStore.getSelectedIdMembership()==undefined){
        console.log("no membership lols")
        goSelectMembershipLol()
        return;
    }
    showModal.value=true;
}

async function handleSubmit() {
    // Manejo del envío: por ejemplo enviar a API o emitir evento
    //formData.categoryId="a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"
    console.log('Enviar empresa:', { ...formData })
    let res=await api.post("/enterprises",formData)
    if (res.status>201){
        //a
        console.log("failed ",res.status, " details ", res.data)
    }
    let enterpriseId=res.data.id
    let userStore=useUserStore();
    let membershipStore=useMembershipStore()
    
    let enterpriseProfileBody={
        enterpriseId,
        profileId:userStore.getUser().id,
        isOwner:true,
        membershipId:membershipStore.getSelectedIdMembership()
    }
    console.log("coso perfil empresa ", {...enterpriseProfileBody})
    //console.log((await api.post("/enterprise-profiles",enterpriseProfileBody)).headers)
    let profileRequest=await api.post("/enterprise-profiles",enterpriseProfileBody)
    console.log(profileRequest)
    showModal.value=false
    window.location.reload()
}

async function goSelectMembershipLol(){
    router.push({name:"membership",query:{"backToThingy":"yessir"}})
}
</script>

<template>
    <BaseButton variant="primary" size="lg" @click="openModalOrGo"> Crear empresa </BaseButton>
    <!-- <button @click="showModal = true">Crear Empresa</button> -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <!-- Header -->
            <div class="flex items-start gap-4 mb-6">
                <div class="bg-indigo-100 rounded-full p-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Crear nueva empresa</h2>
                    <p class="text-sm text-gray-600 mt-1">
                        Completa los siguientes campos para registrar una nueva empresa en el
                        sistema.
                    </p>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Nombre Field -->
                <div>
                    <label for="nombre" class="block text-sm font-semibold text-gray-900 mb-2">
                        Nombre
                    </label>
                    <input required id="nombre" v-model="formData.name" type="text" placeholder="Ej. Mi empresa S.A"
                        class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                </div>

                <!-- Categoría Field -->
                <div>
                    <label for="categoria" class="block text-sm font-semibold text-gray-900 mb-2">
                        Categoría
                    </label>
                    <div class="relative">
                        <select required id="categoria" v-model="formData.categoryId"
                            class="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-500 cursor-pointer">
                            <option value="" disabled>Selecciona la categoría</option>
                            <option v-for="category in storedCategories" :value="category.id">{{ category.name }}</option>
                            <!-- <option value="tecnologia">Tecnología</option>
                            <option value="comercio">Comercio</option>
                            <option value="servicios">Servicios</option>
                            <option value="manufactura">Manufactura</option>
                            <option value="educacion">Educación</option> -->
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        </div>
                    </div>
                </div>

                

                <!-- Submit Button -->
                <div class="flex justify-end pt-2">
                    <button @click="showModal=false"
                        class=" mr-5 px-8 py-2.5 bg-violet text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-8 py-2.5 bg-white text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
                        Crear
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>