<template>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="12" xl="10">
      <!-- Header -->
      <v-row>
        <v-col cols="4" class="d-flex justify-start">
          <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
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
          Gráficos de Presion Diferencial
          <div class="d-flex">
            <div class="mr-4">
              <v-btn color="pink-darken-4" @click="$router.push('/Options')">
                Volver al menú
              </v-btn>
            </div>
            <div>
              <v-btn color="pink-darken-4" @click="cerrarSesion">Cerrar Sesión</v-btn>
            </div>
          </div>
        </v-card-title>
        <v-card>
          <v-row class="pt-7">
            <v-col cols="12" md="4" class="pl-7 pr-7">
              <h3>Sensor</h3>
              <v-select v-model="sensorName" label="Seleccione" :items="sensorNames" />
            </v-col>
            <v-col cols="12" md="2" class="pr-6">
              <h3>Desde</h3>
              <v-text-field v-model="startDate" type="date" label="Fecha Inicial" />
            </v-col>
            <v-col cols="12" md="2" class="pr-6">
              <h3>Hasta</h3>
              <v-text-field v-model="endDate" type="date" label="Fecha Final" />
            </v-col>
            <v-col cols="12" md="2" class="pr-7">
              <h3>Desde</h3>
              <v-text-field v-model="startTime" type="time" label="Hora Inicial" />
            </v-col>
            <v-col cols="12" md="2" class="pr-7">
              <h3>Hasta</h3>
              <v-text-field v-model="endTime" type="time" label="Hora Final" />
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
              >
                Generar Gráficos
              </v-btn>
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
          <v-card-item v-if="!info">
            <v-card class="bg-grey-lighten-4">
              <v-card-title primary-title class="large-title pa-4">
                <h6>{{ sensorName }}</h6>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3"
                    ><h3>
                      Máxima presión diferencial ch1 = {{ maxima_presion_diferencial_ch1 }}
                    </h3></v-col
                  >
                  <v-col cols="3"
                    ><h3>
                      Máxima presión diferencial ch1 = {{ minima_presion_diferencial_ch1 }}
                    </h3></v-col
                  >
                  <v-col cols="3"
                    ><h3>
                      Mínima presión diferencial ch2 = {{ maxima_presion_diferencial_ch2 }}
                    </h3></v-col
                  >
                  <v-col cols="3"
                    ><h3>
                      Mínima presión diferencial ch2 = {{ minima_presion_diferencial_ch2 }}
                    </h3></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <DiferencialCharts class="mb-8" ref="chartComponent1" />
            <v-card class="bg-grey-lighten-4">
              <v-card-title primary-title class="large-title pa-4">
                <h6>{{ sensorName }}</h6>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3"
                    ><h3>
                      Máxima presión diferencial ch1 = {{ maxima_presion_diferencial_ch1 }}
                    </h3></v-col
                  >
                  <v-col cols="3"
                    ><h3>
                      Máxima presión diferencial ch1 = {{ minima_presion_diferencial_ch1 }}
                    </h3></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <DiferencialChartsCh1 class="mb-8" ref="chartComponent2" />
            <v-card class="bg-grey-lighten-4">
              <v-card-title primary-title class="large-title pa-4">
                <h6>{{ sensorName }}</h6>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3"
                    ><h3>
                      Mínima presión diferencial ch2 = {{ maxima_presion_diferencial_ch2 }}
                    </h3></v-col
                  >
                  <v-col cols="3"
                    ><h3>
                      Mínima presión diferencial ch2 = {{ minima_presion_diferencial_ch2 }}
                    </h3></v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <DiferencialChartsCh2 class="mb-8" ref="chartComponent3" />
            <v-divider></v-divider>
          </v-card-item>
          <v-card>
            <DiferentialPressureTable :nombreSensor="sensorName" ref="informacionTable" />
          </v-card>
          <v-btn
            color="pink-darken-4"
            class="mt-5 ml-4 mb-4"
            :disabled="dialog"
            :loading="dialog"
            @click="descargarPdf()"
            >Descargar PDF</v-btn
          >
          <v-btn
            v-if="isAdmin || isSuperAdmin"
            color="pink-darken-4"
            class="mt-5 ml-4 mb-4"
            @click="$router.push('/historialPresionDiferencial')"
            >Ir a historial</v-btn
          >
          <v-btn
            v-if="isAdmin || isSuperAdmin"
            color="pink-darken-4"
            class="mt-5 ml-4 mb-4"
            @click="$router.push('/usuarioPresionDiferencial')"
            >Ir a Usuarios</v-btn
          >
          <div class="text-center">
            <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
              <v-card color="pink-darken-4">
                <v-card-text>
                  Se esta generando y descargando el archivo, por favor espere...
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import imagenEnterprice from '../../../assets/etica-copia (1).png'
import {
  getNombreSensoresPredif,
  getRangeInformationPredif,
  getRangeMaxMinPredif,
  postHistorialSensoresPredif
} from '../../../api/services/sensoresPreDifServices'
import DiferencialCharts from './DiferentialPressureChart.vue'
import DiferencialChartsCh1 from './DiferentialPressureChartCh1.vue'
import DiferencialChartsCh2 from './DiferentialPressureChartCh2.vue'
import DiferentialPressureTable from './DiferentialPressureTable.vue'

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

import html2canvas from 'html2canvas'
import { logoBase64 } from '../../../base64images/logo'
const store = useStore()
const differentialPressureRawData = computed(() => store.state.differentialPressureRawData)

const sensorNames = ref([])
const sensorName = ref('')
const startDate = ref('')
const endDate = ref('')
const startTime = ref('')
const endTime = ref('')
const info = ref(true)
const dialog = ref(false)
const maxima_presion_diferencial_ch1 = ref(0)
const minima_presion_diferencial_ch1 = ref(0)
const maxima_presion_diferencial_ch2 = ref(0)
const minima_presion_diferencial_ch2 = ref(0)
const nombrePersonas = ref(localStorage.getItem('user-id') || 'Usuario')
const chartComponent1 = ref(null)
const chartComponent2 = ref(null)
const chartComponent3 = ref(null)
const informacionTable = ref(null)

const isAdmin = computed(() => {
  const userRole = localStorage.getItem('user-role')
  return userRole === 'Administrador' || userRole === 'Supervisor'
})

const isSuperAdmin = computed(() => {
  const userRole = localStorage.getItem('user-role')
  return userRole === 'Superadmin'
})

const cerrarSesion = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user-id')
  window.location.href = '/'
}

const generateGraphs = async () => {
  info.value = false

  const startDateTime = `${startDate.value} ${startTime.value}`
  const endDateTime = `${endDate.value} ${endTime.value}`

  try {
    const response = await getRangeInformationPredif({
      nombreSensorPresionDiferencial: sensorName.value,
      startDateTime,
      endDateTime
    })
    const reponseMaxMin = await getRangeMaxMinPredif({
      nombreSensorPresionDiferencial: sensorName.value,
      startDateTime,
      endDateTime
    })
    maxima_presion_diferencial_ch1.value = reponseMaxMin[0].maxima_presion_diferencial_ch1
    minima_presion_diferencial_ch1.value = reponseMaxMin[0].minima_presion_diferencial_ch1
    maxima_presion_diferencial_ch2.value = reponseMaxMin[0].maxima_presion_diferencial_ch2
    minima_presion_diferencial_ch2.value = reponseMaxMin[0].minima_presion_diferencial_ch2
    // Despacha acción del store para procesar y setear chartData
    store.dispatch('processAndSetChartData', response)
  } catch (error) {
    console.error('Error obteniendo datos de rango:', error)
  }
}
const descargarPdf = () => {
  dialog.value = true
  generarPdf()
  postHistorial()
  setTimeout(() => (dialog.value = false), 2500)
}
const postHistorial = async () => {
  const responsable = nombrePersonas.value
  const getDate = new Date()
  const fechaFormateada = getDate.toISOString().slice(0, 10)
  const nombre_archivo = sensorName.value

  try {
    await postHistorialSensoresPredif({ responsable, fecha: fechaFormateada, nombre_archivo })
  } catch (error) {
    console.error('Error enviando historial:', error)
  }
}
const generarPdf = () => {
  const doc = new jsPDF('l', 'pt', 'a4')
  const getDate = new Date()
  doc.setProperties({
    title: new Date(getDate).toLocaleString('es-ES', { hour12: false }) + ' ' + sensorName.value,
    subject: 'Información del sensor'
  })
  let img = new Image()
  img.src = logoBase64

  const text = 'Gráficos de Presión Diferencial'
  doc.setFontSize(20)
  const pageSize = doc.internal.pageSize
  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
  const textOffset = (pageWidth - doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / 2
  doc.text(text, textOffset, 45)
  doc.setFontSize(12)
  doc.text(
    60,
    80,
    `Informe emitido por ${nombrePersonas.value} con gráfica de Presión Diferencial relacionadas al sensor`
  )

  doc.text(
    60,
    95,
    `${sensorName.value} con fecha de ${startDate.value} a ${endDate.value} desde las ${startTime.value} hasta las ${endTime.value} horas`
  )
  doc.text(40, 120, `Presión mínima Ch1 = ${minima_presion_diferencial_ch1.value}`)
  doc.text(220, 120, `Presión máxima Ch1 = ${maxima_presion_diferencial_ch1.value}`)
  doc.text(460, 120, `Presión mínima Ch2 = ${minima_presion_diferencial_ch2.value}`)
  doc.text(640, 120, `Presión máxima Ch2 = ${maxima_presion_diferencial_ch2.value}`)
  const canvasPromises = [
    chartComponent1.value ? html2canvas(chartComponent1.value.$el) : Promise.resolve(null),
    chartComponent2.value ? html2canvas(chartComponent2.value.$el) : Promise.resolve(null),
    chartComponent3.value ? html2canvas(chartComponent3.value.$el) : Promise.resolve(null)
  ]

  Promise.all(canvasPromises).then(([canvas1, canvas2, canvas3]) => {
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
        `Informe emitido por ${nombrePersonas.value} con gráfica de Presión Diferencial relacionadas al sensor`
      )
      doc.text(
        60,
        95,
        `${sensorName.value} con fecha de ${startDate.value} a ${endDate.value} desde las ${startTime.value} hasta las ${endTime.value} horas`
      )
      doc.text(60, 120, `Presión mínima Ch1 = ${minima_presion_diferencial_ch1.value}`)
      doc.text(240, 120, `Presión máxima Ch1 = ${maxima_presion_diferencial_ch1.value}`)

      const imgData2 = canvas2.toDataURL('image/jpeg')
      doc.addImage(imgData2, 'JPEG', x, 130, imgWidth, 450, undefined)
      doc.addPage()
    }
    if (canvas3) {
      doc.text(
        60,
        80,
        `Informe emitido por ${nombrePersonas.value} con gráfica de Presión Diferencial relacionadas al sensor`
      )
      doc.text(
        60,
        95,
        `${sensorName.value} con fecha de ${startDate.value} a ${endDate.value} desde las ${startTime.value} hasta las ${endTime.value} horas`
      )
      doc.text(60, 120, `Presión mínima Ch2 = ${minima_presion_diferencial_ch2.value}`)
      doc.text(240, 120, `Presión máxima Ch2 = ${maxima_presion_diferencial_ch2.value}`)

      const imgData3 = canvas3.toDataURL('image/jpeg')
      doc.addImage(imgData3, 'JPEG', x, 130, imgWidth, 450, undefined)
      doc.addPage()
    }
    if (differentialPressureRawData.value?.length) {
      const headers = [
        'Sensor',
        'Fecha',
        'Hora',
        'Presión Diferencial Ch1',
        'Presión Diferencial Ch2'
      ]

      const data = differentialPressureRawData.value.map((item) => [
        item.nombre_sensor_pre_dif,
        (item.fecha ?? '').split('T')[0],
        item.hora,
        `${item.Dif_Ch1}`,
        `${item.Dif_Ch2}`
      ])

      doc.autoTable({
        margin: { top: 120 },
        head: [headers],
        styles: { halign: 'center' },
        headStyles: {
          fillColor: [240, 0, 60],
          textColor: 255,
          halign: 'center'
        },
        body: data,
        didDrawPage: () => {
          doc.text(
            `Tabla de datos de presión diferencial relacionadas al sensor ${sensorName.value}`,
            60,
            80
          )
          doc.text(
            `Con fecha de ${startDate.value} a ${endDate.value} desde las ${startTime.value} hasta las ${endTime.value} horas`,
            60,
            95
          )
        }
      })
    }

    addWaterMark(doc, img)

    doc.save(
      `${new Date(getDate).toLocaleString('es-ES', { hour12: false })} ${sensorName.value}.pdf`
    )
  })
}
const addWaterMark = (pdf, waterMarkImage) => {
  let totalPage = pdf.internal.getNumberOfPages()
  let fechaHoy = new Date()
  let fecha = `${fechaHoy.getDate()}-${fechaHoy.getMonth() + 1}-${fechaHoy.getFullYear()}`
  for (let i = 1; i <= totalPage; i++) {
    pdf.setPage(i)
    pdf.addImage(waterMarkImage, 'JPEG', 685, 8, 112, 77)
    pdf.setFontSize(12)
    pdf.text(60, 45, fecha)
  }
  return pdf
}
onMounted(async () => {
  try {
    const nombreSensores = await getNombreSensoresPredif()
    sensorNames.value = nombreSensores.map((sensor) => sensor.nombre_sensor_pre_dif)
  } catch (error) {
    console.error('Error cargando sensores:', error)
  }
})
onUnmounted(() => {
  store.dispatch('resetChartData')
})
</script>
<style scoped>
.large-title {
  font-size: 2em;
}
</style>
