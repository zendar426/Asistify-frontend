import axios from 'axios'
import { API_ROUTE, IS_PROD, MOCK_BEARER_TOKEN } from './config'

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
        } else if (!IS_PROD) {
            config.headers.Authorization = `Bearer ${MOCK_BEARER_TOKEN}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default api
