<template>
  <v-container>
    <v-btn variant="outlined" @click="$router.push({ name: 'home' })">Go to Home</v-btn>
    <welcome-item class="my-4" />
    <v-card title="This is an About page" variant="outlined"></v-card>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

import WelcomeItem from '../components/WelcomeItem.vue'

export default defineComponent({
  name: 'AboutView',

  components: {
    WelcomeItem
  }
})
</script>
