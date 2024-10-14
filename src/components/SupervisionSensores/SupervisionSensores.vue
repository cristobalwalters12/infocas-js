<template>
  <div class="d-flex flex-wrap justify-center">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="64"
      class="ma-5"
    ></v-progress-circular>
    <v-card
      v-for="sensor in sensorData"
      :key="sensor.numero_registro"
      class="ma-4"
      max-width="400"
      variant="tonal"
      v-else
    >
      <v-card-title>
        {{ sensor.nombre_sensor }}
      </v-card-title>
      <v-card-subtitle>
        Fecha: {{ new Date(sensor.fecha).toLocaleDateString() }} - Hora: {{ sensor.hora }}
      </v-card-subtitle>
      <v-card-text>
        <div><strong>Temperatura:</strong> {{ sensor.temperatura }} °C</div>
        <div><strong>Humedad:</strong> {{ sensor.humedad }} %RH</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'

const sensorData = ref([]) // Inicializa como array para almacenar los datos de sensores
const loading = ref(true) // Estado de carga
let socket

onMounted(() => {
  // Conectar con el servidor WebSocket
  const websocketUrl = `${import.meta.env.VITE_HOST}/SupervisionSensores`
  socket = io(websocketUrl, {
    transports: ['websocket'],
    withCredentials: true
  })

  // Muestra el spinner de carga cuando comience la solicitud
  loading.value = true

  // Recibir los datos del servidor y actualizar la variable reactiva
  socket.on('responseSensorData', (data) => {
    console.log('Datos de sensores recibidos:', data)
    sensorData.value = data // Asigna los datos a sensorData
    loading.value = false // Oculta el spinner de carga cuando los datos estén listos
  })

  // Manejar errores si los hay
  socket.on('error', (error) => {
    console.error('Error recibido del servidor:', error.message)
    loading.value = false // Ocultar el spinner de carga si ocurre un error
  })
})

// Desconectar el socket cuando el componente se desmonta
onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect()
  }
})
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
