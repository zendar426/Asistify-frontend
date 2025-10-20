import { defineStore } from 'pinia'
import { Receptionist } from '../models/Receptionist'
import api from '@/utils/axios'
import { ReceptionistDtoSchema, type ReceptionistDto } from '../dto/ReceptionistDto'
import { API_ROUTE } from '@/utils/const'
import { logger } from '@/utils/logger'
import { ToastType } from '@/stores/ToastStore'
import type { Result } from '@/utils/types'
import { z } from 'zod'

export const useReceptionistStore = defineStore('receptionist', {
    state: () => ({
        receptionist: [] as Receptionist[],
    }),
    actions: {
        setReceptionists(receptionists: Receptionist[]) {
            this.receptionist = receptionists
        },

        async getAllReceptionists(): Promise<Result> {
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
                    const receptionists = Receptionist.fromReceptionistDtoArray(
                        validationResult.data,
                    )

                    this.setReceptionists(receptionists)

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
        },
    },
})
