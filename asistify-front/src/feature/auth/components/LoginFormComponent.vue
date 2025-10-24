<script setup lang="ts">
import router from '@/router';
import BaseButton from '../../../components/BaseButton.vue'
import { ref } from 'vue';

let mockUsers=[
    {"email":"ironmouse@gob.cl","password":"1234"},
    {"email":"test@gmail.com","password":"1234"},
    {"email":"test@test.com","password":"1234"},
    {"email":"jdoe@mann.co","password":"1234"}
]

let email=ref("")
let password=ref("")

let showLoginIncorrect=ref(false)


function checkData():boolean{
    console.log("called checkdata")
    if (email.value.trim()=="" || password.value.trim()==""){
        showLoginIncorrect.value=true
        return false
    }
    for (let index = 0; index < mockUsers.length; index++) {
        const element = mockUsers[index];
        let emailGood=element?.email==email.value
        let passwordGood=element?.password==password.value
        console.log(element?.email,emailGood,email.value,passwordGood)
        if (!emailGood){
            showLoginIncorrect.value=true
            //return false
        }
        if ( emailGood && passwordGood){
            return true
        }
        if (emailGood && !passwordGood){
            showLoginIncorrect.value=true
            //return false;
        }

    }
    return false
}

function login(){
    if (checkData()){
        router.push("/app/account")
    }
}
</script>

<template>
    <form class="max-w-xl mx-auto" @submit.prevent="login">
        <label class="text-red-500" v-show="showLoginIncorrect">Los datos ingresados no son correctos o no están completos.</label>
        <div class="mb-5">
            <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
            <input type="email" id="email" v-model="email"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
            <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" id="password" v-model="password"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required />

            
        </div>
        <!-- <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value=""
                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div> -->

        <BaseButton variant="outline" size="lg" type="submit">
          Ingresar
        </BaseButton>
        
    </form>
</template>