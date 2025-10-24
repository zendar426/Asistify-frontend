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

function goBack(){
    router.go(-1)
}

function saveUpdatedData(){
    router.push("/app/cuenta")
}
</script>
<template>
    <form @submit.prevent="saveUpdatedData">

        <div class="columns-2 mb-5">
            <div>
                <FormInput v-model="userName" label="Nombre" placeholder="Juan" :maxlength="50" :isrequired="true" />
            </div>
            <div>

                <FormInput v-model="userSurname" label="Apellido" placeholder="Juan" :maxlength="50"
                    :isrequired="true" />
            </div>
        </div>

        <div class="mb-5">
            <FormInput v-model="email" label="Correo" placeholder="Juan" :maxlength="50" :isrequired="true" />
        </div>

        <div class="mb-5">
            <FormInput v-model="orgName" label="Nombre de organización" placeholder="Juan" :maxlength="50"
                :isrequired="true" />
        </div>

        <div class="flex justify-center m-5 columns-2">
            <BaseButton variant="secondary" size="lg" @click="goBack" class="m-5">
                Cancelar
            </BaseButton>
            <BaseButton variant="outline" size="lg" type="submit" class="m-5">
                Guardar
            </BaseButton>
        </div>
    </form>
</template>

