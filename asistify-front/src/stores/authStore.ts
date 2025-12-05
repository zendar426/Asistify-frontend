import { defineStore } from 'pinia'
import { api } from '@/api/axios.ts'
import { useUserStore } from '@/feature/auth/stores/userStore'

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
        refreshTokenValue: null as string | null,
    }),
    actions: {
        setToken(token: string) {
            this.accessToken = token
            try {
                localStorage.setItem('access_token', token)
            } catch {}
        },
        clearToken() {
            this.accessToken = null
            this.refreshTokenValue = null
            try {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
            } catch {}
        },
        setRefreshToken(token: string) {
            this.refreshTokenValue = token
            try {
                localStorage.setItem('refresh_token', token)
            } catch {}
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
            console.log("res ",response.status)
            if (response.status>299){
                console.log("gt 299")
                return response;
            }
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
                let userStore=useUserStore()
                userStore.setUser(response.data.user)
            }
            console.log('Login response:', response)
            return response
        },
        async refreshToken(){
            const refresh =  this.refreshTokenValue || localStorage.getItem('refresh_token')
            console.log(refresh)
            const response = await api.post('/auth/refresh', { refreshToken: refresh }, {})
            console.log("responseref  ",response)
            if (response.data.accessToken) {
                this.setToken(response.data.accessToken)
            }
            return response
        }
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
