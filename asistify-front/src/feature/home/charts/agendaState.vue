<script setup lang="ts">

import VueApexCharts from "vue3-apexcharts";
const chartOptionsAgended = {
  chart: {
    type: 'pie',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10
    }
  },
  title: {
    text: 'Estado de la agenda',
    align: 'center',
    margin: 10,
    offsetY: 0,
    style: {
      fontSize:  '16px',
      fontWeight:  'bold',
      color:  '#263238'
    }
  },
  labels: ['Agenda libre', 'Ocupada', 'Por confirmar'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' },
      },
    },
  ],
}
const series = [44, 55, 4]

</script>

<template>
  <VueApexCharts
    width="500"
    type="donut"
    :options="chartOptionsAgended"
    :series="series"
  />

</template>

<style scoped>

</style>
