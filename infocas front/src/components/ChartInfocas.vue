<template>
  <LineChart id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import Chart from 'chart.js/auto'
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

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale)

export default {
  name: 'Line',
  components: { LineChart },
  setup() {
    const store = useStore()
    const chartRef = ref(null)
    const chartData = computed(() => store.state.chartData)
    const bgColor = {
      id: 'bgColor',
      beforeDraw: (chart, options) => {
        const { ctx, width, height } = chart
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
        ctx.restore()
      }
    }
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
            drawOnChartArea: false // Solo se quieren las líneas de cuadrícula para un eje
          }
        }
      }
    }
    watchEffect(() => {
      if (chartRef.value) {
        chartRef.value.update()
      }
    })

    return {
      chartData,
      chartOptions,
      chartRef
    }
  }
}
</script>
