<script setup lang="ts">
import { ref } from 'vue'

const series = ref([
  {
    name: 'Jane Doe',
    data: [32, 45, 28, 40, 38, 50, 47]
  },
  {
    name: 'John Smith',
    data: [25, 35, 30, 42, 33, 39, 41]
  },
  {
    name: 'Emily Davis',
    data: [18, 28, 25, 35, 27, 32, 36]
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 380,
    toolbar: {
      show: true
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
  colors: ['#3B82F6', '#10B981', '#F59E0B'], // azul, verde, amarillo
  tooltip: {
    y: {
      formatter: (val: number) => `${val} llamadas`
    }
  }
})
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-md" >
    <h2 class="text-xl font-semibold mb-4">Llamadas atendidas por recepcionista</h2>
    <apexchart

      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
