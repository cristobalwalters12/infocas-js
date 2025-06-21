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
            <v-btn color="pink-darken-4" @click="$router.push('/Respaldos')"
              >Volver a los respaldos</v-btn
            >
          </div>
        </div>
      </v-card-title>

      <v-table height="400px">
        <thead>
          <tr>
            <th class="text-center">Nombre</th>
            <th class="text-left">Tamaño</th>
            <th class="text-left">Descargar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td class="text-center">{{ item.name }}</td>
            <td>{{ item.sizeFormatted }}</td>

            <td
              v-if="
                ['UG65', 'UG65P1', 'UG65P2', 'CAMIONES', 'UG65 PESAJE', 'UG65SUB'].includes(
                  controlador(props.id)
                )
              "
            >
              <div>
                <v-btn @click="verRespaldo(item.name)">Ver Respaldo</v-btn>
              </div>
            </td>
            <td v-else>
              <div>
                <v-btn @click="handleDownload(item.name)">Descargar</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Página en desarrollo</v-card-title>
        <v-card-text>
          Se está trabajando en esta página debido a que se se cambiaron los controladores por
          Gateway Lorawan.
        </v-card-text>
        <v-card-actions>
          <v-btn color="pink-darken-4" text @click="closeDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import imagenEnterprice from '../../assets/etica-copia (1).png'
import { getRespaldosControladores, descargarRespaldo } from '../../api/services/RespaldosService'
import { useRouter } from 'vue-router'
const router = useRouter()
const data = ref([])
const loading = ref(false)
const dialog = ref(false)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const fetchControladores = async (controlador) => {
  loading.value = true
  try {
    if (controlador === 'UG65') {
      controlador = 'UG65P1'
    }
    const response = await getRespaldosControladores({ controlador })
    if (Array.isArray(response)) {
      const processedData = response.reverse().map((item) => {
        if (item.size) {
          let sizeInKB = item.size / 1024
          if (sizeInKB >= 1024) {
            let sizeInMB = sizeInKB / 1024
            if (sizeInMB >= 1024) {
              let sizeInGB = sizeInMB / 1024
              item.sizeFormatted = sizeInGB.toFixed(2) + ' GB'
            } else {
              item.sizeFormatted = sizeInMB.toFixed(2) + ' MB'
            }
          } else {
            item.sizeFormatted = sizeInKB.toFixed(2) + ' KB'
          }
        } else {
          item.sizeFormatted = 'Tamaño desconocido'
        }
        return item
      })

      data.value = processedData
    } else {
      console.error('La respuesta no es un array:', response)
    }
  } catch (error) {
    console.error('Error fetching respaldos data:', error)
  } finally {
    loading.value = false
  }
}
const handleDownload = async (archivo) => {
  loading.value = true
  const respaldo = {
    controlador: props.id,
    archivo
  }
  try {
    await descargarRespaldo(respaldo)
  } catch (error) {
    console.error('Error al descargar el archivo:', error)
  } finally {
    loading.value = false
  }
}
const controlador = (id) => {
  console.log('id', id)
  if (id === 'UG65') {
    return 'UG65'
  }
  return id
}
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}

const verRespaldo = async (item) => {
  await router.push(`/ArchivoGateway/${props.id}/${item}`)
}

onMounted(() => fetchControladores(props.id))
</script>
