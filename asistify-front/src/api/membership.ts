import { api } from './axios'

export interface IMembership {
    id: string
    name: string
    price: number
    features: string[]
}
export const getMembershipPlans = async (): Promise<IMembership[]> => {
    try {
        const response = await api.get('/membership')
        return response.data
    } catch (error) {
        console.error('Error fetching membership plans:', error)
        throw error
    }
}
