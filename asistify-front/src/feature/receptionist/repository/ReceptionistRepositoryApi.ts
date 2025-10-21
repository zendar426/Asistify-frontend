import api from '@/utils/axios'
import { Receptionist } from '../models/Receptionist'
import type { ReceptionistRepository } from './ReceptionistRepository'
import { logger } from '@/utils/logger'
import z from 'zod'
import { ReceptionistDtoSchema } from '../dto/ReceptionistDto'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { API_ROUTE } from '@/utils/config'
import { useReceptionistStore } from '../stores/ReceptionistStore'

export class ReceptionistRepositoryApi implements ReceptionistRepository {
    private static instance: ReceptionistRepositoryApi
    private receptionistStore = useReceptionistStore()

    private constructor() {}

    public static getInstance(): ReceptionistRepositoryApi {
        if (!ReceptionistRepositoryApi.instance) {
            ReceptionistRepositoryApi.instance = new ReceptionistRepositoryApi()
        }
        return ReceptionistRepositoryApi.instance
    }

    public async findAll(): Promise<Result> {
        try {
            const response = await api.get(`${API_ROUTE}/receptionists`)

            logger.info('[GET_RECEPTIONISTS]', 'response: ', response)

            const validationResult = z.array(ReceptionistDtoSchema).safeParse(response.data)

            if (!validationResult.success) {
                logger.error('[GET_RECEPTIONISTS] Validation failed:', validationResult.error)
                return {
                    success: false,
                    message: `Ha ocurrido un error, vuelve a intentarlo más tarde.`,
                    type: ToastType.error,
                } as Result
            }

            if (response.status == 200) {
                const receptionists = Receptionist.fromReceptionistDtoArray(validationResult.data)

                this.receptionistStore.setReceptionists(receptionists)

                return {
                    success: true,
                    message: 'Recepcionistas obtenidos con éxito',
                    type: ToastType.success,
                } as Result
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result
        } catch (error: any) {
            logger.error('[GET_RECEPTIONISTS]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result
        }
    }

    public async findById(id: string): Promise<Result | null> {
        // Implementation for fetching a receptionist by ID from API
        return null
    }

    public async create(receptionist: Receptionist): Promise<Result | null> {
        // Implementation for creating a new receptionist via API
        return null
    }

    public async update(id: string, receptionist: Receptionist): Promise<Result | null> {
        // Implementation for updating a receptionist via API
        return null
    }

    public async delete(id: string): Promise<Result | null> {
        // Implementation for deleting a receptionist via API
        return null
    }
}
