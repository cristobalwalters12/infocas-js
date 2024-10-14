<template>
  <div class="d-flex flex-wrap justify-center">
    <div v-if="loading">
    <div class="d-flex flex-col">
      <v-progress-circular
      indeterminate
      color="white"
      size="64"
      class="ma-5"
    ></v-progress-circular>
    </div>
    <div>
      <v-alert text="Espere mientras se carga la informacion..." color="white" variant="tonal"></v-alert>
    </div>
    </div>
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
        Fecha: {{ new Date(sensor.fecha).toLocaleDateString('es-ES', { timeZone: 'UTC' }) }} - Hora: {{ sensor.hora }}
      </v-card-subtitle>
      <v-card-text>
        <div :class="getTemperatureClass(sensor.temperatura)">
          <strong>Temperatura:</strong> {{ sensor.temperatura }} °C
        </div>
        <div :class="getHumidityClass(sensor.humedad)">
          <strong>Humedad:</strong> {{ sensor.humedad }} %
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
      <span v-if="sensor.temperatura > 25 || sensor.temperatura < 18">
        <strong>Temperatura:</strong> {{ sensor.temperatura }}°C
      </span>
      <span v-if="sensor.humedad > 65">
        <strong>Humedad:</strong> {{ sensor.humedad }}%
      </span>
    </div>
  </v-alert>
  </div>
</template>

<script setup>
import { ref,computed, onMounted, onBeforeUnmount } from 'vue'
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

// Función para obtener la clase de temperatura
const getTemperatureClass = (temperature) => {
  if (temperature > 25) {
    return 'bg-red-accent-4'
  } else if (temperature < 18) {
    return 'bg-indigo-darken-4'
  } else {
    return ''
  }
}

// Función para obtener la clase de humedad
const getHumidityClass = (humidity) => {
  if (humidity > 65) {
    return 'bg-red-accent-4'
  } else {
    return ''
  }
}
const sensorsWithWarnings = computed(() => {
  return sensorData.value.filter(sensor => {
    return (sensor.temperatura > 25 || sensor.temperatura < 18 || sensor.humedad > 65)
  })
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
  width: 35%; /* O ajusta según el diseño que prefieras */
  max-width: 1200px;
}
</style>
