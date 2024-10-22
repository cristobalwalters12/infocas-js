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

    <v-alert
      v-if="sensorsWithWarnings.length > 0"
      color="red-darken-3"
      prominent
      :dismissible="false"
      class="fixed-alert"
    >
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

const sensorData = ref([]) // Datos de los sensores
const loading = ref(true) // Estado de carga
let socket

onMounted(() => {
  const websocketUrl = `${import.meta.env.VITE_HOST}/SupervisionSensores`
  socket = io(websocketUrl, {
    transports: ['websocket'],
    withCredentials: true
  })

  loading.value = true

  socket.on('responseSensorData', (data) => {
    console.log('Datos de sensores recibidos:', data)
    sensorData.value = data
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
}
</style>
