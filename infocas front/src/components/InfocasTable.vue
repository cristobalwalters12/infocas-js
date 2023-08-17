<template>
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
        <td>{{ item.sensor }}</td>
        <td>{{ item.fecha }}</td>
        <td>{{ item.hora }}</td>
        <td>{{ item.temperatura }}</td>
        <td>{{ item.humedad }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import axios from 'axios'

export default {
  name: 'DataTable',
  props: ['sensorId', 'startDateTime', 'endDateTime'],
  data() {
    return {
      items: []
    }
  },
  mounted() {
    const data = {
      sensorId: this.sensorId,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime
    }
    axios
      .post('http://192.168.100.21:3000/api/query', data)
      .then((response) => {
        this.items = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
