<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'background' | 'outline' | 'text' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button'
})

const isIconVariant = computed(() => props.variant === 'icon')

const buttonClasses = computed(() => {
  const base = 'font-medium rounded-full transition-all duration-200 items-center justify-center'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-gray-900',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    background: 'bg-background-dark text-background hover:bg-tertiary hover:text-dark',
    outline: 'border-2 border-secondary text-gray-800 hover:bg-tertiary hover:text-dark',
    text: 'text-gray-800 hover:text-dark hover:bg-tertiary',
    icon: 'bg-primary text-white hover:bg-gray-900'
  }
  
  const sizes = {
    sm: isIconVariant.value ? 'w-8 h-8 text-sm' : 'px-4 py-2 text-sm gap-2',
    md: isIconVariant.value ? 'w-10 h-10 text-base' : 'px-6 py-2 text-base gap-2',
    lg: isIconVariant.value ? 'w-12 h-12 text-lg' : 'px-8 py-2 text-lg gap-2'
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
    <font-awesome-icon v-if="icon" :icon="icon" />
    <slot v-if="!isIconVariant" />
  </component>
</template>
