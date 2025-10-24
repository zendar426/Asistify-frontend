<script setup lang="ts">
import SideBar from '@/components/SideBar.vue';
import EditProfileInfoComponent from '../components/EditProfileInfoComponent.vue';

</script>

<template>
      <div class="min-h-screen bg-gradient-to-b from-tertiary from-0% via-white via-15% to-gray-100 ">
    <!-- Navbar -->
    <SideBar />

    <!-- Call to Action -->
    <section class="py-20">
      <div class="max-w-3xl mx-auto text-center bg-white text-center border-solid border-1 rounded-lg border-blue-300 p-5">
        <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-6">
          Editar perfil
        </h1>

        <EditProfileInfoComponent></EditProfileInfoComponent>
        
        

        <div id="" class="mt-5 mx-auto">
          
        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- <LandingFooter /> -->
</div>
</template>