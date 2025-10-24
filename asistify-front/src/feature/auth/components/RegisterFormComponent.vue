<script setup lang="ts">
import router from '@/router';
import BaseButton from '../../../components/BaseButton.vue'
import { ref } from 'vue';

let mockUsers=[
    {"email":"ironmouse@gob.cl","password":"1234"},
    {"email":"test@gmail.com","password":"1234"},
    {"email":"test@test.com","password":"1234"}
]

let rut=ref("")
let email=ref("")
let name=ref("")
let surname=ref("")
let password=ref("")
let passwordVerify=ref("")

let showRegisterIncorrect=ref(false)
let showRutInvalid=ref(false)
let showPasswordMismatch=ref(false)
function validateRut(fullRut: string) {
    let rutNoDot=fullRut.replace(/\./g, "");
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rutNoDot))
        return false;
    var tmp = rutNoDot.split('-');
    var digv = tmp[1];
    var rut = tmp[0]!;
    if (digv == 'K') digv = 'k';
    return (dv(parseInt(rut)) == digv);
}
function dv(T: number) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

function checkData():boolean{
    const rutValid=validateRut(rut.value)
    const emailUsed=mockUsers.filter((user)=> user.email==email.value).length>0
    if (emailUsed){
        return false
    }

    if (!rutValid){
        showRutInvalid.value=true
        return false
    }

    if (password.value!=passwordVerify.value){
        //TODO: MOSTRAR ERROR DE CONTRASEÑA O ALGO
        showPasswordMismatch.value=true
        return false
    }

    return true
    
}

function register(){
    if (checkData()){
        router.push("/auth/login")
    }
}
</script>

<template>
    <form class="max-w-xl mx-auto" @submit.prevent="register">
        <label class="text-red-500" v-show="showRegisterIncorrect">Los datos ingresados no son correctos o no están completos.</label>
        <div class="mb-5">
            <label for="rut" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">RUT empresa</label>
            <input type="text" id="rut" v-model="rut" placeholder="11.111.111-1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                 required />

            <label class="text-red-500" v-show="showRutInvalid">El rut ingresado no es válido.</label>
        </div>
        <div class="mb-5">
            <label for="email" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
            <input type="email" id="email" v-model="email"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="name@flowbite.com" required />
        </div>

        <div class="columns-2">
            <div class="mb-5">
            <label for="nombre" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
            <input type="text" id="nombre" v-model="name" placeholder="Juan"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required />
            </div>

             <div class="mb-5">
            <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
            <input type="text" id="apellido" v-model="surname" placeholder="Lagos"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required />

            
        
        </div>

         
            
            
        </div>

        <div class="mb-5">
            <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input type="password" id="password" v-model="password"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required />

            
        
        </div>

         <div class="mb-5">
            <label for="password" class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña</label>
            <input type="password" id="passwordVerify" v-model="passwordVerify"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                required />

            
        
        </div>

        <label class="text-red-500" v-show="showPasswordMismatch">Las contraseñas no coinciden.</label>
        

       
        
        <!-- <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value=""
                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div> -->

        <BaseButton variant="outline" size="lg" type="submit">
          Registrarse
        </BaseButton>
        
    </form>
</template>