<script setup lang="ts">
import router from '@/router';
import BaseButton from '../../../components/BaseButton.vue'
import { ref } from 'vue';

let mockUsers=[
    {"email":"ironmouse@gob.cl","password":"1234"},
    {"email":"test@gmail.com","password":"1234"},
    {"email":"test@test.com","password":"1234"}
]

let email=ref("")
let password=ref("")

let showLoginIncorrect=ref(false)


function checkData():boolean{
    if (email.value.trim()=="" || password.value.trim()==""){
        showLoginIncorrect.value=true
        return false
    }
    for (let index = 0; index < mockUsers.length; index++) {
        const element = mockUsers[index];
        let emailGood=element?.email==email.value
        let passwordGood=element?.password==password.value
        if (!emailGood){
            showLoginIncorrect.value=true
            return false
        }
        if ( emailGood && passwordGood){
            return true
        }
        if (emailGood && !passwordGood){
            showLoginIncorrect.value=true
            return false;
        }

    }
    return false
}

function login(){
    if (checkData()){
        router.push("/lol")
    }
}
</script>

<template>
    <form class="max-w-xl mx-auto" @submit.prevent="login">
        <label class="text-red-500" v-show="showLoginIncorrect">Los datos ingresados no son correctos o no están completos.</label>
        <div class="mb-5">
            <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
            <input type="email" id="email" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
            <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" id="password" v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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