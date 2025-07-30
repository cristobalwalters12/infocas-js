<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title color="pink-darken-4">
        <h3>{{ props.nombreSensor }}</h3>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card>
          <v-table>
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>presión Diferencial Ch1</th>
                <th>presión Diferencial Ch2</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.nombre_sensor_pre_dif }}</td>
                <td>{{ formatDate(item.fecha) }}</td>
                <td>{{ item.hora }}</td>
                <td>{{ item.Dif_Ch1 }} mmWC</td>
                <td>{{ item.Dif_Ch2 }} mmWC</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
const store = useStore()
const props = defineProps(['nombreSensor'])
const items = computed(() => store.state.differentialPressureRawData)

const formatDate = (isoString) => {
  if (!isoString) return ''
  return moment(isoString).format('YYYY-MM-DD')
}
</script>
