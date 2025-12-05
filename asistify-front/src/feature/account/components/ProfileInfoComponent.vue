<script lang="ts" setup>
import { ref } from 'vue'

import router from '@/router'
import BaseButton from '@/components/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore.ts'

let userName = ref('')
let userSurname = ref('')
let email = ref('')
let orgName = ref('')
let userStore = useAuthStore()
let auth = useAuthStore()

async function toEdit() {
    await router.push('/app/editProfile')
}
</script>

<template>
    <div class="flex justify-end">
        <BaseButton variant="outline" size="lg" type="submit" class="m-5" @click="toEdit">
            <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
            </svg>
        </BaseButton>
    </div>
    <div class="columns-2 mb-5">
        <div>
            <label class="text-2xl font-bold">Nombre</label>
            <p class="text-2xl">{{ auth.userName }}</p>
        </div>
    </div>
    <div class="mb-5">
        <p class="text-2xl font-bold">Correo</p>
        <p class="text-2xl">{{ auth.userEmail }}</p>
    </div>

    <!-- <div>
        <p class="text-2xl font-bold">Nombre de organización</p>
        <p class="text-2xl">{{ orgName }}</p>
    </div> -->
</template>
