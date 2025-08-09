<template>
  <v-container class="text-start"></v-container>
  <div>
    <v-container fluid>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols="10">
          <RespaldoGatewayDiferencialPresion :id="id" />
        </v-col>
        <v-card class="d-flex flex justify-center mt-8" flat>
          <Footer />
        </v-card>
      </v-row>
    </v-container>
    <v-card class="d-flex justify-end mt-15 mr-2" flat>
      <VersionFooter />
    </v-card>
  </div>
</template>

<script setup>
import Footer from '../components/footer.vue'
import RespaldoGatewayDiferencialPresion from '../components/PresionDiferencial/Respaldos Presion Diferencial/RespaldoGatewayDiferencialPresion.vue'
import VersionFooter from '../components/VersionFooter.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const id = ref(route.params.id)
</script>
