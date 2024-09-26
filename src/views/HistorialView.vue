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
      <div class="page-footer">
        <v-card class="footer" flat>
          <VersionFooter />
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import HistorialTable from '../components/HistorialTable.vue'
import Footer from '../components/footer.vue'
import VersionFooter from '../components/VersionFooter.vue'
export default {
  name: 'HistorialView',
  components: {
    HistorialTable,
    Footer,
    VersionFooter
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
.page-container {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px; /* Ajusta este valor al alto de tu footer */
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: end;
}
</style>
