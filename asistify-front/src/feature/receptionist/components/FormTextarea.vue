<script setup lang="ts">
interface Props {
    label: string
    modelValue: string
    placeholder?: string
    error?: string | null
    disabled?: boolean
    maxlength?: number
    rows?: number
}

withDefaults(defineProps<Props>(), {
    placeholder: '',
    disabled: false,
    rows: 4,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <div class="col-span-2">
        <label :for="label" class="block mb-2 text-sm font-medium text-gray-900">
            {{ label }}
        </label>
        <textarea
            :id="label"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :rows="rows"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
        <p v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
        </p>
    </div>
</template>
