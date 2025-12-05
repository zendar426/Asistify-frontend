import { api } from './axios'

export interface IMembership {
    id: string
    name: string
    price: number
    description: string
    functionalities: string[]
}
export const getMembershipPlans = async (): Promise<IMembership[]> => {
    try {
        const response = await api.get('/membership')
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error fetching membership plans:', error)
        throw error
    }
}
