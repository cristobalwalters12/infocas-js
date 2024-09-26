<template>
  <div>
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
            <v-btn color="pink-darken-4" @click="$router.push('/chart')"
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
                  <v-btn @Click="generarRespaldo(item.controlador)">Generar Respaldos</v-btn>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import imagenEnterprice from '../../assets/etica-copia (1).png'
import { getRespaldos } from '../../api/services/RespaldosService'

const data = ref([])
const loading = ref(false)
const startDate = ref('')
const endDate = ref('')
const item = ref('')

const fetchResplados = async () => {
  loading.value = true
  try {
    const respaldosData = await getRespaldos()
    data.value = respaldosData
  } catch (error) {
    console.error('Error fetching respaldos data:', error)
  } finally {
    loading.value = false
  }
}
const generarRespaldo = async (item) => {
  console.log('Generar respaldo', item)
  console.log('Fecha Inicial', startDate.value)
  console.log('Fecha Final', endDate.value)
}
const verRespaldo = async (item) => {
  console.log('Ver respaldo', item)
}

onMounted(fetchResplados)
</script>
