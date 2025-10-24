<script setup lang="ts">
interface Props {
    label: string
    modelValue: number
    min?: number
    max?: number
    step?: number
    error?: string | null
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 1,
    step: 0.1,
    disabled: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: number]
}>()

const handleInput = (event: Event) => {
    const value = parseFloat((event.target as HTMLInputElement).value)
    emit('update:modelValue', value)
}
</script>

<template>
    <div class="col-span-2">
        <label :for="label" class="block mb-2 text-sm font-medium text-dark/90">
            {{ label }}
            <span class="text-dark/60 text-xs ml-2">{{ modelValue.toFixed(2) }}</span>
        </label>
        <input
            :id="label"
            type="range"
            :value="modelValue"
            @input="handleInput"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            class="w-full h-2 bg-dark/10 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div class="flex justify-between text-xs text-dark/60 mt-1">
            <span>{{ min }}</span>
            <span>{{ max }}</span>
        </div>
        <p v-if="error" class="text-alert text-sm mt-1">
            {{ error }}
        </p>
    </div>
</template>
