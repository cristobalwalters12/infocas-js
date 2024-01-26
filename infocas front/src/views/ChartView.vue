<template>
  <v-container class="text-start"></v-container>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="10">
        <v-card>
          <v-card-title primary-title class="large-title bg-grey-lighten-4 pa-6">
            Gráficos de Temperatura y Humedad
          </v-card-title>
          <v-card>
            <v-row class="pt-7">
              <v-col cols="12" xs="12" md="4" lg="4" class="pl-7 pr-7">
                <h3>Sensor</h3>
                <v-select v-model="sensorName" label="Seleccione" :items="sensorNames"></v-select>
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
                <v-btn color="pink-darken-4" block rounded="lg" size="x-large" @click="generateGraphs"
                  >Generar Graficos</v-btn
                >
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-card-item >
              <v-card class="bg-grey-lighten-4" v-if="information">
                <v-card-title primary-title class="large-title pa-3">
                  <h6>{{ selectedSensorName }}</h6>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="3"
                      ><h3>Temperatura mínima = {{ minTemp }}ºC</h3></v-col
                    >
                    <v-col cols="3"
                      ><h3>Temperatura máxima = {{ maxTemp }}ºC</h3></v-col
                    >
                    <v-col cols="3"
                      ><h3>Humedad mínima = {{ minHum }}%HR</h3></v-col
                    >
                    <v-col cols="3"
                      ><h3>Humedad máxima = {{ maxHum }}%HR</h3></v-col
                    >
                  </v-row>
                </v-card-text>
              </v-card>
              <chart-infocas v-if="isChartDataAvailable" class="mb-8" />
              <v-divider></v-divider>
              <v-card class="bg-grey-lighten-4 pt" v-if="information">
                <v-card-title primary-title class="large-title pa-3">
                  <h6>{{ selectedSensorName }}</h6>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="3"
                      ><h3>Temperatura mínima = {{ minTemp }}ºC</h3></v-col
                    >
                    <v-col cols="3"
                      ><h3>Temperatura máxima = {{ maxTemp }}ºC</h3></v-col
                    >
                  </v-row>
                </v-card-text>
              </v-card>
              <TemperatureChart v-if="isTemperatureDataAvailable" class="mb-8" />

              <v-divider></v-divider>
              <v-card class="bg-grey-lighten-4 pt" v-if="information">
                <v-card-title primary-title class="large-title pa-3">
                  <h6>{{ selectedSensorName }}</h6>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="3"
                      ><h3>Humedad mínima = {{ minHum }}%HR</h3></v-col
                    >
                    <v-col cols="3"
                      ><h3>Humedad máxima = {{ maxHum }}%HR</h3></v-col
                    >
                  </v-row>
                </v-card-text>
              </v-card>
              <HumidityChart v-if="isHumidityDataAvailable" class="mb-8" />
              <v-divider></v-divider>
              <v-card>
                <InfocasTable
                  :nombreSensor="sensorName"
                  :startDateTime="startDateTime"
                  :endDateTime="endDateTime"  />
              </v-card>
              <v-btn color="pink-darken-4" class="mt-5 ml-4 mb-2">Descargar</v-btn>
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
import TemperatureChart from '../components/TemperatureChart.vue'
import HumidityChart from '../components/HumidityChart.vue'
import InfocasTable from '../components/InfocasTable.vue'
import moment from 'moment'
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default {
  name: 'ChartView',
  components: {
    ChartInfocas,
    TemperatureChart,
    HumidityChart,
    InfocasTable
  },
  computed: {
    chartData() {
      return this.$store.state.chartData
    },
    temperatureData() {
      return this.$store.state.temperatureData
    },
    humidityData(){
      return this.$store.state.humidityData
    },
    items() {
      return this.$store.state.items
    }

  },
  data() {
    return {
      sensorNames: [],
      sensorName: '', // es para el pdf
      startDate: '', // es para el pdf
      endDate: '', // es para el pdf|
      startTime: '', // es para el pdf
      endTime: '', // es para el pdf|
      startDateTime: '',
      endDateTime: '',
      selectedSensorName: '',
      minTemp: null, // es para el pdf
      maxTemp: null, // es para el pdf
      minHum: null, // es para el pdf
      maxHum: null, // es para el pdf
      isChartDataAvailable: false,
      isTemperatureDataAvailable: false,
      isHumidityDataAvailable: false,
      information: false
    }
  },
  methods: {
    generateGraphs() {
      this.selectedSensorName = this.sensorName
      this.logData()
      this.getExtremes()
      if(this.chartData) {
        this.isChartDataAvailable = true
      }
      if(this.temperatureData) {
        this.isTemperatureDataAvailable = true
      }
      if(this.humidityData) {
        this.isHumidityDataAvailable = true
      }
      this.information = true
    },
    logData() {
      const data = {
        nombreSensor: this.sensorName,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime
      }
      console.log(data)
      axios
        .post('http://localhost:3000/sensores/range-information', data)
        .then((response) => {
          const labels = response.data.map(
            (item) => moment(item.fecha).format('YYYY-MM-DD') + ' ' + item.hora
          )
          const temperatureData = response.data.map((item) => item.temperatura)
          const humidityData = response.data.map((item) => item.humedad)
          this.$store.dispatch('updateChartData', {
            labels,
            datasets: [
              {
                label: 'Temperatura',
                data: temperatureData,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                yAxisID: 'y'
              },
              {
                label: 'Humedad',
                data: humidityData,
                backgroundColor: 'rgba(0, 0, 205, 0.2)',
                borderColor: 'rgba(0, 0, 205, 1)',
                borderWidth: 1,
                yAxisID: 'y2'
              }
            ]
          })
          this.$store.dispatch('updateTemperatureData', {
            labels,
            datasets: [
              {
                label: 'Temperatura',
                data: temperatureData,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                yAxisID: 'y'
              }
            ]
          })
          this.$store.dispatch('updateHumidityData', {
            labels,
            datasets: [
              {
                label: 'Humedad',
                data: humidityData,
                backgroundColor: 'rgba(0, 0, 205, 0.2)',
                borderColor: 'rgba(0, 0, 205, 1)',
                borderWidth: 1,
                yAxisID: 'y'
              }
            ]
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getExtremes() {
      axios
        .post('http://localhost:3000/sensores/temperature-information', {
          nombreSensor: this.sensorName,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime
        })
        
        .then((response) => {
          this.minTemp = response.data[0].minima_temperatura;
          this.maxTemp = response.data[0].maxima_temperatura;
          this.minHum = response.data[0].minima_humedad;
          this.maxHum = response.data[0].maxima_humedad;
        })
        .catch((error) => console.error(error))
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
    axios.get('http://127.0.0.1:3000/nombres-sensores').then((response) => {
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
