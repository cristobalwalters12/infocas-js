<template>
  <v-container class="text-start"></v-container>
  <div>
    <v-container fluid>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols="12">
          <options-buttons />
        </v-col>
        <v-card class="d-flex flex justify-center mt-8" flat>
          <Footer />
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
import OptionsButtons from '../components/OptionsButtons.vue'
export default {
  name: 'OptionsCharts',
  components: { OptionsButtons, Footer },
  data() {
    return {}
  },
  methods: {
    // Your methods here
  }
}
</script>

<style scoped></style>
