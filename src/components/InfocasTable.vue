<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title color="pink-darken-4">
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
                <td>{{ item.fecha.split('T')[0] }}</td>
                <td>{{ item.hora }}</td>
                <td :style="getTemperatureStyle(item.temperatura)">
                  {{ item.temperatura }}°C
                  <span v-if="item.temperatura < 18">¡Alerta! Temperatura Baja</span>
                  <span v-if="item.temperatura > 25">¡Alerta! Temperatura Alta</span>
                </td>
                <td :style="getHumidityStyle(item.humedad)">
                  {{ item.humedad }}%HR
                  <span v-if="item.humedad > 65">¡Alerta! Humedad Alta</span>
                </td>
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
import { postRangeInformation } from '../api/services/sensoresServices'
export default {
  name: 'InfocasTable',
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
      const response = postRangeInformation(data)
      response
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getTemperatureStyle(temperature) {
      if (temperature < 18) {
        return { backgroundColor: 'blue', color: 'white' }
      } else if (temperature > 25) {
        return { backgroundColor: 'red', color: 'white' }
      } else {
        return {}
      }
    },
    getHumidityStyle(humidity) {
      if (humidity > 65) {
        return { backgroundColor: 'red', color: 'white' }
      } else {
        return {}
      }
    }
  }
}
</script>
