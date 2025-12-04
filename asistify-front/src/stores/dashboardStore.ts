import {defineStore} from 'pinia'
import type {ICallHistory, IDashboard} from '@/api/dashboard.ts'
import {api} from '@/api/axios.ts'

export const useDashboardStore = defineStore('dashboard', {
    state: (): { dashboardData: IDashboard; isLoading: boolean } => ({
        dashboardData: {
            overview: {
                countDocuments: 0,
                countCalls: 0,
                countReceptionist: 0,
            },
            calendarMetrics: {
                date: new Date().toISOString(),
                availableCount: 0,
                confirmedCount: 0,
                toConfirmCount: 0,
            },
            callHistory: [],
        } as IDashboard,
        isLoading: false,
    }),
    getters: {
        getDashboardDataRaw(state) {
            return state.dashboardData
        },
        getOverview(state): {
            countDocuments: number
            countCalls: number
            countReceptionist: number
        } {
            return state.dashboardData.overview
        },
        getCalendarHistory(state): ICallHistory[] {
            return state.dashboardData.callHistory
        },
    },
    actions: {
        async fetchDashboard() {
            this.isLoading = true
            try {
                // Axios lanza error si el status no es 2xx, por eso usamos try/catch
                const response = await api.get<IDashboard>('/dashboard')

                console.log('✅ Dashboard data fetched:', response.data)
                this.dashboardData = response.data
            } catch (error) {
                console.error('❌ Error fetching dashboard. Using Mock Data.', error)
                // Fallback automático a Mock si falla la API
                this.dashboardData = mockDashboardData()
            } finally {
                this.isLoading = false
            }
        },
    },
    persist: true,
})
function mockDashboardData(): IDashboard {
    return {
        overview: {
            countDocuments: 2,
            countCalls: 34,
            countReceptionist: 5,
        },
        calendarMetrics: {
            date: '2025-12-01T15:51:21.647Z',
            availableCount: 0,
            confirmedCount: 0,
            toConfirmCount: 0,
        },
        callHistory: [
            {
                date: '2025-12-01T15:51:21.647Z',
                clientName: 'Client A',
                durationInMinutes: 3,
                receptionistId: 'receptionist1',
                state: 'completed',
            },
            {
                date: '2025-12-01T15:51:21.647Z',
                clientName: 'Client B',
                durationInMinutes: 0,
                receptionistId: 'receptionist2',
                state: 'missed',
            },
            {
                date: '2025-12-01T15:51:21.647Z',
                clientName: 'Client C',
                durationInMinutes: 5,
                receptionistId: 'receptionist3',
                state: 'completed',
            },
            {
                date: '2025-12-02T15:51:21.647Z',
                clientName: 'Client A',
                durationInMinutes: 4,
                receptionistId: 'receptionist3',
                state: 'completed',
            },
            {
                date: '2025-12-03T15:51:31.647Z',
                clientName: 'Client A',
                durationInMinutes: 4,
                receptionistId: 'receptionist3',
                state: 'completed',
            },
            {
                date: '2025-12-02T13:51:27.647Z',
                clientName: 'Client A',
                durationInMinutes: 4,
                receptionistId: 'receptionist3',
                state: 'completed',
            },
            {
                date: '2025-12-02T13:51:27.647Z',
                clientName: 'Client B',
                durationInMinutes: 4,
                receptionistId: 'receptionist2',
                state: 'completed',
            },
        ],
    }
}
