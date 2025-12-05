import { defineStore } from 'pinia'
import { getMembershipPlans, type IMembership } from '@/api/membership.ts'

export const useMembershipStore = defineStore('membership', {
    state: () => {
        return {
            selectedIdMembership: '' as string,
            memberships: [] as IMembership[],
        }
    },
    getters: {
        getMemberships(state): IMembership[] {
            return state.memberships
        },
    },
    actions: {
        setSelectedMembership(id: string) {
            this.selectedIdMembership = id
        },
        getSelectedIdMembership() {
            return this.selectedIdMembership
        },
        async fetchMemberships() {
            this.memberships = await getMembershipPlans()
        },
    },
    persist: true,
})
