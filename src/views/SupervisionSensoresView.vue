<template>
  <div class="bg-pink-darken-4">
    <div class="d-flex justify-start bg-white">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
    <v-card flat>
      <v-card-title
        primary-title
        class="text-h4 bg-grey-lighten-4 pa-6 d-flex justify-space-between"
      >
        Dashboard de Sensores
        <div class="d-flex">
          <div>
            <v-btn color="pink-darken-4" @click="$router.push('/Options')">Volver a al menu</v-btn>
          </div>
        </div>
      </v-card-title>
    </v-card>

    <v-container fluid class="bg-pink-darken-4 min-100vh">
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols="12">
          <SupervisionSensores />
        </v-col>
        <v-card class="d-flex flex justify-center mt-8 bg-pink-darken-4" flat>
          <Footer />
        </v-card>
      </v-row>
    </v-container>

    <v-card class="d-flex justify-end mt-15 mr-2 bg-pink-darken-4" flat>
      <VersionFooter />
    </v-card>
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import SupervisionSensores from '../components/SupervisionSensores/SupervisionSensores.vue'
import imagenEnterprice from '../assets/etica-copia (1).png'
import VersionFooter from '../components/VersionFooter.vue'

export default {
  name: 'RespaldosView',
  components: { SupervisionSensores, Footer, VersionFooter },
  data() {
    return {
      imagenEnterprice
    }
  }
}
</script>

<style scoped>
.min-100vh {
  min-height: 71.1vh;
}

.bg-pink-darken-4 {
  background-color: #880e4f;
}
</style>
