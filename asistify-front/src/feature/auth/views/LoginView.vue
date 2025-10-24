<script setup lang="ts">
import LandingNavbar from '../../landing/components/LandingNavbar.vue'
import LoginFormComponent from '../components/LoginFormComponent.vue';
import PasswordModal from '../components/PasswordModal.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100 ">
    <!-- Navbar -->
    <LandingNavbar />

    <!-- Call to Action -->
    <section class="py-20">
      <div class="max-w-xl mx-auto text-center border-solid border-3 rounded-lg border-blue-300 p-5">
        <h1 class="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Iniciar sesión
        </h1>


        <LoginFormComponent></LoginFormComponent>

        <div id="additionalActions" class="mt-5 mx-auto">
          <label>¿Olvidó su contraseña? </label>
          <PasswordModal></PasswordModal>

          <div class="mt-2 mb-2"></div>

          <label>¿No tiene una cuenta? </label> <label>
            <RouterLink to="/auth/register" class="btn btn-outline underline">Regístrese</RouterLink>
          </label>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- <LandingFooter /> -->
  </div>
</template>

<style scoped>

</style>
