<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'background' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button'
})

const buttonClasses = computed(() => {
  const base = 'font-medium rounded-full transition-all duration-200 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-gray-900',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    background: 'bg-background-dark text-background hover:bg-tertiary hover:text-dark',
    outline: 'border-2 border-secondary text-gray-800 hover:bg-tertiary hover:text-dark',
    text: 'text-gray-800 hover:text-dark hover:bg-tertiary'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-2 text-lg'
  }
  
  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>
