<script setup lang="ts">
import LandingNavbar from '@/feature/landing/components/LandingNavbar.vue';
import RegisterFormComponent from '../components/RegisterFormComponent.vue';


</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Call to Action -->
    <section class="py-20">
      <div class="max-w-xl mx-auto text-center border-solid border-3 rounded-lg border-blue-300 p-5">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Registrarse
        </h1>


        <RegisterFormComponent></RegisterFormComponent>

        
      </div>
    </section>

    <!-- Footer -->
    <!-- <LandingFooter /> -->
  </div>
</template>

<style scoped>

</style>
