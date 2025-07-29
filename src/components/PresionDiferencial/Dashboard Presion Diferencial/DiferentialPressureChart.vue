<template>
  <LineChart id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement
} from 'chart.js'

// ✅ Registrar componentes de Chart.js solo una vez
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale)

// ✅ Acceder al store de Vuex
const store = useStore()

// ✅ chartData reactivo, escucha cambios en el store
const chartData = computed(() => store.state.chartDataCh1Ch2)

// ✅ Opciones inmutables del gráfico
const chartOptions = {
  responsive: true,
  scales: {
    y: {
      id: 'y',
      type: 'linear',
      position: 'left'
    },
    y2: {
      id: 'y2',
      type: 'linear',
      position: 'right',
      grid: {
        drawOnChartArea: false
      }
    }
  }
}
</script>
