<template>
  <v-container class="text-start"></v-container>
  <div>
    <v-container fluid>
      <v-row class="justify-center align-center">
        <v-col cols="10">
          <HistorialTable />
        </v-col>
        <v-card class="d-flex justify-center mt-8" flat>
          <Footer />
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HistorialTable from '../components/historialTable.vue'
import Footer from '../components/footer.vue'
export default {
  name: 'HistorialView',
  components: {
    HistorialTable,
    Footer
  },
  data() {
    return {}
  },
  methods: {
    // Your methods here
  }
}
</script>

<style scoped>
/* Your component styles here */
</style>
