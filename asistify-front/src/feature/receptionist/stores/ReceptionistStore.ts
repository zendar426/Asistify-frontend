import { defineStore } from 'pinia'
import { Receptionist } from '../models/Receptionist'

export const useReceptionistStore = defineStore('receptionist', {
    state: () => ({
        receptionist: [] as Receptionist[],
    }),
    actions: {
        setReceptionists(receptionists: Receptionist[]) {
            this.receptionist = receptionists
        },

        addReceptionist(receptionist: Receptionist) {
            this.receptionist.push(receptionist)
        },
    },
})
