import { ref } from 'vue'
import { getMembershipPlans, type IMembership } from '@/api/membership.ts'

export function useMemberships() {
    const memberships = ref<IMembership[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchMemberships = async () => {
        loading.value = true
        error.value = null
        try {
            memberships.value = await getMembershipPlans()
            console.log(memberships.value)
        } catch (e: any) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    return { memberships, loading, error, fetchMemberships }
}
