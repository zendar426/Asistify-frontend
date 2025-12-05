<script setup lang="ts">
import PriceComponent from '@/feature/membership/components/PriceComponent.vue'
import { onMounted } from 'vue'
import LandingNavbar from '@/feature/landing/components/LandingNavbar.vue'
import { useMembershipStore } from '@/stores/membershipStore.ts'

const membershipsStore = useMembershipStore()

// Ensure fetchMemberships is called on mount (pass a function, don't invoke immediately)
onMounted(() => membershipsStore.fetchMemberships())
</script>

<template>
    <div
        class="min-h-screen pb-12 bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100"
    >
        <LandingNavbar />
        <br />
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                Elige el plan ideal para tu negocio
            </h2>
            <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                Encuentra la solución que mejor se adapte a tus necesidades. Con Asistify pagas solo
                por lo que usas y escalas a medida que tu empresa crece.
            </p>
        </div>
        <div
            v-if="membershipsStore.getMemberships.length === 0"
            class="text-center mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400"
        >
            Cargando...
        </div>

        <div
            class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 justify-items-center items-start max-w-6xl mx-auto px-4"
            v-else
        >
            <PriceComponent
                v-for="plan in membershipsStore.getMemberships"
                :key="plan.id"
                v-bind="plan"
            ></PriceComponent>
        </div>
    </div>
</template>

<style scoped></style>
