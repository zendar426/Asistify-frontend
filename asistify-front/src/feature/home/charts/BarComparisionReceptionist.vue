<script setup lang="ts">
import { ref } from 'vue'
import type {ApexOptions} from "apexcharts";

const series = ref([
  {
    name: 'María González',
    data: [32, 45, 28, 40, 38, 50, 47]
  },
  {
    name: 'Juan Pérez',
    data: [25, 35, 30, 42, 33, 39, 41]
  },
  {
    name: 'Ana Martínez',
    data: [18, 28, 25, 35, 27, 32, 36]
  }
])

const chartOptions :ApexOptions= {
  chart: {
    type: 'bar',
    height: 280,
    toolbar: {
      show: true
    }
  },
  title:{
    text: 'Comparación de llamadas atendidas por recepcionistas',
    align: 'left',
    margin: 10,
    offsetY: 0,
    style: {
      fontSize:  '16px',
      fontWeight:  'bold',
      color:  '#263238'
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 6,
      dataLabels: {
        position: 'top',
      },
    }
  },

  dataLabels: {
    enabled: true,
    formatter: (val: number) => val.toString(),
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#555']
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    labels: {
      style: { colors: '#6B7280' }
    }
  },
  yaxis: {
    title: {
      text: 'Llamadas atendidas'
    },
    labels: {
      style: { colors: '#6B7280' }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  colors: ['#5a69cd', '#939cd7', '#c6cbe5'],
  tooltip: {
    y: {
      formatter: (val: number) => `${val} llamadas`
    }
  }
}
</script>

<template>
  <div class="bg-white p-3 rounded-xl shadow-md" >
    <apexchart

      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
