<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { useDashboardStore } from '@/stores/dashboardStore.ts'

const dashboardStore = useDashboardStore()

// 1. Transformamos los datos del Store para el gráfico de Área
const series = computed(() => {
    const history = dashboardStore.getCalendarHistory || []

    // Mapa para agrupar llamadas por hora (evita puntos superpuestos)
    // Key: Timestamp de la hora, Value: Contadores
    const groupedMap = new Map<number, { attended: number; missed: number }>()

    history.forEach((call) => {
        // Redondeamos la fecha al inicio de la hora para agrupar
        // Ejemplo: 10:15 y 10:45 se suman a las 10:00
        const dateObj = new Date(call.date)
        dateObj.setMinutes(0, 0, 0)
        const timestamp = dateObj.getTime()

        if (!groupedMap.has(timestamp)) {
            groupedMap.set(timestamp, { attended: 0, missed: 0 })
        }

        const entry = groupedMap.get(timestamp)!

        // Mapeamos el estado del backend (completed/missed) a los contadores
        if (call.state === 'completed') {
            entry.attended++
        } else {
            entry.missed++
        }
    })

    // Ordenamos cronológicamente (necesario para gráficos de línea/área)
    const sortedTimestamps = Array.from(groupedMap.keys()).sort((a, b) => a - b)

    // Generamos las series en formato [x, y] que pide ApexCharts
    return [
        {
            name: 'Llamadas atendidas',
            data: sortedTimestamps.map((t) => [t, groupedMap.get(t)!.attended]),
        },
        {
            name: 'Llamadas inconclusas',
            data: sortedTimestamps.map((t) => [t, groupedMap.get(t)!.missed]),
        },
    ]
})

// 2. Opciones del gráfico
const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        height: 300, // Un poco más alto para que se vea bien
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
    },
    colors: ['#5a69cd', '#ef4444'], // Azul para OK, Rojo para Inconclusas (Mejor contraste)
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    title: {
        text: 'Llamadas en el tiempo',
        align: 'left',
        margin: 10,
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238',
        },
    },
    xaxis: {
        type: 'datetime', // Importante: detecta automáticamente los timestamps de la serie
        labels: {
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
            },
        },
        tooltip: { enabled: false },
    },
    yaxis: {
        min: 0,
        decimalsInFloat: 0, // Para no mostrar 1.5 llamadas
    },
    tooltip: {
        x: { format: 'dd MMM HH:mm' }, // Formato al pasar el mouse
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100],
        },
    },
}))
</script>

<template>
    <div class="bg-white p-3 rounded-xl shadow-md">
        <div
            v-if="!dashboardStore.getCalendarHistory.length"
            class="h-[300px] flex items-center justify-center text-gray-400 text-sm"
        >
            Sin datos históricos disponibles
        </div>

        <VueApexCharts
            v-else
            width="100%"
            height="300"
            type="area"
            :options="chartOptions"
            :series="series"
        />
    </div>
</template>
