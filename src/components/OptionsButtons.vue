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
          <v-btn
            size="x-large"
            color="pink-darken-4"
            :disabled="!canViewSensoresPresionDiferencial"
            @click="$router.push('/DiferentialPressureView')"
          >
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
        <v-col cols="auto" class="d-flex flex-col">
          <v-btn
            size="x-large"
            color="pink-darken-4"
            :disabled="!canViewDashboardPresionDiferencial"
            @click="$router.push('/supervisionSensorespresionDiferencial')"
          >
            Dashboard de Sensores de presión
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { cookies } from '../api/config/cookies'
import { mapActions } from 'vuex'
export default {
  name: 'OptionsButtons',
  data() {
    return {
      canViewDashboard: false,
      canViewSensores: false,
      canViewSensoresPresionDiferencial: false,
      canViewDashboardPresionDiferencial: false
    }
  },
  methods: {
    ...mapActions(['login'])
  },
  mounted() {
    const entorno = import.meta.env.VITE_ENTORNO

    if (entorno == 'DEV') {
      console.log(entorno)
      this.canViewSensores = localStorage.getItem('vista_sensores') === 'true'
      this.canViewDashboard = localStorage.getItem('vista_dashboard') === 'true'
      this.canViewSensoresPresionDiferencial =
        localStorage.getItem('vista_sensores_presion_diferencial') === 'true'
      this.canViewDashboardPresionDiferencial =
        localStorage.getItem('vista_dashboard_presion_diferencial') === 'true'
    } else {
      this.login(cookies['user-token'])
      document.cookie =
        'user-token=; path=/; domain=.infocas.cl; expires=Thu, 01 Jan 1970 00:00:00 UTC'
      localStorage.setItem('user-id', cookies['user-id'])
      localStorage.setItem('user-role', cookies['user-role'])
      localStorage.setItem('vista_dashboard', cookies['vista_dashboard'])
      localStorage.setItem('vista_sensores', cookies['vista_sensores'])
      localStorage.setItem(
        'vista_sensores_presion_diferencial',
        cookies['vista_sensores_presion_diferencial']
      )
      localStorage.setItem(
        'vista_dashboard_presion_diferencial',
        cookies['vista_dashboard_presion_diferencial']
      )
      this.canViewSensores = localStorage.getItem('vista_sensores')
      this.canViewDashboard = localStorage.getItem('vista_dashboard')
      this.canViewSensoresPresionDiferencial = localStorage.getItem(
        'vista_sensores_presion_diferencial'
      )
      this.canViewDashboardPresionDiferencial = localStorage.getItem(
        'vista_dashboard_presion_diferencial'
      )

      if (this.canViewSensores === 'true') {
        this.canViewSensores = true
      } else {
        this.canViewSensores = false
      }
      if (this.canViewDashboard === 'true') {
        this.canViewDashboard = true
      } else {
        this.canViewDashboard = false
      }
      if (this.canViewSensoresPresionDiferencial === 'true') {
        this.canViewSensoresPresionDiferencial = true
      } else {
        this.canViewSensoresPresionDiferencial = false
      }
      if (this.canViewDashboardPresionDiferencial === 'true') {
        this.canViewDashboardPresionDiferencial = true
      } else {
        this.canViewDashboardPresionDiferencial = false
      }
    }
  }
}
</script>
