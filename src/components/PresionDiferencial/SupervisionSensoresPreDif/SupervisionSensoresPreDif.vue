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
      <v-card-title>{{ sensor.nombre_sensor_pre_dif }}</v-card-title>
      <v-card-subtitle>
        Fecha: {{ new Date(sensor.fecha).toLocaleDateString('es-ES', { timeZone: 'UTC' }) }} - Hora:
        {{ sensor.hora }}
      </v-card-subtitle>
      <v-card-text>
        <div>
          <strong>{{ sensor.nombre_sensor_pre_dif }} Ch1: </strong> {{ sensor.Dif_Ch1 }}
        </div>
        <div>
          <strong>{{ sensor.nombre_sensor_pre_dif }} Ch2: </strong> {{ sensor.Dif_Ch2 }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'

const sensorData = ref([])
const loading = ref(true)
const showAlert = ref(true)
let socket

onMounted(() => {
  const websocketUrl = `${import.meta.env.VITE_HOST}/SupervisionSensoresPresionDiferencial`
  socket = io(websocketUrl, {
    transports: ['websocket'],
    withCredentials: true
  })

  loading.value = true

  socket.on('responseSensorData', (data) => {
    console.log('Datos recibidos del servidor:', data)
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

const closeAlert = () => {
  showAlert.value = false
}
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
