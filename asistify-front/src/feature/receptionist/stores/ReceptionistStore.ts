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

        removeReceptionist(receptionistId: string) {
            this.receptionist = this.receptionist.filter((r) => r.id !== receptionistId)
        },

        updateReceptionist(receptionist: Receptionist) {
            const index = this.receptionist.findIndex((r) => r.id === receptionist.id)
            if (index !== -1) {
                this.receptionist[index] = receptionist
            }
        },
    },
})
