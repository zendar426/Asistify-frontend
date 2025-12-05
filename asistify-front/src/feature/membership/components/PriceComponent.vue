<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { useMembershipStore } from '@/stores/membershipStore.ts'
import { useRouter } from 'vue-router'
import type { IMembership } from '@/api/membership.ts'

const props = defineProps<IMembership>()

const membershipStore = useMembershipStore()
const router = useRouter()
const handleSelectPlan = () => {
    membershipStore.setSelectedMembership(props.id)
    router.push({ name: 'register' })
}
</script>

<template>
    <div
        class="flex flex-col w-full max-w-sm p-4 bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100 border-gray-200 rounded-lg shadow-sm sm:p-8"
    >
        <h5 class="mb-4 text-xl font-medium text-gray-500">{{ name }}</h5>

        <div class="flex items-baseline text-gray-900">
            <span class="text-5xl font-extrabold tracking-tight">{{
                new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)
            }}</span>
            <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/mes</span>
        </div>

        <p class="mt-4 font-light text-gray-500 dark:text-gray-400">
            {{ description }}
        </p>

        <ul role="list" class="space-y-5 my-7 mb-8">
            <li v-for="(feature, index) in functionalities" class="flex items-center" :key="index">
                <svg
                    class="shrink-0 w-4 h-4 text-blue-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                    />
                </svg>
                <span
                    class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"
                >
                    {{ feature }}
                </span>
            </li>
        </ul>

        <div class="mt-auto text-center">
            <BaseButton size="md" @click="handleSelectPlan">Elegir Plan</BaseButton>
        </div>
    </div>
</template>

<style scoped></style>
