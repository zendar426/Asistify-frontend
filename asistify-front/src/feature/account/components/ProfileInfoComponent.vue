<script lang="ts" setup>
import FormInput from '@/feature/receptionist/components/FormInput.vue';
import { onMounted, ref } from 'vue';
import EditableText from './EditableText.vue';
import { useUserStore } from '@/feature/auth/stores/userStore';

import router from '@/router';
import BaseButton from '@/components/BaseButton.vue';
let userName=ref("")
let userSurname=ref("")
let email=ref("")
let orgName=ref("")
let userStore=useUserStore()
onMounted(()=>{
    userStore.updateUser({
        name:"John",
        surname:"Doe",
        orgName:"Mann Co.",
        email:"jdoe@mann.co"
    })
    userName.value=userStore.user.asJson()["name"]
    userSurname.value=userStore.user.asJson()["surname"]
    email.value=userStore.user.asJson()["email"]
    orgName.value=userStore.user.asJson()["orgName"]

})

function toEdit(){
    router.push("/app/editProfile")
}
</script>

<template>
    <div class="flex justify-end">
         <BaseButton variant="outline" size="lg" type="submit" class="m-5" @click="toEdit">
<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
                        </BaseButton>
        

    </div>
    <div class="columns-2 mb-5">
        <div>
            <label class="text-2xl font-bold">Nombre</label>
            <p class="text-2xl">{{userName}}</p>
        </div>
        <div>
            
            <p class="text-2xl font-bold">Apellido</p>
            <p class="text-2xl">{{userSurname}}</p>
        </div>
    </div>

    <div class="mb-5">
        <p class="text-2xl font-bold">Correo</p>
        <p class="text-2xl">{{ email }}</p>
    </div>

    <div>
        <p class="text-2xl font-bold">Nombre de organización</p>
        <p class="text-2xl">{{ orgName }}</p>
    </div>
</template>

