<template>
  <v-expansion-panels>
    <v-expansion-panel>
    <v-expansion-panel-title>
      <h3 v-if="nombreSensor">Tabla de datos de {{ nombreSensor }}</h3>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-card>
    <v-table>
    <thead>
      <tr>
        <th>Sensor</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Temperatura</th>
        <th>Humedad</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.nombre_sensor }}</td>
        <td>{{ item.fecha }}</td>
        <td>{{ item.hora }}</td>
        <td>{{ item.temperatura }}</td>
        <td>{{ item.humedad }}</td>
      </tr>
    </tbody>
  </v-table>
  </v-card>
    </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
import axios from 'axios'

export default {
  name: 'DataTable',
  props: ['nombreSensor', 'startDateTime', 'endDateTime'],
  data() {
    return {
      items: []
    }
  },
  watch: {
    nombreSensor: 'getData',
    startDateTime: 'getData',
    endDateTime: 'getData'
  },
  methods: {
    getData() {
      const data = {
        nombreSensor: this.nombreSensor,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime
      }
      axios
        .post('http://localhost:3000/sensores/range-information', data)
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>