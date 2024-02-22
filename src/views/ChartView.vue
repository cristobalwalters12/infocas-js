<template>
  <v-container class="text-start"></v-container>
  <v-container fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="10">
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
            class="large-title bg-grey-lighten-4 pa-6 d-flex justify-space-between"
          >
            Gráficos de Temperatura y Humedad
            <v-btn color="pink-darken-4" @click="cerrarSesion">Cerrar Sesion</v-btn>
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
import moment from 'moment'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

import html2canvas from 'html2canvas'
export default {
  name: 'ChartView',
  components: {
    ChartInfocas,
    TemperatureChart,
    HumidityChart,
    InfocasTable,
    footerComponent
  },

  computed: {
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
      nombrePersonas: ''
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
    },
    logData() {
      const data = {
        nombreSensor: this.sensorName,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime
      }
      axios
        .post(`${import.meta.env.VITE_HOST}/sensores/range-information`, data)
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
      axios
        .post(`${import.meta.env.VITE_HOST}/sensores/temperature-information`, {
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
    },
    generarPdf() {
      const doc = new jsPDF('l', 'pt', 'a4')
      const getDate = new Date()
      doc.setProperties({
        title: new Date(getDate).toLocaleString('es-ES', { hour12: false }) + ' ' + this.sensorName,
        subject: 'Información del sensor'
      })
      let img = new Image()
      img.src =
        'data:image/jpeg;base64,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icflUcr8wG2J5nmrk3bOkbjVNVykvDI/FveB6TiM3AGx3b8wDYnLgfc6g9tup7qO2KTGZnb7GaZy+Ju7W5h07a52C6myk6kxSSyTEJBDGiO7pF6jlieSwKKr8KKakoqnea7eBvmQRb8Ty0HtyxtnsSwLZzF/GRzGRjgQXlhAaNQAM3EkixNhbgCCSPZ362j6hdwtS7K66x2A0vkcxo7N3WSylit81vY2Yea2kgX1H5klCLb9jSIhYv7yxBT2r10lTTwsmjJIDgAOf5z7srrFwHF8Hw+CvpHve1krA1ptdxsHA5DIX3rgE2tkXXzP09RWz++utdxdldW6UxmndRXOiZp7rJT3sv0KyjvWNu3rGPueURFoQVCeo6lRzz8T8oqmCKKZjyRvWtbM29g9y4bO4xhVFRV9NUOfGJgA0DznbvnC18hexzvug59i8XUnT5vxj+pvTO5mjnwmVWPT81tktSZVgqW+Sn9dJrlbQOZGKxyIsUYJX0o44mkUL31yZVwGkdC64zyA5DgT7+udlkU2P4TJgU1DUbzSXgtY3iwWIaXWtqCXG194lwab2Xp6N2x392W393HzmitE4nVmndy7qC/XL3+cSzGMmQysfXiCNJIA1xIO2JCCFThk5IXjLPT1NNG17i1zLiwF7/nqumtxPCcZwelhqpXRyU4I3Qze3gbaG4A0GZPPI8fq6ddl96tqd69yr7Mx4mfTOqcvHlpc9M6td5M9s7mOKCNvvI9W45Jk/BEbKqv3iRPlZVQ1FPGG33mi1uA0/D88Fw2hxrDMVwukZHvCWNpbuD0W5tFySM8m8Nbgki1jaGopURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJRF/9k='

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
        'Informe emitido por ' +
          this.nombrePersonas +
          ' con gráfica de temperatura y humedad relacionadas al sensor '
      )
      doc.text(
        60,
        95,
        this.sensorName +
          ' con fecha de ' +
          this.startDate +
          ' a ' +
          this.endDate +
          ' desde las ' +
          this.startTime +
          ' hasta las ' +
          this.endTime +
          ' horas'
      )
      doc.text(60, 120, 'Temperatura mínima= ' + this.minTemp + 'ºC')
      doc.text(240, 120, 'Temperatura máxima= ' + this.maxTemp + 'ºC')
      doc.text(480, 120, 'Humedad mínima= ' + this.minHum + '%HR')
      doc.text(660, 120, 'Humedad máxima= ' + this.maxHum + '%HR')

      Promise.all([
        html2canvas(this.$refs.chartComponent1.$el),
        html2canvas(this.$refs.chartComponent2.$el),
        html2canvas(this.$refs.chartComponent3.$el)
      ])
        .then(([canvas1, canvas2, canvas3]) => {
          const imgWidth = 750
          const x = (pageWidth - imgWidth) / 2
          let imgData = canvas1.toDataURL('image/jpeg')
          doc.addImage(imgData, 'JPEG', x, 130, imgWidth, 450, undefined) // 'FAST' es un factor de calidad más bajo
          doc.addPage()
          doc.text(
            60,
            80,
            'Informe emitido por ' +
              this.nombrePersonas +
              ' con gráfica de temperatura relacionada al sensor '
          )
          doc.text(
            60,
            95,
            this.sensorName +
              ' con fecha de ' +
              this.startDate +
              ' a ' +
              this.endDate +
              ' desde las ' +
              this.startTime +
              ' hasta las ' +
              this.endTime +
              ' horas'
          )
          doc.text(60, 120, 'Temperatura mínima= ' + this.minTemp + 'ºC')
          doc.text(240, 120, 'Temperatura máxima= ' + this.maxTemp + 'ºC')

          imgData = canvas2.toDataURL('image/jpeg')
          doc.addImage(imgData, 'JPEG', x, 130, imgWidth, 450, undefined) // 'FAST' es un factor de calidad más bajo
          doc.addPage()
          doc.text(
            60,
            80,
            'Informe emitido por ' +
              this.nombrePersonas +
              ' con gráfica de humedad relacionada al sensor '
          )
          doc.text(
            60,
            95,
            this.sensorName +
              ' con fecha de ' +
              this.startDate +
              ' a ' +
              this.endDate +
              ' desde las ' +
              this.startTime +
              ' hasta las ' +
              this.endTime +
              ' horas'
          )
          doc.text(60, 120, 'Humedad mínima= ' + this.minHum + '%HR')
          doc.text(240, 120, 'Humedad máxima= ' + this.maxHum + '%HR')

          imgData = canvas3.toDataURL('image/jpeg')

          doc.addImage(imgData, 'JPEG', x, 130, imgWidth, 450, undefined) // 'FAST' es un factor de calidad más bajo
          doc.addPage()
          if (this.$refs.infocasTable.items) {
            const headers = ['Sensor', 'Fecha', 'Hora', 'Temperatura', 'Humedad']
            const data = this.$refs.infocasTable.items.map((item) => {
              let temperatura = item.temperatura + '°C'
              if (item.temperatura < 18) {
                temperatura += ' ¡Alerta! Temperatura Baja'
              } else if (item.temperatura > 25) {
                temperatura += ' ¡Alerta! Temperatura Alta'
              }

              let humedad = item.humedad + '%HR'
              if (item.humedad > 65) {
                humedad += ' ¡Alerta! Humedad Alta'
              }

              return [
                item.nombre_sensor,
                item.fecha.split('T')[0],
                item.hora,
                temperatura, // Aquí usamos la variable temperatura
                humedad // Aquí usamos la variable humedad
              ]
            })

            doc.autoTable({
              margin: { top: 120 },
              head: [headers],
              body: data,
              didDrawPage: (data) => {
                doc.text(
                  'Tabla de datos de las temperatura y humedad relacionadas al sensor ' +
                    this.sensorName,
                  60,
                  80
                )
                doc.text(
                  'con fecha de ' +
                    this.startDate +
                    ' a ' +
                    this.endDate +
                    ' desde las ' +
                    this.startTime +
                    ' hasta las ' +
                    this.endTime +
                    ' horas',
                  60,
                  95
                )
              },
              didParseCell: (data) => {
                if (data.cell.text[0].includes('¡Alerta! Temperatura Baja')) {
                  data.cell.styles.fillColor = [0, 0, 255] // Azul
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                } else if (data.cell.text[0].includes('¡Alerta! Temperatura Alta')) {
                  data.cell.styles.fillColor = [255, 0, 0] // Rojo
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                } else if (data.cell.text[0].includes('¡Alerta! Humedad Alta')) {
                  data.cell.styles.fillColor = [255, 0, 0] // Verde
                  data.cell.styles.textColor = [255, 255, 255] // Blanco
                }
              }
            })
          }

          this.addWaterMark(doc, img)
          doc.save(
            new Date(getDate).toLocaleString('es-ES', { hour12: false }) + ' ' + this.sensorName
          )
        })
        .catch((error) => {
          console.error('Error al convertir el componente en imagen:', error)
        })
    },
    addWaterMark(pdf, waterMarkImage) {
      let totalPage = pdf.internal.getNumberOfPages()
      let fechaHoy = new Date()
      let fecha =
        fechaHoy.getDate() + '-' + (fechaHoy.getMonth() + 1) + '-' + fechaHoy.getFullYear()
      const hora1 = this.startTime
      const hora2 = this.endTime
      for (let i = 1; i <= totalPage; i++) {
        pdf.setPage(i)
        pdf.addImage(waterMarkImage, 'JPEG', 680, 15, 113, 80)
        pdf.setFontSize(12)
        pdf.text(60, 45, fecha)
      }
      return pdf
    },
    cerrarSesion() {
      this.$router.push('/')
      localStorage.removeItem('user-token')
    },
    descargarPdf() {
      this.dialog = true
      this.generarPdf()
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
    axios.get(`${import.meta.env.VITE_HOST}/nombres-sensores`).then((response) => {
      this.sensorNames = response.data.map((item) => item.nombre_sensor)
    }),
      (this.nombrePersonas = localStorage.getItem('user-id'))
  }
}
</script>

<style scoped>
.large-title {
  font-size: 2em;
}
</style>
