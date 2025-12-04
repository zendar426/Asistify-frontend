<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { ICalendarMetrics } from '@/api/dashboard.ts'

const calendar = defineProps({
    calendarMetrics: {
        type: Object as () => ICalendarMetrics,
        required: true,
    },
})
console.debug(calendar)
const series = [
    calendar.calendarMetrics.confirmedCount,
    calendar.calendarMetrics.toConfirmCount,
    calendar.calendarMetrics.availableCount,
]
const chartOptionsAgended: ApexOptions = {
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 90,
        },
    },
    title: {
        text: 'Estado de la agenda',
        align: 'left',
        margin: 10,
        offsetY: 0,
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238',
        },
    },
    colors: ['#5a69cd', '#939cd7', '#c6cbe5'],
    labels: ['Ocupada', 'Por confirmar', 'Agenda libre'],
    series: series,

    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: { width: 300 },
                legend: { position: 'right' },
            },
        },
    ],
}
const total =
    (calendar.calendarMetrics.availableCount || 0) +
    (calendar.calendarMetrics.toConfirmCount || 0) +
    (calendar.calendarMetrics.confirmedCount || 0)
</script>

<template>
    <div class="agenda-state-container">
        <div v-if="total <= 0">
            No se han registrado citas en el calendario, por favor actualize su calendario para
            poder mostrarlas
        </div>
        <VueApexCharts
            v-else
            width="100%"
            height="280"
            type="donut"
            :options="chartOptionsAgended"
            :series="series"
        />
    </div>
</template>

<style scoped>
.agenda-state-container {
    height: 150px;
    overflow: hidden;
}

.agenda-state-container :deep(.apexcharts-canvas) {
    margin-bottom: 0 !important;
}

.agenda-state-container :deep(.apexcharts-legend) {
    margin-top: -20px !important;
}
</style>
