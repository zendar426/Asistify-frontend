<script setup lang="ts">

import NavbarPublic from "@/components/NavbarPublic.vue";
import PriceComponent from "@/feature/membership/components/PriceComponent.vue";
import {useMemberships} from "@/feature/membership/composables/useMemberships.ts";
import {onMounted} from "vue";
import LandingNavbar from "@/feature/landing/components/LandingNavbar.vue";

const { memberships, loading, error, fetchMemberships } = useMemberships()
onMounted(fetchMemberships)

const memberShips = [
  {
    namePlan : "Plan Básico",
    price :19990,
    description: "Para negocios que no quieran perder ni una llamada.",
    features : [
      "1 recepcionista virtual",
      "Hasta 300 llamadas al mes",
      "Memoria de hasta 50 clientes",
      "Panel de métricas básico",
    ]
  },
  {
    namePlan : "Plan Pro",
    price :49990,
    description : "La opción ideal para negocios en crecimiento que necesiten mayor capacidad.",
    features : [
      "3 recepcionistas virtuales",
      "Hasta 1000 llamadas al mes",
      "Memoria de hasta 500 clientes",
      "Panel de métricas avanzado",
    ]
  },
  {
    namePlan : "Plan Empresa",
    price :99990,
    description: "La solución completa para empresas que buscan escalar sin límites.",
    features : [
      "Recepcionistas virtuales ilimitados",
      "Llamadas ilimitadas al mes",
      "Memoria ilimitada de clientes",
      "Panel de métricas completo",
    ]
  }
]

</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100">
  <LandingNavbar/>
    <br>
  <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Elige el plan ideal para tu negocio</h2>
    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Encuentra la solución que mejor se adapte a tus necesidades. Con Asistify pagas solo por lo que usas y escalas a medida que tu empresa crece.</p>
  </div>
  <div v-if="loading" class="text-center">Cargando...</div>
  <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 justify-items-center max-w-6xl mx-auto px-4" v-else>
  <PriceComponent v-for="(plan, index) in memberShips" :key="index" v-bind="plan"></PriceComponent>
  </div>
  </div>
</template>

<style scoped>

</style>
