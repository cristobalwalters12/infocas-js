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
                <th v-if="showHumidityColumn">Humedad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td>{{ item.nombre_sensor }}</td>
                <td>{{ item.fecha.split('T')[0] }}</td>
                <td>{{ item.hora }}</td>
                <td :style="getTemperatureStyle(item.temperatura)">
                  {{ item.temperatura }}°C
                  <span v-if="shouldShowLowerTempAlert(item.temperatura)">
                    ¡Alerta! Temperatura Baja
                  </span>
                  <span v-if="shouldShowHigherTempAlert(item.temperatura)">
                    ¡Alerta! Temperatura Alta
                  </span>
                </td>
                <td v-if="item.humedad !== 0" :style="getHumidityStyle(item.humedad)">
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
import { postRangeInformation } from '../api/services/sensoresServices'

export default {
  name: 'InfocasTable',
  props: ['nombreSensor', 'startDateTime', 'endDateTime'],
  data() {
    return {
      items: []
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item.humedad !== 0 || item.temperatura !== undefined)
    },
    showHumidityColumn() {
      return this.items.some((item) => item.humedad !== 0)
    },
    hasHumidityData() {
      return this.items.some((item) => item.humedad !== 0)
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
      postRangeInformation(data)
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getTemperatureStyle(temperature) {
      if (this.hasHumidityData) {
        if (temperature < 18) {
          return { backgroundColor: 'blue', color: 'white' }
        } else if (temperature > 25) {
          return { backgroundColor: 'red', color: 'white' }
        }
      } else {
        if (temperature < 2) {
          return { backgroundColor: 'blue', color: 'white' }
        } else if (temperature > 8) {
          return { backgroundColor: 'red', color: 'white' }
        }
      }
      return {}
    },
    shouldShowLowerTempAlert(temperature) {
      return this.hasHumidityData ? temperature < 18 : temperature < 2
    },
    shouldShowHigherTempAlert(temperature) {
      return this.hasHumidityData ? temperature > 25 : temperature > 8
    },
    getHumidityStyle(humidity) {
      if (humidity > 65) {
        return { backgroundColor: 'red', color: 'white' }
      }
      return {}
    }
  }
}
</script>
