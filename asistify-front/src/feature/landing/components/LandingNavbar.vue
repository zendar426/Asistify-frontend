<script setup lang="ts">
import BaseButton from '../../../components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface NavLink {
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { label: 'CARACTERÍSTICAS', to: 'landing' },
  { label: 'VER PLANES', to: 'membership' },
]
</script>

<template>
  <nav class="top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <div class="flex items-center space-x-2">
            <RouterLink :to="{ name: 'landing' }" class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src="/assets/asistify.png"
                  alt="Dashboard de métricas de Asistify"
                  class="w-full h-auto object-cover"
                />
              </div>
            
              <span class="text-xl font-bold text-gray-900">ASISTIFY</span>
            </RouterLink>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="{ name: link.to }"
            class="text-gray-600 hover:text-gray-900 transition duration-150 font-medium text-sm"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-3">
          <BaseButton variant="text" size="sm" :onClick="() => router.push({name: 'login'})"> Iniciar sesión </BaseButton>
          <BaseButton variant="background" size="sm" :onClick="() => router.push({name: 'register'})"> Regístrate </BaseButton>
        </div>
      </div>
    </div>
  </nav>
</template>
