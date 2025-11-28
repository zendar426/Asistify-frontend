import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    // NO pongas el header Authorization aquí de forma estática
})

// Interceptor de Request (Se ejecuta antes de cada petición)
api.interceptors.request.use(
    (config) => {
        // 1. Obtener el token actualizado AL MOMENTO de la petición
        const token = localStorage.getItem('access_token') // Ojo: asegúrate que este sea el key correcto

        // 2. Si existe, lo inyectamos
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // 3. Inyectamos la versión (para que coincida con tu NestJS Header Versioning)
        config.headers['X-Api-Version'] = '1'

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// Opcional: Interceptor de Response (Para manejar errores globales)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token expiró (401), podemos desloguear al usuario automáticamente
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
            window.location.href = '/auth/login' // Redirección forzada si es necesario
        }
        return Promise.reject(error)
    },
)
