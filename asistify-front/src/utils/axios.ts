import axios from 'axios'
import { API_ROUTE } from './const'

const api = axios.create({
    baseURL: API_ROUTE,
    timeout: 10000,
})

api.interceptors.request.use(
    (config) => {
        const raw = localStorage.getItem('session')
        const token = raw ? (JSON.parse(raw) as { token?: string }).token : null
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default api
