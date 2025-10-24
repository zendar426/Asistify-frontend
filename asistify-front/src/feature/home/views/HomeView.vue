<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts"
import { ref } from 'vue'
import BarComparisionReceptionist from "@/feature/home/charts/barComparisionReceptionist.vue";
import AgendaState from "@/feature/home/charts/agendaState.vue";

const series2 = ref([
  {
    name: 'Llamadas atendidas',
    data: [30, 45, 32, 70, 52, 49, 62]
  },
  {
    name: 'Llamadas no atendidas',
    data: [5, 8, 6, 10, 9, 7, 11]
  }
])


const options = {
  series: [{
    name: 'series1',
    data: [{x:31,y:22}, {x:2,y:3}]
  }],
  chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
};
</script>

<template>
  <div class="p-6 sm:ml-64">
    <h2 class="text-xl font-semibold mb-2">Dashboard</h2>
    <p class="text-gray-600 mb-6">
      Resumen general del rendimiento de Asistify.
    </p>

    <!-- Asegúrate de usar :series y :options -->

    <VueApexCharts width="500" type="area" :options="options" :series="series2"></VueApexCharts>
    <agenda-state/>
    <bar-comparision-receptionist  />
  </div>
</template>
