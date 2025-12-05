import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum ToastType {
    success,
    error,
    info,
    warning,
}

export interface Toast {
    id: number
    message: string
    type: ToastType
    duration?: number
}

let counter = 0

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([])

    function addToast(type: ToastType, message: string, duration = 3000) {
        const id = counter++
        toasts.value.push({ id, type, message, duration })

        if (duration > 0) {
            setTimeout(() => removeToast(id), duration)
        }

        return id
    }

    function removeToast(id: number) {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    function clearAllToasts() {
        toasts.value = []
    }

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
    }
})
