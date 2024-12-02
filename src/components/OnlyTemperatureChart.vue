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

// Registro de plugins para Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, annotationPlugin)

export default {
  name: 'OnlyTemperatureChart',
  components: { LineChart },

  // Definición de props
  props: {
    max: {
      type: Number,
      required: true
    },
    yMin1: {
      type: Number,
      required: true
    },
    yMax1: {
      type: Number,
      required: true
    },
    yMin2: {
      type: Number,
      required: true
    },
    yMax2: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    // Ver props en la consola para depuración
    console.log('Props recibidos:', props)

    const store = useStore()

    // Computed para datos del gráfico
    const chartData = computed(() => store.state.temperatureData)

    // Opciones del gráfico
    const chartOptions = computed(() => ({
      responsive: true,
      scales: {
        y: {
          id: 'y',
          type: 'linear',
          position: 'left',
          min: 0,
          max: props.max
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              yMin: props.yMin1,
              yMax: props.yMax1,
              borderColor: 'rgb(255, 0, 0)',
              borderWidth: 2
            },
            {
              type: 'line',
              yMin: props.yMin2,
              yMax: props.yMax2,
              borderColor: 'rgb(255, 0, 0)',
              borderWidth: 2
            }
          ]
        }
      }
    }))

    return {
      chartData,
      chartOptions
    }
  }
}
</script>
