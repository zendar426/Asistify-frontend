import { api } from '@/api/axios'
import type { Avatar } from '../models/Avatar'
import type { AvatarRepository } from './AvatarRepository'
import { logger } from '@/utils/logger'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { API_ROUTE } from '@/utils/config'

export class AvatarRepositoryApi implements AvatarRepository {
    private static instance: AvatarRepositoryApi

    private constructor() {}

    public static getInstance(): AvatarRepositoryApi {
        if (!AvatarRepositoryApi.instance) {
            AvatarRepositoryApi.instance = new AvatarRepositoryApi()
        }
        return AvatarRepositoryApi.instance
    }

    public async findAll(): Promise<Result<Avatar[]>> {
        try {
            const response = await api.get(`${API_ROUTE}/avatars`)

            logger.info('[GET_AVATARS]', 'response: ', response)

            if (response.status === 200) {
                const avatars = response.data.data || response.data

                return {
                    success: true,
                    message: 'Avatares obtenidos con éxito',
                    type: ToastType.success,
                    data: avatars,
                } as Result<Avatar[]>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Avatar[]>
        } catch (error: any) {
            logger.error('[GET_AVATARS]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Avatar[]>
        }
    }
}
