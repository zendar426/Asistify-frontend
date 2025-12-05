<script setup lang="ts">
import BarComparisionReceptionist from '@/feature/home/charts/BarComparisionReceptionist.vue'
import AgendaState from '@/feature/home/charts/AgendaState.vue'
import CardBigNumber from '@/feature/home/components/CardBigNumber.vue'
import RecentCallsTable from '@/feature/home/components/RecentCallsTable.vue'
import { useDashboardStore } from '@/stores/dashboardStore.ts'
import CallsOverTimeChart from '@/feature/home/charts/CallsOverTimeChart.vue'

const dashboardStore = useDashboardStore()
dashboardStore.fetchDashboard()
</script>

<template>
    <div class="p-3">
        <div class="border-l-4 border-primary pl-3 mb-3">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600 mt-1">Principales métricas de tu negocio</p>
        </div>

        <!-- Two column layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <!-- Left Column -->
            <div class="space-y-3">
                <!-- 3 Number Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <CardBigNumber
                        :number="dashboardStore.getOverview.countCalls"
                        description="Llamadas totales"
                    />
                    <CardBigNumber
                        :number="dashboardStore.getOverview.countDocuments"
                        description="documentos"
                    />
                    <CardBigNumber
                        :number="dashboardStore.getOverview.countReceptionist"
                        description="recepcionistas"
                    />
                </div>

                <!-- Agenda State -->
                <div class="bg-white p-3 rounded-xl shadow-md">
                    <agenda-state
                        :calendar-metrics="dashboardStore.dashboardData.calendarMetrics"
                    />
                </div>

                <!-- Bar Chart by Receptionist -->

                <bar-comparision-receptionist :history="dashboardStore.getCalendarHistory" />
            </div>

            <!-- Right Column -->
            <div class="space-y-3">
                <CallsOverTimeChart></CallsOverTimeChart>

                <!-- Recent Calls Table -->
                <recent-calls-table :history="dashboardStore.dashboardData.callHistory" />
            </div>
        </div>
    </div>
</template>
