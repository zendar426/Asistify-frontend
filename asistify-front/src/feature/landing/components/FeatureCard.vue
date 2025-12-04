<script setup lang="ts">
interface Props {
    title: string
    description: string
    imageSrc: string
    imagePosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
    imagePosition: 'left',
})
</script>

<template>
    <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8">
        <!-- Image -->
        <div :class="['w-full md:w-1/2', imagePosition === 'right' ? 'md:order-2' : '']">
            <div class="relative rounded-2xl border-3 border-secondary overflow-hidden shadow-xl h-64 md:h-80">
                <img :src="imageSrc" :alt="title" class="w-full h-full object-cover" />
            </div>
        </div>

        <!-- Content -->
        <div :class="['w-full md:w-1/2', imagePosition === 'right' ? 'md:order-1' : '']">
            <div class="space-y-4">
                <p :class="['text-dark/80 text-base leading-relaxed text-center', imagePosition === 'right' ? 'md:text-right' : 'md:text-left']">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>
