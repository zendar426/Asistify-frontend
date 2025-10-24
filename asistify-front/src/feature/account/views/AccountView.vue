<script setup lang="ts">
  import SideBar from '@/components/SideBar.vue';
  import ProfileInfoComponent from '../components/ProfileInfoComponent.vue';
import PaymentMethods from '../components/PaymentMethods.vue';


</script>

<template>
  <div class=" min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100 ">
    <!-- Navbar -->
    <SideBar />

    <!-- Call to Action -->
    <section class="py-20">
      <div class="max-w-5xl mx-auto bg-white text-center border-solid border-1 rounded-lg border-blue-300 p-5">
        <p class="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
          Perfil de usuario
        </p>

        <ProfileInfoComponent></ProfileInfoComponent>
        
        

        <div id="" class="mt-5 mx-auto">
          <PaymentMethods></PaymentMethods>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- <LandingFooter /> -->
</div>
</template>

<style scoped>

</style>
