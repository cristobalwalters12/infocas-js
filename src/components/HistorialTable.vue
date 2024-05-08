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

<script>
import axios from 'axios'
import imagenEnterprice from '../assets/etica-copia (1).png'
export default {
  name: 'HistorialTable',
  data() {
    return {
      data: [],
      imagenEnterprice: imagenEnterprice
    }
  },
  methods: {},
  mounted() {
    axios.get(`${import.meta.env.VITE_HOST}/historial`).then((response) => {
      this.data = response.data
    })
  }
}
</script>

<style scoped></style>
