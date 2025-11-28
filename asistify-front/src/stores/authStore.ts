import { defineStore } from 'pinia'
import { api } from '@/api/axios.ts'

export interface RegisterUserDto {
    email: string
    password: string
    name: string
    phoneNumber?: string
    avatar?: string //url to avatar image
}
export interface LoginUserDto {
    email: string
    password: string
}
export interface UserProfile {
    email: string
    name: string
    phoneNumber?: string
    avatar?: string //url to avatar image
}
export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null as string | null,
        userProfile: null,
        refreshToken: null as string | null,
    }),
    actions: {
        setToken(token: string) {
            this.accessToken = token
        },
        clearToken() {
            this.accessToken = null
            this.refreshToken = null
        },
        setRefreshToken(token: string) {
            this.refreshToken = token
        },
        async registerUser(userData: RegisterUserDto) {
            const response = await api.post('/auth/register', userData, {})
            if (response.data.accessToken) {
                this.setToken(response.data.accessToken)
            }
            if (response.data.refreshToken) {
                this.setRefreshToken(response.data.refreshToken)
            }

            return response
        },
        async loginUser(userData: LoginUserDto) {
            const response = await api.post('/auth/login', userData, {})
            if (response.data.accessToken) {
                this.setToken(response.data.accessToken)
            }
            if (response.data.refreshToken) {
                this.setRefreshToken(response.data.refreshToken)
            }
            console.log('Login response:', response)
            return response
        },
    },
    persist: true,
})
