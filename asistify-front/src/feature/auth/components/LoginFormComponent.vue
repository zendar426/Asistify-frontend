<script setup lang="ts">
import BaseButton from '../../../components/BaseButton.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'
import { useRouter } from 'vue-router'

let email = ref('')
let password = ref('')

let showLoginIncorrect = ref(false)
const auth = useAuthStore()
const router = useRouter()

function checkData(): boolean {
    console.log('called checkdata')
    if (email.value.trim() == '' || password.value.trim() == '') {
        showLoginIncorrect.value = true
        return false
    }
    return true
}

async function handlelogin() {
    if (checkData()) {
        await auth.loginUser({ email: email.value, password: password.value })
        await router.push('/app/account')
    }
}
</script>

<template>
    <form class="max-w-xl mx-auto" @submit.prevent="handlelogin">
        <h2>Correo</h2>

        <label class="text-red-500" v-show="showLoginIncorrect"
            >Los datos ingresados no son correctos o no están completos.</label
        >
        <div class="mb-5">
            <label
                for="email"
                class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Correo</label
            >
            <input
                type="email"
                id="email"
                v-model="email"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="name@flowbite.com"
                required
            />
        </div>
        Contraseña
        <div class="mb-5">
            <label
                for="password"
                class="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Contraseña</label
            >
            <input
                type="password"
                id="password"
                v-model="password"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="•••••••••"
                required
            />
        </div>
        <BaseButton variant="outline" size="lg" type="submit"> Ingresar </BaseButton>
    </form>
</template>
