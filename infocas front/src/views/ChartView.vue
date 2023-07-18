<template>
  <v-container class="text-start">hola qui va la foto</v-container>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="10">
        <v-card>
          <v-card-title primary-title class="large-title bg-grey-lighten-3">
            Gráficos de Temperatura y Humedad
          </v-card-title>
          <v-card>
            <v-row class="pt-7">
              <v-col cols="12" xs="12" md="4" lg="4" class="pl-7 pr-7">
                <h3>Sensor</h3>
                <v-select v-model="sensorId" label="Seleccione" :items="sensorNames"></v-select>
              </v-col>
              <v-col cols="12" xs="12" md="4" lg="2" class="pl-7 pr-7">
                <h3>Desde</h3>
                <v-text-field v-model="startDate" type="date" label="Fecha Inicial"></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="4" lg="2" class="pl-7 pr-7">
                <h3>Hasta</h3>
                <v-text-field v-model="endDate" type="date" label="Fecha Final"></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" md="4" lg="2" class="pl-7 pr-7">
                <h3>Desde</h3>
                <v-text-field v-model="startTime" type="time" label="Hora Inicial"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="2" class="pl-7 pr-7">
                <h3>Hasta</h3>
                <v-text-field v-model="endTime" type="time" label="Hora Final"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-col cols="3" class="pb-10">
                <v-btn color="blue" block rounded="lg" size="x-large" @click="logData"
                  >Generar Graficos</v-btn
                >
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-card-item>
              <chart-infocas />
            </v-card-item>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import ChartInfocas from '../components/ChartInfocas.vue'

export default {
  name: 'ChartView',
  components: {
    ChartInfocas
  },
  data() {
    return {
      sensorNames: [],
      sensorId: null,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      startDateTime: '',
      endDateTime: ''
    }
  },
  methods: {
    logData() {
      const data = {
        sensorId: this.sensorId,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime
      }

      console.log(JSON.stringify(data))

      axios.post('http://localhost:3000/api/query', data).then((response) => {
        console.log(response.data)
      })
    }
  },
  watch: {
    startDate: function (newVal, oldVal) {
      this.startDateTime = this.startDate + ' ' + this.startTime
    },
    endDate: function (newVal, oldVal) {
      this.endDateTime = this.endDate + ' ' + this.endTime
    },
    startTime: function (newVal, oldVal) {
      this.startDateTime = this.startDate + ' ' + this.startTime
    },
    endTime: function (newVal, oldVal) {
      this.endDateTime = this.endDate + ' ' + this.endTime
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/nombre').then((response) => {
      this.sensorNames = response.data.map((item) => item.nombre_sensor)
    })
  }
}
</script>
<style scoped>
.large-title {
  font-size: 2em;
}
</style>
