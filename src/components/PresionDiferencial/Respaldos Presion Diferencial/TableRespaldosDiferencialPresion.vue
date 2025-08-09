<template>
  <div>
    <v-dialog v-model="dialogSuccessVisible" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Guardado Exitoso</v-card-title>
        <v-card-text>El respaldo se ha generado con éxito.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink-darken-4" text @click="dialogSuccessVisible = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
    <v-progress-linear v-if="loading" color="pink" indeterminate></v-progress-linear>

    <v-card>
      <v-card-title
        primary-title
        class="text-h4 bg-grey-lighten-4 pa-6 d-flex justify-space-between"
      >
        Mantenedor de Respaldos
        <div class="d-flex">
          <div>
            <v-btn color="pink-darken-4" @click="$router.push('/DiferentialPressureView')"
              >Volver a los gráficos</v-btn
            >
          </div>
        </div>
      </v-card-title>

      <v-table height="400px">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Nombre</th>
            <th class="text-left justify-start"></th>
            <th class="text-left">Ver Respaldos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.controlador }}</td>
            <td>
              <div class="d-flex justify-center">
                <div class="mt-2 mr-1">
                  <v-text-field
                    v-model="startDate"
                    type="date"
                    label="Fecha Inicial"
                  ></v-text-field>
                </div>
                <div class="mt-2">
                  <v-text-field v-model="endDate" type="date" label="Fecha Final"></v-text-field>
                </div>
                <div class="ml-2 pt-7">
                  <v-btn
                    @Click="generarRespaldo({ controlador: item.controlador, startDate, endDate })"
                    >Generar Respaldos</v-btn
                  >
                </div>
              </div>
            </td>
            <td>
              <div>
                <v-btn @Click="verRespaldo(item.controlador)">Ver Respaldos</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Fechas Requeridas</v-card-title>
        <v-card-text>Debe seleccionar una fecha de inicio y una fecha de fin.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink-darken-4" text @click="dialogVisible = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import imagenEnterprice from '../../../assets/etica-copia (1).png'
import {
  getAllControladoresPredif,
  respaldarSensoresPredif
} from '../../../api/services/sensoresPreDifServices'
import { useRouter } from 'vue-router'

const data = ref([])
const loading = ref(false)
const startDate = ref('')
const endDate = ref('')
const dialogVisible = ref(false)
const router = useRouter()
const dialogSuccessVisible = ref(false)

const fetchControladores = async () => {
  loading.value = true
  try {
    const respaldosData = await getAllControladoresPredif()
    data.value = respaldosData
  } catch (error) {
    console.error('Error fetching respaldos data:', error)
  } finally {
    loading.value = false
  }
}

const generarRespaldo = async ({ controlador, startDate, endDate }) => {
  loading.value = true

  try {
    if (!startDate || !endDate) {
      dialogVisible.value = true
      return
    }
    console.log('Generando respaldo para:', controlador, startDate, endDate)
    const response = await respaldarSensoresPredif({
      controlador,
      startDateTime: startDate,
      endDateTime: endDate
    })
    //console.log('Respuesta de generarRespaldo:', response)
    dialogSuccessVisible.value = true

    return response
  } catch (error) {
    console.error('Error fetching respaldos data:', error)
  } finally {
    loading.value = false
  }
}

const verRespaldo = async (item) => {
  await router.push(`/txtRespaldosPreDif/${item}`)
}

onMounted(fetchControladores)
</script>
