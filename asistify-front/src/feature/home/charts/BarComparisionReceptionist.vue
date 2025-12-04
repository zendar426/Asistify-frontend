<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import type { ICallHistory } from '@/api/dashboard.ts'
//agrupando datos de llamadas atendidas por recepcionista, obtener el id del recepcionista y la cantidad de llamadas atendidas en la semana

// 1. Definimos la prop correcta para recibir el historial
const props = defineProps<{
    history: ICallHistory[]
}>()

// 2. Transformamos los datos dinámicamente
const series = computed(() => {
    // A. Obtener IDs únicos de recepcionistas
    const receptionistIds = [...new Set(props.history.map((c) => c.receptionistId))]

    // B. Mapear cada recepcionista a una serie de datos
    return receptionistIds.map((recepId) => {
        // Array de 7 ceros (Lunes a Domingo)
        const weeklyCounts = [0, 0, 0, 0, 0, 0, 0]

        // Filtramos solo las llamadas de ESTE recepcionista que estén COMPLETADAS
        const myCalls = props.history.filter(
            (c) => c.receptionistId === recepId && c.state === 'completed',
        )

        myCalls.forEach((call) => {
            const date = new Date(call.date)
            const dayOfWeek = date.getDay() // 0 = Domingo, 1 = Lunes...

            // Ajustamos índice: Queremos que Lunes sea 0 y Domingo sea 6
            // Si es 0 (Domingo) -> 6. Si no, restamos 1.
            const chartIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1

            weeklyCounts[chartIndex]++
        })

        return {
            name: recepId, // O busca el nombre real si tienes un mapa de usuarios
            data: weeklyCounts,
        }
    })
})

const chartOptions: ApexOptions = {
    chart: {
        type: 'bar',
        height: 280,
        toolbar: {
            show: true,
        },
    },
    title: {
        text: 'Comparación de llamadas atendidas por recepcionistas',
        align: 'left',
        margin: 10,
        offsetY: 0,
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238',
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 6,
            dataLabels: {
                position: 'top',
            },
        },
    },

    dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toString(),
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['#555'],
        },
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    xaxis: {
        categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        labels: {
            style: { colors: '#6B7280' },
        },
    },
    yaxis: {
        title: {
            text: 'Llamadas atendidas',
        },
        labels: {
            style: { colors: '#6B7280' },
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
    },
    colors: ['#5a69cd', '#939cd7', '#c6cbe5'],
    tooltip: {
        y: {
            formatter: (val: number) => `${val} llamadas`,
        },
    },
}
</script>

<template>
    <div class="bg-white p-3 rounded-xl shadow-md">
        <apexchart type="bar" :options="chartOptions" :series="series" />
    </div>
</template>
