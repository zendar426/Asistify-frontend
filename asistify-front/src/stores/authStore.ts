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
        userProfile: null as UserProfile | null,
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
            console.log(response)
            if (response.data.accessToken) {
                this.setToken(response.data.accessToken)
            }
            if (response.data.refreshToken) {
                this.setRefreshToken(response.data.refreshToken)
            }
            if (response.data.user) {
                this.userProfile = {
                    email: response.data.user.email,
                    name: response.data.user.name,
                    phoneNumber: response.data.user.phoneNumber || null,
                    avatar: response.data.user.avatar || null,
                }
            }
            console.log('Login response:', response)
            return response
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        userEmail: (state) => state.userProfile?.email || null,
        userName: (state) => state.userProfile?.name || null,
        userAvatar: (state) => state.userProfile?.avatar || null,
        userPhoneNumber: (state) => state.userProfile?.phoneNumber || null,
    },
    persist: true,
})
