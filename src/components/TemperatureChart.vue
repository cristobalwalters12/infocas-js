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
  name: 'temperatureChart',
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
          min: 5,
          max: 40
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              yMin: 18,
              yMax: 18,
              borderColor: 'rgb(255, 0, 0)',
              borderWidth: 2
            },
            {
              type: 'line',
              yMin: 25,
              yMax: 25,
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
