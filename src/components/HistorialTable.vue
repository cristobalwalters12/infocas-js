<template>
  <div>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
    <v-card>
      <v-card-title
        primary-title
        class="text-h4 bg-grey-lighten-4 pa-6 d-flex justify-space-between"
      >
        Historial descarga de archivos de los sensores
        <v-btn color="pink-darken-4" @click="$router.push('/chart')">Volver a los graficos</v-btn>
      </v-card-title>
      <v-table height="400px">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Responsable</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Nombre del archivo del sensor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.responsable }}</td>
            <td>{{ item.fecha }}</td>
            <td>{{ item.nombre_archivo }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import imagenEnterprice from '../assets/etica-copia (1).png'
import { getHistorial } from '../api/services/historialService'

const data = ref([]) 


const fetchHistorialData = async () => {
  try {
    const historialData = await getHistorial()
    data.value = historialData
  } catch (error) {
    console.error('Error fetching historial data:', error)
  }
}

onMounted(fetchHistorialData)
</script>

<style scoped></style>
