<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from 'apexcharts';

const chartOptionsAgended: ApexOptions = {

  plotOptions: {

    pie: {
      startAngle: -90,
      endAngle: 90,

    }
  },
  title: {
    text: 'Estado de la agenda',
    align: 'left',
    margin: 10,
    offsetY: 0,
    style: {
      fontSize:  '16px',
      fontWeight:  'bold',
      color:  '#263238'
    }
  },
  colors: ['#5a69cd', '#939cd7', '#c6cbe5'],
  labels: ['Ocupada',  'Por confirmar','Agenda libre',],
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
const series = [44, 7, 30]

</script>

<template>
  <div class="agenda-state-container">
    <VueApexCharts
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
