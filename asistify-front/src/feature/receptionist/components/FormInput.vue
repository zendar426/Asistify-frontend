<script setup lang="ts">
interface Props {
    label: string
    modelValue: string | number
    type?: 'text' | 'email' | 'tel' | 'url' | 'number'
    placeholder?: string
    error?: string | null
    disabled?: boolean
    maxlength?: number
    min?: number
    max?: number
    step?: number,
    isrequired?:boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    disabled: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (props.type === 'number') {
        emit('update:modelValue', target.valueAsNumber || 0)
    } else {
        emit('update:modelValue', target.value)
    }
}
</script>

<template>
    <div class="col-span-2">
        <label :for="label" class="block mb-2 text-sm font-medium text-gray-900">
            {{ label }}
        </label>
        <input
            :id="label"
            :type="type"
            :value="modelValue"
            @input="handleInput"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :min="min"
            :max="max"
            :step="step"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            autocomplete="off"
            :required="isrequired"
        />
        <p v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
        </p>
    </div>
</template>
