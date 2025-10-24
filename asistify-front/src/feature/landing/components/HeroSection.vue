<script setup lang="ts">
import BaseButton from '../../../components/BaseButton.vue'
</script>

<template>
  <section class="relative min-h-screen flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-6 order-1 md:order-0">
          <h1 class="text-2xl md:text-6xl font-bold text-gray-900 text-center md:text-left leading-tight">
            ASISTIFY<br />
            Tu recepcionista<br />
            virtual inteligente
          </h1>

          <p class="text-gray-600 text-lg leading-relaxed text-center md:text-left max-w-xl">
            Asistify es tu recepcionista virtual inteligente; atiende llamadas 24/7, agenda citas de
            forma automática y responde consultas frecuentes y te ofrece un panel de métricas con
            resultados actualizados con la flexibilidad y escalabilidad que tu negocio necesita.
          </p>

          <div class="flex pt-4 justify-center md:justify-start">
            <BaseButton variant="outline" size="lg" :onClick="() => $router.push({ name: 'membership' })"> COMENZAR </BaseButton>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <div class="relative overflow-hidden shadow-2xl [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
            <img
              src="/assets/landingpage/metrics.png"
              alt="Dashboard de métricas de Asistify"
              class="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
