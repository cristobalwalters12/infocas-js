<template>
  <LineChart :options="chartOptions" :data="chartData" />
</template>

<script>
import { computed } from 'vue'
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
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, annotationPlugin)

export default {
  name: 'OnlytemperatureChart',
  components: { LineChart },

  setup() {
    const store = useStore()
    const chartData = computed(() => store.state.temperatureData)
    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          id: 'y',
          type: 'linear',
          position: 'left',
          min: 0,
          max: 13
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              yMin: 2,
              yMax: 2,
              borderColor: 'rgb(255, 0, 0)',
              borderWidth: 2
            },
            {
              type: 'line',
              yMin: 8,
              yMax: 8,
              borderColor: 'rgb(255, 0, 0)',
              borderWidth: 2
            }
          ]
        }
      }
    }

    return {
      chartData,
      chartOptions
    }
  }
}
</script>
