<template>
  <div class="d-flex flex-wrap justify-center">
    <div v-if="loading">
      <div class="d-flex flex-col">
        <v-progress-circular indeterminate color="white" size="64" class="ma-5" />
      </div>
      <v-alert text="Espere mientras se carga la información..." color="white" variant="tonal" />
    </div>

    <v-card
      v-for="sensor in sensorData"
      :key="sensor.numero_registro"
      class="ma-4"
      max-width="400"
      variant="tonal"
      v-else
    >
      <v-card-title>{{ sensor.nombre_sensor }}</v-card-title>
      <v-card-subtitle>
        Fecha: {{ new Date(sensor.fecha).toLocaleDateString('es-ES', { timeZone: 'UTC' }) }} - Hora:
        {{ sensor.hora }}
      </v-card-subtitle>
      <v-card-text>
        <div :class="getTemperatureClass(sensor)">
          <strong>Temperatura:</strong> {{ sensor.temperatura }} °C
        </div>
        <div :class="getHumidityClass(sensor.humedad)">
          <strong>Humedad:</strong> {{ formatHumidity(sensor.humedad) }}
        </div>
      </v-card-text>
    </v-card>

    <!-- Alerta de advertencia con botón de cierre -->
    <v-alert
      v-if="showAlert && sensorsWithWarnings.length > 0"
      color="red-darken-3"
      prominent
      class="fixed-alert"
    >
      <v-btn icon="mdi-close" variant="text" @click="closeAlert" class="close-btn" />
      <div v-for="sensor in sensorsWithWarnings" :key="sensor.numero_registro">
        <strong>{{ sensor.nombre_sensor }}</strong> -
        <span v-if="shouldShowTemperatureAlert(sensor)">
          <strong>Temperatura:</strong> {{ sensor.temperatura }}°C
        </span>
        <span v-if="sensor.humedad > 65">
          <strong>Humedad:</strong> {{ formatHumidity(sensor.humedad) }}
        </span>
      </div>
    </v-alert>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'

const sensorData = ref([])
const loading = ref(true)
const showAlert = ref(true) // Estado para controlar la visibilidad de la alerta
let socket

const excludeList = [
  'BODEGA SUB N1P4 PR-TGHP-01',
  'BODEGA SUB N2P13 PR-TGHP-02',
  'BODEGA SUB N3P23 PR-TGHP-03',
  'BODEGA SUB N4P33 PR-TGHP-04',
  'BODEGA SUB N3P27 PR-TGHP-05',
  'BODEGA SUB N4P37 PR-TGHP-06',
  'BODEGA SUB N_P_ PR-TGHP-07',
  'BODEGA SUB N2P15 PR-TGHP-08',
  'BODEGA SUB N4P35 PR-TGHP-09',
  'BODEGA SUB N3P20 PR-TGHP-10',
  'BODEGA SUB N4P30 PR-TGHP-11',
  'BODEGA SUB N3P24 PR-TGHP-12',
  'BODEGA SUB N1P2 PR-TGHP-13',
  'BODEGA SUB N2P11 PR-TGHP-14',
  'Pasillo 1 Bodega Santa Elena PR-TGHP-45',
  'Pasillo 2 Bodega Santa Elena PR-TGHP-46',
  'Pasillo 3 Bodega Santa Elena PR-TGHP-47',
  'Pasillo 4 Bodega Santa Elena PR-TGHP-48',
  'Bodega Muestreo PR-TGHP-57',
  'Pasillo Bodega Muestreo PR-TGHP-58',
  'BODEGA PULMÓN PR-TGHP-60',
  'BODEGA PULMÓN FONDO PR-TGHP-61'
]

onMounted(() => {
  const websocketUrl = `${import.meta.env.VITE_HOST}/SupervisionSensores`
  socket = io(websocketUrl, {
    transports: ['websocket'],
    withCredentials: true
  })

  loading.value = true

  socket.on('responseSensorData', (data) => {
    const filteredData = data.filter((sensor) => !excludeList.includes(sensor.nombre_sensor))
    sensorData.value = filteredData
    loading.value = false
  })

  socket.on('error', (error) => {
    console.error('Error recibido del servidor:', error.message)
    loading.value = false
  })
})

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect()
  }
})

const closeAlert = () => {
  showAlert.value = false
}

// Formatea la humedad para mostrar "Sin registro" si es 0
const formatHumidity = (humidity) => {
  return humidity === 0 ? 'Sin registro' : `${humidity} %`
}

const getTemperatureClass = (sensor) => {
  const { nombre_sensor, temperatura } = sensor
  if (nombre_sensor === 'Cámara Fría Bodega PR-TEM 112') {
    if (temperatura > 8) {
      return 'bg-red-accent-4'
    } else if (temperatura < 2) {
      return 'bg-indigo-darken-4'
    }
  } else {
    if (temperatura > 25) {
      return 'bg-red-accent-4'
    } else if (temperatura < 18) {
      return 'bg-indigo-darken-4'
    }
  }
  return ''
}

const shouldShowTemperatureAlert = (sensor) => {
  const { nombre_sensor, temperatura } = sensor
  if (nombre_sensor === 'Cámara Fría Bodega PR-TEM 112') {
    return temperatura > 8 || temperatura < 2
  } else {
    return temperatura > 25 || temperatura < 18
  }
}

const getHumidityClass = (humidity) => {
  if (humidity > 65) {
    return 'bg-red-accent-4'
  }
  return ''
}

const sensorsWithWarnings = computed(() => {
  return sensorData.value.filter(
    (sensor) => shouldShowTemperatureAlert(sensor) || sensor.humedad > 65
  )
})
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.red-accent-4 {
  color: #d50000;
}

.indigo-darken-4 {
  color: #1a237e;
}

.fixed-alert {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 35%;
  max-width: 1200px;
  padding-right: 40px;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
}
</style>
