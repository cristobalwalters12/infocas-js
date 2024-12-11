<template>
  <v-container>
    <v-card variant="flat" height="600px">
      <div class="d-flex justify-center">
        <v-img
          class="myImage"
          src="/unnamed1.png"
          id="icon"
          alt="User Icon"
          contain
          aspect-ratio="1"
          width="400px"
          height="400px"
        />
      </div>
      <v-row align="center" justify="center" class="pt-10">
        <v-col cols="auto">
          <v-btn
            size="x-large"
            color="pink-darken-4"
            :disabled="!canViewSensores"
            @click="$router.push('/chart')"
          >
            Gráficos de temperatura-humedad
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex flex-col">
          <v-btn size="x-large" color="pink-darken-4" :disabled="!canViewPressure">
            Gráficos de presión diferencial
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex flex-col">
          <v-btn
            size="x-large"
            color="pink-darken-4"
            :disabled="!canViewDashboard"
            @click="$router.push('/supervisionSensores')"
          >
            Dashboard de sensores
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { cookies } from '../api/config/cookies'
export default {
  name: 'OptionsButtons',
  data() {
    return {
      canViewDashboard: false,
      canViewSensores: false
    }
  },
  mounted() {
    localStorage.setItem('user-token', cookies['user-token'])
    localStorage.setItem('user-id', cookies['user-id'])
    localStorage.setItem('user-role', cookies['user-role'])
    localStorage.setItem('vista_dashboard', cookies['vista_dashboard'])
    localStorage.setItem('vista_sensores', cookies['vista_sensores'])
    this.canViewSensores = localStorage.getItem('vista_sensores') === 'true'
    this.canViewDashboard = localStorage.getItem('vista_dashboard') === 'true'
  }
}
</script>
