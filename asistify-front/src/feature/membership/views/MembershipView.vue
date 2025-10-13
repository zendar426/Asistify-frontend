<script setup lang="ts">

import NavbarPublic from "@/components/NavbarPublic.vue";
import PriceComponent from "@/feature/membership/components/PriceComponent.vue";

const memberShips = [
  {
    namePlan : "Plan Básico",
    price :19.990,
    description: "The basic plan is designed for individuals or small teams who need essential features to get started with task and project management.",
    features : [
      "2 team members",
      "20GB Cloud storage",
      "Integration help",
      "Sketch Files",
    ]
  },
  {
    namePlan : "Plan Pro",
    price :49.990,
    description : "The standard plan is perfect for small teams or individuals who need to manage their tasks and projects efficiently.",
    features : [
      "10 team members",
      "100GB Cloud storage",
      "Integration help",
      "Sketch Files",
      "API Access",
      "Complete documentation",
    ]
  },
  {
    namePlan : "Plan Enterprise",
    price :99.990,
    description: "The enterprise plan is tailored for large organizations that require advanced features, enhanced security, and dedicated support to manage complex projects and workflows.",
    features : [
      "Unlimited team members",
      "1TB Cloud storage",
      "Integration help",
      "Sketch Files",
      "API Access",
      "Complete documentation",
      "24×7 phone & email support"
    ]
  }
]
</script>

<template>
  <navbar-public></navbar-public>
  <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Elige el plan ideal para tu negocio</h2>
    <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Encuentra la solución que mejor se adapte a tus necesidades. Con Asistify pagas solo por lo que usas y escalas a medida que tu empresa crece.</p>
  </div>
  <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
  <PriceComponent v-for="(plan, index) in memberShips" :key="index" v-bind="plan"></PriceComponent>
  </div>
</template>

<style scoped>

</style>
