<script lang="ts" setup>
import { ref } from 'vue'

import router from '@/router'
import BaseButton from '@/components/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import api from '@/utils/axios'
import { useUserStore } from '@/feature/auth/stores/userStore'
import ModalCreateEnterprise from '@/feature/enterprise/components/ModalCreateEnterprise.vue'
import ModalEditEnterprise from '@/feature/enterprise/components/ModalEditEnterprise.vue'

let userName = ref('')
let userSurname = ref('')
let email = ref('')
let orgName = ref('')
let userStore = useUserStore()
let auth = useAuthStore()
let enterpriseProfile=await api.get(`/enterprise-profiles/profile/${userStore.getUser().id}`)
let enterpriseDataRequest
let enterpriseData
let isOwner=false
console.log(enterpriseProfile.data)
if (enterpriseProfile.data.length>0){
    isOwner=enterpriseProfile.data[0].isOwner
    enterpriseDataRequest=await api.get(`/enterprises/${enterpriseProfile.data[0].enterpriseId}`)
    enterpriseData=enterpriseDataRequest.data
    console.log(enterpriseData)
    
}

async function toEdit() {
    await router.push('/app/editProfile')
}
</script>

<template>
    <label class="text-3xl md:text-3xl font-bold text-gray-900 mt-10">Información de empresa</label>
    <div v-if="enterpriseProfile.data.length>0">
        <div class="columns-2 mb-5">
            <div>
                <label class="text-2xl font-bold">Nombre de organización:</label>
                <p class="text-2xl">{{ enterpriseData.name }}</p>
            </div>
        </div>
        <div class="columns-2 mb-5">
            <div>
                <label class="text-2xl font-bold">Permisos de administrador:</label>
                <p class="text-2xl">{{ isOwner?"Sí":"No" }}</p>
            </div>
        </div>
        <div v-if="isOwner">
            <ModalEditEnterprise :initial-data="{name:enterpriseData.name,categoryId:enterpriseData.categoryId,}" ></ModalEditEnterprise>
        </div>
    </div>

    <div v-else>
        <label class="text-xl md:text-xl text-gray-900 mt-10">Usted no tiene una empresa creada. Debe crearla para interactuar con el sitio.</label> <br>
        <ModalCreateEnterprise></ModalCreateEnterprise>
    </div>
    


    
</template>
