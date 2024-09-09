<template>
  <v-container class="text-start"></v-container>
  <div>
    <v-container fluid>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols="10">
          <TableUser />
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

<script>
import Footer from '../components/footer.vue'
import TableUser from '../components/UserDashboard/TableUser.vue'
import VersionFooter from '../components/VersionFooter.vue'
export default {
  name: 'UsersDashboard',
  components: { TableUser, Footer, VersionFooter },
  data() {
    return {}
  },
  methods: {}
}
</script>
