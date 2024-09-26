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

            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td class="text-center">{{ item.name }}</td>
              <td>{{ item.sizeFormatted }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import imagenEnterprice from '../../assets/etica-copia (1).png'
  import {getRespaldosControladores } from '../../api/services/RespaldosService'
  
  const data = ref([])
  const loading = ref(false)

  const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
  
const fetchControladores = async (controlador) => {
  loading.value = true;
  try {
    const response = await getRespaldosControladores({ controlador });
    
    // Validamos que la respuesta sea un array
    if (Array.isArray(response)) {
      // Invertimos y transformamos los datos
      const processedData = response.reverse().map(item => {
        // Convertimos el tamaño de bytes a KB, MB o GB según corresponda
        if (item.size) {
          let sizeInKB = item.size / 1024;  // Convertimos a KB
          if (sizeInKB >= 1024) {
            let sizeInMB = sizeInKB / 1024;  // Convertimos a MB si es mayor a 1024 KB
            if (sizeInMB >= 1024) {
              let sizeInGB = sizeInMB / 1024;  // Convertimos a GB si es mayor a 1024 MB
              item.sizeFormatted = sizeInGB.toFixed(2) + ' GB';
            } else {
              item.sizeFormatted = sizeInMB.toFixed(2) + ' MB';
            }
          } else {
            item.sizeFormatted = sizeInKB.toFixed(2) + ' KB';  // Queda en KB si es menor a 1024 KB
          }
        } else {
          item.sizeFormatted = 'Tamaño desconocido';  // Si no hay tamaño
        }
        return item;
      });
      
      data.value = processedData;  // Asignamos los datos procesados con el tamaño formateado
    } else {
      console.error('La respuesta no es un array:', response);
    }
    
  } catch (error) {
    console.error('Error fetching respaldos data:', error);
  } finally {
    loading.value = false;
  }
};

  
    onMounted(() => fetchControladores(props.id));
  </script>
