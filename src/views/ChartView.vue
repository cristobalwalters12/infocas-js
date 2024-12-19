<template>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" xl="10">
        <v-row>
          <v-col cols="4" class="d-flex justify-start">
            <img
              :src="imagenEnterprice"
              alt="imagenEnterprice"
              style="width: 210px; height: 110px"
            />
          </v-col>
          <v-col cols="8" class="d-flex justify-start mt-14">
            <h4 class="text-h4 text--red">Bienvenido {{ nombrePersonas }}</h4>
          </v-col>
        </v-row>
        <v-card>
          <v-card-title
            primary-title
            class="text-h4 bg-grey-lighten-4 pa-6 d-flex justify-space-between"
          >
            Gráficos de Temperatura y Humedad
            <div class="d-flex">
              <div class="mr-4">
                <v-btn color="pink-darken-4" @click="$router.push('/Options')"
                  >Volver a al menu</v-btn
                >
              </div>
              <div>
                <v-btn color="pink-darken-4" @click="cerrarSesion">Cerrar Sesion</v-btn>
              </div>
            </div>
          </v-card-title>
          <v-card>
            <v-row class="pt-7">
              <v-col cols="12" xs="12" md="4" lg="4" class="pl-7 pr-7">
                <h3>Sensor</h3>
                <v-select v-model="sensorName" label="Seleccione" :items="sensorNames"></v-select>
              </v-col>
              <v-col cols="12" xs="12" md="4" lg="2" class="pr-6">
                <h3>Desde</h3>
                <v-text-field v-model="startDate" type="date" label="Fecha Inicial"></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="4" lg="2" class="pr-6">
                <h3>Hasta</h3>
                <v-text-field v-model="endDate" type="date" label="Fecha Final"></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" md="4" lg="2" class="pr-7">
                <h3>Desde</h3>
                <v-text-field v-model="startTime" type="time" label="Hora Inicial"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="2" class="pr-7">
                <h3>Hasta</h3>
                <v-text-field v-model="endTime" type="time" label="Hora Final"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-col cols="3" class="pb-10">
                <v-btn
                  color="pink-darken-4"
                  block
                  rounded="lg"
                  size="x-large"
                  @click="generateGraphs"
                  >Generar Graficos</v-btn
                >
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center" v-if="info">
              <v-col cols="6" class="pb-5">
                <v-alert
                  type="info"
                  text="Para mostrar los gráficos y la tabla de datos del sensor, se deben rellenar los campos."
                  variant="tonal"
                  color="pink-darken-4"
                ></v-alert>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-item>
              <div v-if="hasHumidityData">
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
                <chart-infocas v-if="isChartDataAvailable" class="mb-8" ref="chartComponent1" />
                <v-divider></v-divider>
              </div>
              <div v-if="hasHumidityData">
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
                <TemperatureChart
                  v-if="isTemperatureDataAvailable"
                  class="mb-8"
                  ref="chartComponent2"
                />
                <v-divider></v-divider>
              </div>
              <div v-if="showChartTemperatureOnly">
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
                <OnlyTemperatureChart
                  v-if="isTemperatureDataAvailable"
                  class="mb-8"
                  ref="chartComponent2"
                  :max="chartProps.max"
                  :yMin1="chartProps.yMin1"
                  :yMax1="chartProps.yMax1"
                  :yMin2="chartProps.yMin2"
                  :yMax2="chartProps.yMax2"
                />

                <v-divider></v-divider>
              </div>
              <div v-if="hasHumidityData">
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
                <HumidityChart v-if="isHumidityDataAvailable" class="mb-8" ref="chartComponent3" />
                <v-divider></v-divider>
              </div>
              <v-card>
                <InfocasTable
                  :nombreSensor="sensorName"
                  :startDateTime="startDateTime"
                  :endDateTime="endDateTime"
                  ref="infocasTable"
                />
              </v-card>
              <v-btn
                color="pink-darken-4"
                class="mt-5 ml-4 mb-2"
                :disabled="dialog"
                :loading="dialog"
                @click="descargarPdf()"
                >Descargar PDF</v-btn
              >
              <v-btn
                v-if="isAdmin || isSuperAdmin"
                color="pink-darken-4"
                class="mt-5 ml-4 mb-2"
                @click="$router.push('/historial')"
                >Ir a historial</v-btn
              >
              <v-btn
                v-if="isAdmin || isSuperAdmin"
                color="pink-darken-4"
                class="mt-5 ml-4 mb-2"
                @click="$router.push('/usuario')"
                >Ir a Usuarios</v-btn
              >
              <v-btn
                v-if="isAdmin || isSuperAdmin"
                color="pink-darken-4"
                class="mt-5 ml-4 mb-2"
                @click="$router.push('/Respaldos')"
                >Ir a Respaldos</v-btn
              >
              <div class="text-center">
                <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
                  <v-card color="pink-darken-4">
                    <v-card-text>
                      Se esta generando y descargando el archivo, por favor espere...
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-item>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="d-flex justify-center mt-8" flat>
      <footerComponent />
    </v-card>
    <v-card class="d-flex justify-end mt-14 pl-5" flat>
      <VersionFooter />
    </v-card>
  </v-container>
</template>
<script>
import axios from 'axios'
import ChartInfocas from '../components/ChartInfocas.vue'
import imagenEnterprice from '../assets/etica-copia (1).png'
import footerComponent from '../components/footer.vue'
import HumidityChart from '../components/HumidityChart.vue'
import TemperatureChart from '../components/TemperatureChart.vue'
import InfocasTable from '../components/InfocasTable.vue'
import VersionFooter from '../components/VersionFooter.vue'
import moment from 'moment'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { logoBase64 } from '../base64images/logo'
import {
  getNombreSensores,
  getTemperatureInformation,
  postRangeInformation
} from '../api/services/sensoresServices'

import html2canvas from 'html2canvas'
import { InsertarResponsable } from '../api/services/historialService'
import { mapState } from 'vuex'
import OnlyTemperatureChart from '../components/OnlyTemperatureChart.vue'

export default {
  name: 'ChartView',
  components: {
    ChartInfocas,
    TemperatureChart,
    HumidityChart,
    InfocasTable,
    footerComponent,
    VersionFooter,
    OnlyTemperatureChart
  },

  computed: {
    ...mapState(['chartData', 'temperatureData', 'humidityData']),
    hasHumidityData() {
      return this.minHum > 0 || this.maxHum > 0
    },
    showChartTemperatureOnly() {
      return this.minHum <= 0
    },

    chartData() {
      return this.$store.state.chartData
    },
    temperatureData() {
      return this.$store.state.temperatureData
    },
    humidityData() {
      return this.$store.state.humidityData
    },
    items() {
      return this.$store.state.items
    },
    isAdmin() {
      return localStorage.getItem('user-role') === 'Administrador'
    },
    isSuperAdmin() {
      return localStorage.getItem('user-role') === 'Superadmin'
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
      information: false,
      info: true,
      imagenEnterprice: imagenEnterprice,
      dialog: false,
      nombrePersonas: '',
      chartProps: {
        max: 0,
        yMin1: 0,
        yMax1: 0,
        yMin2: 0,
        yMax2: 0
      }
    }
  },

  methods: {
    generateGraphs() {
      this.selectedSensorName = this.sensorName
      this.logData()
      this.getExtremes()
      if (this.chartData) {
        this.isChartDataAvailable = true
      }
      if (this.temperatureData) {
        this.isTemperatureDataAvailable = true
      }
      if (this.humidityData) {
        this.isHumidityDataAvailable = true
      }
      this.information = true
      this.info = false
      switch (this.sensorName) {
        case 'CAMARA FRIA PR-TEM-122':
          this.chartProps = {
            max: 13,
            yMin1: 8,
            yMax1: 8,
            yMin2: 2,
            yMax2: 2
          }
          break
        case 'CAMARA FRESCA PR-TEM-123':
          this.chartProps = {
            max: 20,
            yMin1: 15,
            yMax1: 15,
            yMin2: 8,
            yMax2: 8
          }
          break
      }
    },
    logData() {
      const data = {
        nombreSensor: this.sensorName,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime
      }
      postRangeInformation(data)
        .then((response) => {
          const labels = response.data.map(
            (item) => moment.utc(item.fecha).format('YYYY-MM-DD') + ' ' + item.hora
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
      try {
        getTemperatureInformation({
          nombreSensor: this.sensorName,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime
        })
          .then((response) => {
            this.minTemp = response.data[0].minima_temperatura
            this.maxTemp = response.data[0].maxima_temperatura
            this.minHum = response.data[0].minima_humedad
            this.maxHum = response.data[0].maxima_humedad
          })
          .catch((error) => console.error(error))
      } catch (error) {
        console.error(error)
      }
    },
    getAlertRanges() {
      if (this.sensorName === 'CAMARA FRESCA PR-TEM-123') {
        return { low: 8, high: 15 } // Rangos específicos para este sensor
      } else if (this.sensorName === 'CAMARA FRIA PR-TEM-122') {
        return { low: 2, high: 8 } // Rangos específicos para otro sensor
      } else {
        // Rangos por defecto
        return this.$refs.infocasTable.showHumidityColumn
          ? { low: 18, high: 25 }
          : { low: 2, high: 8 }
      }
    },
    getTemperatureStyle(temperature) {
      const { low, high } = this.getAlertRanges()
      if (temperature < low) {
        return { backgroundColor: 'blue', color: 'white' } // Temperatura Baja
      } else if (temperature > high) {
        return { backgroundColor: 'red', color: 'white' } // Temperatura Alta
      }
      return {} // Sin alerta
    },

    generarPdf() {
      const doc = new jsPDF('l', 'pt', 'a4')
      const getDate = new Date()
      doc.setProperties({
        title: new Date(getDate).toLocaleString('es-ES', { hour12: false }) + ' ' + this.sensorName,
        subject: 'Información del sensor'
      })

      let img = new Image()
      img.src = logoBase64

      const text = 'Gráficos de Temperatura y Humedad'
      doc.setFontSize(20)
      const pageSize = doc.internal.pageSize
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
      const textOffset = (pageWidth - doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / 2
      doc.text(text, textOffset, 45)
      doc.setFontSize(12)
      doc.text(
        60,
        80,
        `Informe emitido por ${this.nombrePersonas} con gráfica de temperatura y humedad relacionadas al sensor`
      )
      doc.text(
        60,
        95,
        `${this.sensorName} con fecha de ${this.startDate} a ${this.endDate} desde las ${this.startTime} hasta las ${this.endTime} horas`
      )
      if (this.showChartTemperatureOnly) {
        doc.text(60, 120, `Temperatura mínima= ${this.minTemp}ºC`)
        doc.text(240, 120, `Temperatura máxima= ${this.maxTemp}ºC`)
      } else {
        doc.text(60, 120, `Temperatura mínima= ${this.minTemp}ºC`)
        doc.text(240, 120, `Temperatura máxima= ${this.maxTemp}ºC`)
        doc.text(480, 120, `Humedad mínima= ${this.minHum}%HR`)
        doc.text(660, 120, `Humedad máxima= ${this.maxHum}%HR`)
      }
      const canvasPromises = [
        this.$refs.chartComponent1
          ? html2canvas(this.$refs.chartComponent1.$el)
          : Promise.resolve(null),
        this.$refs.chartComponent2
          ? html2canvas(this.$refs.chartComponent2.$el)
          : Promise.resolve(null),
        this.$refs.chartComponent3
          ? html2canvas(this.$refs.chartComponent3.$el)
          : Promise.resolve(null)
      ]

      Promise.all(canvasPromises)
        .then(([canvas1, canvas2, canvas3]) => {
          const imgWidth = 750
          const x = (pageWidth - imgWidth) / 2
          if (canvas1) {
            const imgData1 = canvas1.toDataURL('image/jpeg')
            doc.addImage(imgData1, 'JPEG', x, 130, imgWidth, 450, undefined)
            doc.addPage()
          }

          if (canvas2) {
            doc.text(
              60,
              80,
              `Informe emitido por ${this.nombrePersonas} con gráfica de temperatura y humedad relacionadas al sensor`
            )
            doc.text(
              60,
              95,
              `${this.sensorName} con fecha de ${this.startDate} a ${this.endDate} desde las ${this.startTime} hasta las ${this.endTime} horas`
            )
            doc.text(60, 120, `Temperatura mínima= ${this.minTemp}ºC`)
            doc.text(240, 120, `Temperatura máxima= ${this.maxTemp}ºC`)
            const imgData2 = canvas2.toDataURL('image/jpeg')
            doc.addImage(imgData2, 'JPEG', x, 130, imgWidth, 450, undefined)
            doc.addPage()
          }
          if (canvas3) {
            doc.text(
              60,
              80,
              `Informe emitido por ${this.nombrePersonas} con gráfica de temperatura y humedad relacionadas al sensor`
            )
            doc.text(
              60,
              95,
              `${this.sensorName} con fecha de ${this.startDate} a ${this.endDate} desde las ${this.startTime} hasta las ${this.endTime} horas`
            )
            doc.text(60, 120, `Humedad mínima= ${this.minHum}%HR`)
            doc.text(240, 120, `Humedad máxima= ${this.maxHum}%HR`)
            const imgData3 = canvas3.toDataURL('image/jpeg')
            doc.addImage(imgData3, 'JPEG', x, 130, imgWidth, 450, undefined)
            doc.addPage()
          }
          if (this.$refs.infocasTable?.items) {
            // Acceder a la propiedad showHumidityColumn desde la referencia del componente hijo
            const showHumidityColumn = this.$refs.infocasTable.showHumidityColumn

            // Configurar las cabeceras dinámicamente
            const headers = ['Sensor', 'Fecha', 'Hora', 'Temperatura']
            if (showHumidityColumn) {
              headers.push('Humedad')
            }

            // Generar las filas dinámicamente según los datos y rangos
            const data = this.$refs.infocasTable.items.map((item) => {
              const { low, high } = this.getAlertRanges() // Obtener rangos dinámicos

              const row = [
                item.nombre_sensor,
                item.fecha.split('T')[0],
                item.hora,
                `${item.temperatura}°C`
              ]

              // Evaluar alertas de temperatura
              if (item.temperatura < low) {
                row[3] += ' ¡Alerta! Temperatura Baja'
              } else if (item.temperatura > high) {
                row[3] += ' ¡Alerta! Temperatura Alta'
              }

              // Evaluar alertas de humedad
              if (showHumidityColumn) {
                let humedad = `${item.humedad}%HR`
                if (item.humedad > 65) humedad += ' ¡Alerta! Humedad Alta'
                row.push(humedad)
              }

              return row
            })

            // Generar la tabla PDF
            doc.autoTable({
              margin: { top: 120 },
              head: [headers],
              body: data,
              didDrawPage: (data) => {
                doc.text(
                  `Tabla de datos de las temperatura y humedad relacionadas al sensor ${this.sensorName}`,
                  60,
                  80
                )
                doc.text(
                  `Con fecha de ${this.startDate} a ${this.endDate} desde las ${this.startTime} hasta las ${this.endTime} horas`,
                  60,
                  95
                )
              },
              didParseCell: (data) => {
                const text = data.cell.text[0]

                // Aplicar estilos de color según las alertas
                if (text.includes('¡Alerta! Temperatura Baja')) {
                  data.cell.styles.fillColor = [0, 0, 255] // Azul
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                } else if (text.includes('¡Alerta! Temperatura Alta')) {
                  data.cell.styles.fillColor = [255, 0, 0] // Rojo
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                } else if (text.includes('¡Alerta! Humedad Alta')) {
                  data.cell.styles.fillColor = [255, 0, 0] // Rojo
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                }
              }
            })
          }

          this.addWaterMark(doc, img)
          doc.save(
            `${new Date(getDate).toLocaleString('es-ES', { hour12: false })} ${this.sensorName}.pdf`
          )
        })
        .catch((error) => {
          console.error('Error al convertir el componente en imagen:', error)
        })
    },

    addWaterMark(pdf, waterMarkImage) {
      let totalPage = pdf.internal.getNumberOfPages()
      let fechaHoy = new Date()
      let fecha = `${fechaHoy.getDate()}-${fechaHoy.getMonth() + 1}-${fechaHoy.getFullYear()}`
      const hora1 = this.startTime
      const hora2 = this.endTime
      for (let i = 1; i <= totalPage; i++) {
        pdf.setPage(i)
        pdf.addImage(waterMarkImage, 'JPEG', 685, 8, 106, 77)
        pdf.setFontSize(12)
        pdf.text(60, 45, fecha)
      }
      return pdf
    },

    cerrarSesion() {
      window.location.href = 'https://www.infocas.cl'
      localStorage.removeItem('user-token')
      sessionStorage.removeItem('user-token')
    },
    descargarPdf() {
      this.dialog = true
      this.generarPdf()
      this.insertarResponsable()
    },
    insertarResponsable() {
      try {
        InsertarResponsable({
          responsable: this.nombrePersonas,
          fecha: new Date().toISOString().split('T')[0],
          nombre_archivo: this.selectedSensorName
        })
      } catch (error) {
        console.error('Error al insertar responsable:', error)
      }
    },
    async fetchSensorNames() {
      const excludeList = [
        'BODEGA SUB N1P4 PR-TGHP-01',
        'BODEGA SUB N2P13 PR-TGHP-02',
        'BODEGA SUB N3P23 PR-TGHP-03',
        'BODEGA SUB N4P33 PR-TGHP-04',
        'BODEGA SUB N3P27 PR-TGHP-05',
        'BODEGA SUB N4P37 PR-TGHP-06',
        'BODEGA SUB N_P_ PR-TGHP-07',
        'BODEGA SUB N2P15 PR-TGHP-08',
        'BODEGA SUB N4P35 PR-TGHP-09',
        'BODEGA SUB N3P20 PR-TGHP-10',
        'BODEGA SUB N4P30 PR-TGHP-11',
        'BODEGA SUB N3P24 PR-TGHP-12',
        'BODEGA SUB N1P2 PR-TGHP-13',
        'BODEGA SUB N2P11 PR-TGHP-14',
        'Pasillo 1 Bodega Santa Elena PR-TGHP-45',
        'Pasillo 2 Bodega Santa Elena PR-TGHP-46',
        'Pasillo 3 Bodega Santa Elena PR-TGHP-47',
        'Pasillo 4 Bodega Santa Elena PR-TGHP-48',
        'Bodega Muestreo PR-TGHP-57',
        'Pasillo Bodega Muestreo PR-TGHP-58'
      ]
      try {
        const data = await getNombreSensores()
        const nombres = data.map((item) => item.nombre_sensor)
        this.sensorNames = nombres.filter((item) => !excludeList.includes(item))
      } catch (error) {
        console.error('Error fetching sensor names:', error)
      }
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
    },
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 2500)
    }
  },
  mounted() {
    this.fetchSensorNames(), (this.nombrePersonas = localStorage.getItem('user-id'))
  }
}
</script>

<style scoped>
.large-title {
  font-size: 2em;
}
</style>
