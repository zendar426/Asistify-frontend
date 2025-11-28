import { defineStore } from 'pinia'

export const useMembershipStore = defineStore('membership', {
  state: () => {
    return {
      selectedIdMembership: '',
    }
  },
  actions: {
    setSelectedMembership(id: string) {
      this.selectedIdMembership = id
    },
    getSelectedIdMembership() {
      return this.selectedIdMembership
    },
  },
})
