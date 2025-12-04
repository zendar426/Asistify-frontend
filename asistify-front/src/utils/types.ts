import type { ToastType } from "@/stores/ToastStore"

export interface Result<T = void> {
    success: boolean,
    message: string,
    data?: T
    type: ToastType
}