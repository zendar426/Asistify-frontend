import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL, // fijarse en el .env y en el dockerfile
    // NO pongas el header Authorization aquí de forma estática
})

// Control de refresh en curso para evitar múltiples llamadas simultáneas
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token))
    refreshSubscribers = []
}

const addRefreshSubscriber = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb)
}

// Interceptor de Request (Se ejecuta antes de cada petición)
api.interceptors.request.use(
    (config) => {
        // 1. Obtener el token actualizado AL MOMENTO de la petición
        const token = localStorage.getItem('access_token') // Ojo: asegúrate que este sea el key correcto

        // 2. Aseguramos que config.headers exista
        config.headers = config.headers || {}

        // 3. Si existe el token, lo inyectamos
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // 4. Inyectamos la versión (para que coincida con tu NestJS Header Versioning)
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
    async (error) => {
        const status = error.response?.status
        const originalRequest = error.config || {}

        // Si el token expiró (401), intentamos refrescar y reintentar la petición
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            // Si ya hay un refresh en curso, nos suscribimos y reintentamos cuando termine
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((newToken: string) => {
                        // Reinyectamos el nuevo token y reintentamos
                        originalRequest.headers = originalRequest.headers || {}
                        originalRequest.headers.Authorization = `Bearer ${newToken}`
                        resolve(api(originalRequest))
                    })
                })
            }

            // Iniciar refresh de token usando la función del auth store (importación dinámica para evitar ciclo)
            try {
                isRefreshing = true
                const { useAuthStore } = await import('@/stores/authStore')
                const authStore = useAuthStore()
                const refreshResp = await authStore.refreshToken()
                const newAccessToken: string | undefined = refreshResp?.data?.accessToken

                if (!newAccessToken) {
                    throw new Error('No se recibió un nuevo accessToken')
                }

                // Guardamos en localStorage para que el interceptor de request lo tome
                localStorage.setItem('access_token', newAccessToken)

                // Notificar a los suscriptores que ya hay un nuevo token
                onRefreshed(newAccessToken)

                // Reintentar la petición original con el nuevo token
                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch {
                // Si el refresh falla, limpiamos y redirigimos a login
                localStorage.removeItem('access_token')
                try {
                    const { useAuthStore } = await import('@/stores/authStore')
                    const authStore = useAuthStore()
                    authStore.clearToken()
                } catch {}
                window.location.href = '/auth/login'
                return Promise.reject(error)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    },
)
