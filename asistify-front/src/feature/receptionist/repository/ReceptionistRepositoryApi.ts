import { api } from '@/api/axios'
import { Receptionist } from '../models/Receptionist'
import type { ReceptionistRepository } from './ReceptionistRepository'
import { logger } from '@/utils/logger'
import z from 'zod'
import { ReceptionistDtoSchema } from '../dto/ReceptionistDto'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { API_ROUTE } from '@/utils/config'
import { useReceptionistStore } from '../stores/ReceptionistStore'
import { tr } from 'zod/v4/locales'

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

    public async findAll(): Promise<Result<Receptionist[] | void>> {
        try {
            const response = await api.get(`${API_ROUTE}/receptionists`)

            logger.info('[GET_RECEPTIONISTS]', 'response: ', response)

            // Extract data from PaginatedResponseDto
            const validationResult = z.array(ReceptionistDtoSchema).safeParse(response.data.data)

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

    public async findById(id: string): Promise<Result<Receptionist | void>> {
        try {
            const response = await api.get(`${API_ROUTE}/receptionists/${id}`)

            logger.info('[GET_RECEPTIONIST]', 'response: ', response)

            if (response.status == 200) {
                const receptionist = Receptionist.fromReceptionistDto(response.data)

                return {
                    success: true,
                    message: 'Recepcionista obtenido con éxito',
                    type: ToastType.success,
                } as Result<Receptionist>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Receptionist>
        } catch (error: any) {
            logger.error('[GET_RECEPTIONIST]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Receptionist>
        }
    }

    public async create(receptionist: Receptionist): Promise<Result<Receptionist | void>> {
        try {
            // Map Receptionist model to backend DTO structure
            const payload = {
                name: receptionist.name,
                cellphone: receptionist.cellphone,
                avatarId: receptionist.avatarId,
                enterpriseInformation: receptionist.enterpriseInformation,
                clientInformation: receptionist.clientInformation,
                businessRestrictions: receptionist.businessRestrictions,
                levelFormality: receptionist.levelFormality,
                levelDynamism: receptionist.levelDynamism,
                anticipationMaxDays: receptionist.anticipationMaxDays,
                anticipationMinDays: receptionist.anticipationMinDays,
            }

            const response = await api.post(`${API_ROUTE}/receptionists`, payload)

            logger.info('[CREATE_RECEPTIONIST]', 'response: ', response)

            if (response.status == 201) {
                const createdReceptionist = Receptionist.fromReceptionistDto(response.data)

                this.receptionistStore.addReceptionist(createdReceptionist)

                return {
                    success: true,
                    message: 'Recepcionista creado con éxito',
                    type: ToastType.success,
                } as Result<Receptionist>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Receptionist>
        } catch (error: any) {
            logger.error('[CREATE_RECEPTIONIST]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Receptionist>
        }
    }

    public async update(receptionist: Receptionist): Promise<Result<Receptionist | void>> {
        try {
             // Map Receptionist model to backend DTO structure
             const payload = {
                name: receptionist.name,
                cellphone: receptionist.cellphone,
                avatarId: receptionist.avatarId,
                enterpriseInformation: receptionist.enterpriseInformation,
                clientInformation: receptionist.clientInformation,
                businessRestrictions: receptionist.businessRestrictions,
                levelFormality: receptionist.levelFormality,
                levelDynamism: receptionist.levelDynamism,
                anticipationMaxDays: receptionist.anticipationMaxDays,
                anticipationMinDays: receptionist.anticipationMinDays,
            }

            const response = await api.patch(
                `${API_ROUTE}/receptionists/${receptionist.id}`,
                payload,
            )
            logger.info('[UPDATE_RECEPTIONIST]', 'response: ', response)

            if (response.status == 200) {
                const updatedReceptionist = Receptionist.fromReceptionistDto(response.data)
                this.receptionistStore.updateReceptionist(updatedReceptionist)
                return {
                    success: true,
                    message: 'Recepcionista actualizado con éxito',
                    type: ToastType.success,
                } as Result<Receptionist>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Receptionist>
        } catch (error: any) {
            logger.error('[UPDATE_RECEPTIONIST]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Receptionist>
        }
    }

    public async delete(id: string): Promise<Result<Receptionist | void>> {
        try {
            const response = await api.delete(`${API_ROUTE}/receptionists/${id}`)

            logger.info('[DELETE_RECEPTIONIST]', 'response: ', response)

            if (response.status == 204 || response.status == 200) {
                this.receptionistStore.removeReceptionist(id)

                return {
                    success: true,
                    message: 'Recepcionista eliminado con éxito',
                    type: ToastType.success,
                } as Result<Receptionist | void>
            }

            return {
                success: false,
                message: response.statusText,
                type: ToastType.warning,
            } as Result<Receptionist | void>
        } catch (error: any) {
            logger.error('[DELETE_RECEPTIONIST]', error)
            return {
                success: false,
                message: error.message,
                type: ToastType.error,
            } as Result<Receptionist | void>
        }
    }
}
