<script setup lang="ts">
import { computed } from 'vue'
import { ToastType, useToastStore } from '@/stores/ToastStore'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
const removeToast = toastStore.removeToast

const toastClasses: Record<string, string> = {
    [ToastType.success]: 'bg-green-600',
    [ToastType.error]: 'bg-red-600',
    [ToastType.info]: 'bg-blue-600',
    [ToastType.warning]: 'bg-yellow-500 text-black',
}

const iconMap = {
    [ToastType.success]: ['fa-solid', 'circle-check'],
    [ToastType.error]: ['fa-solid', 'circle-xmark'],
    [ToastType.info]: ['fa-solid', 'circle-info'],
    [ToastType.warning]: ['fa-solid', 'triangle-exclamation'],
}

const isProcessing = (toast: { type: ToastType; duration?: number }) => {
    return toast.type === ToastType.info && toast.duration === 0
}
</script>

<template>
    <div
        class="fixed top-4 left-1/2 sm:left-[calc(50%+8rem)] transform -translate-x-1/2 z-50 flex flex-col gap-3 w-full max-w-sm"
    >
        <TransitionGroup
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-300 ease-in"
            enter-from-class="opacity-0 transform translate-y-[-20px]"
            leave-to-class="opacity-0 transform translate-x-[100px]"
        >
            <div
                v-for="toast in toasts"
                :key="toast.id"
                :class="[
                    'flex gap-3 items-center justify-between px-4 py-3 rounded-lg shadow-lg',
                    'text-white text-md font-medium',
                    toastClasses[toast.type],
                ]"
            >
                <div class="flex items-center gap-3 flex-1">
                    <div v-if="isProcessing(toast)" class="animate-spin">
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </div>
                    <font-awesome-icon
                        v-else
                        :icon="iconMap[toast.type]"
                        class="text-lg"
                    />
                    <span class="flex-1">{{ toast.message }}</span>
                </div>
                <button
                    @click="removeToast(toast.id)"
                    class="ml-4 text-white hover:text-gray-200 text-xl font-bold leading-none transition-colors"
                    aria-label="Cerrar notificación"
                >
                    &times;
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>
