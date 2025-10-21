import { defineStore } from 'pinia'
import { Receptionist } from '../models/Receptionist'
import api from '@/utils/axios'
import { ReceptionistDtoSchema, type ReceptionistDto } from '../dto/ReceptionistDto'
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
    },
})
