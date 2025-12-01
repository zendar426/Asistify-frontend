<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { ref } from 'vue'
import type { ApexOptions } from 'apexcharts'
import BarComparisionReceptionist from '@/feature/home/charts/BarComparisionReceptionist.vue'
import AgendaState from '@/feature/home/charts/AgendaState.vue'
import CardBigNumber from '@/feature/home/components/CardBigNumber.vue'
import RecentCallsTable from '@/feature/home/components/RecentCallsTable.vue'
import { useDashboardStore } from '@/stores/dashboardStore.ts'

const series2 = ref([
    {
        name: 'Llamadas atendidas',
        data: [30, 45, 32, 70, 52, 49, 62],
    },
    {
        name: 'Llamadas inconclusas',
        data: [5, 8, 6, 10, 9, 7, 11],
    },
])
const dashboardStore = useDashboardStore()
dashboardStore.fetchDashboard()
const options: ApexOptions = {
    series: [
        {
            name: 'series1',
            data: [
                { x: 31, y: 22 },
                { x: 2, y: 3 },
            ],
        },
    ],
    colors: ['#5a69cd', '#939cd7'],
    chart: {
        height: 100,
        type: 'area',
    },
    dataLabels: {
        enabled: false,
    },
    title: {
        text: 'Llamadas en el tiempo',
        align: 'left',
        margin: 10,
        offsetY: 0,
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238',
        },
    },
    stroke: {
        curve: 'smooth',
    },
    xaxis: {
        type: 'datetime',
        categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
        ],
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm',
        },
    },
}
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
                <bar-comparision-receptionist />
            </div>

            <!-- Right Column -->
            <div class="space-y-3">
                <!-- Temporal Area Chart -->
                <div class="bg-white p-3 rounded-xl shadow-md">
                    <VueApexCharts
                        width="100%"
                        type="area"
                        :options="options"
                        :series="series2"
                    ></VueApexCharts>
                </div>

                <!-- Recent Calls Table -->
                <recent-calls-table />
            </div>
        </div>
    </div>
</template>
