<template>
  <v-container fluid>
    <div class="diferential-pressure-view">
      <selectorSensoresPreDif />
      <v-card class="d-flex justify-center mt-8" flat>
        <footerComponent />
      </v-card>
      <v-card class="d-flex justify-end mt-14 pl-5" flat>
        <VersionFooter />
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import selectorSensoresPreDif from '../components/PresionDiferencial/Dashboard Presion Diferencial/SelectorSensoresPreDif.vue'
import FooterComponent from '../components/footer.vue'
import VersionFooter from '../components/VersionFooter.vue'
</script>
