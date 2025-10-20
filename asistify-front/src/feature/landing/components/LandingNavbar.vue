<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'VER PLANES', href: '#' },
  { label: 'CARACTERÍSTICAS', href: '#' },
]
</script>

<template>
  <nav class="top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src="/assets/asistify.png"
                alt="Dashboard de métricas de Asistify"
                class="w-full h-auto object-cover"
              />
            </div>
            <span class="text-xl font-bold text-gray-900">ASISTIFY</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-gray-600 hover:text-gray-900 transition duration-150 font-medium text-sm"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-3">
          <BaseButton variant="text" size="sm"> Iniciar sesión </BaseButton>
          <BaseButton variant="background" size="sm"> Regístrate </BaseButton>
        </div>
      </div>
    </div>
  </nav>
</template>
