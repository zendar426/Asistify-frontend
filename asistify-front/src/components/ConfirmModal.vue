<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    confirmVariant?: 'primary' | 'danger'
    isOpen: boolean
}

const props = withDefaults(defineProps<Props>(), {
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    confirmVariant: 'primary',
})

const emit = defineEmits<{
    confirm: []
    cancel: []
    close: []
}>()

const handleConfirm = () => {
    emit('confirm')
    emit('close')
}

const handleCancel = () => {
    emit('cancel')
    emit('close')
}

const handleBackdropClick = () => {
    emit('cancel')
    emit('close')
}
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                @click.self="handleBackdropClick"
            >
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black/40" @click="handleBackdropClick" />

                <!-- Modal -->
                <Transition
                    enter-active-class="transition-all duration-200"
                    leave-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-95"
                    leave-to-class="opacity-0 scale-95"
                >
                    <div
                        v-if="isOpen"
                        class="relative bg-white rounded-lg shadow-xl max-w-md w-full z-10"
                        @click.stop
                    >
                        <!-- Header -->
                        <div class="p-6 pb-4">
                            <h3 class="text-xl font-semibold text-gray-900">
                                {{ title }}
                            </h3>
                        </div>

                        <!-- Body -->
                        <div class="px-6 pb-6">
                            <p class="text-gray-600">
                                {{ message }}
                            </p>
                        </div>

                        <!-- Footer -->
                        <div class="flex gap-3 justify-end px-6 pb-6">
                            <BaseButton variant="outline" size="md" @click="handleCancel">
                                {{ cancelText }}
                            </BaseButton>
                            <BaseButton
                                :variant="confirmVariant === 'danger' ? 'primary' : 'primary'"
                                size="md"
                                @click="handleConfirm"
                                :class="
                                    confirmVariant === 'danger'
                                        ? '!bg-red-600 hover:!bg-red-700'
                                        : ''
                                "
                            >
                                {{ confirmText }}
                            </BaseButton>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
