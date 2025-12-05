import { api } from '@/api/axios'
import type { CallHistoryRepository, CallHistoryData } from './CallHistoryRepository'
import { logger } from '@/utils/logger'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { API_ROUTE } from '@/utils/config'

export class CallHistoryRepositoryApi implements CallHistoryRepository {
    private static instance: CallHistoryRepositoryApi

    private constructor() {}

    public static getInstance(): CallHistoryRepositoryApi {
        if (!CallHistoryRepositoryApi.instance) {
            CallHistoryRepositoryApi.instance = new CallHistoryRepositoryApi()
        }
        return CallHistoryRepositoryApi.instance
    }

    public async save(data: CallHistoryData): Promise<Result<void>> {
        try {
            const response = await api.post(`${API_ROUTE}/dashboard/call-history`, data)

            logger.info('[SAVE_CALL_HISTORY]', 'response: ', response)

            if (response.status === 201 || response.status === 200) {
                return {
                    success: true,
                    message: 'Historial de llamada guardado con éxito',
                    type: ToastType.success,
                }
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            }
        } catch (error: any) {
            logger.error('[SAVE_CALL_HISTORY]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            }
        }
    }
}
