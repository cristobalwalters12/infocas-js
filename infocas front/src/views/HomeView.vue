<template>
  <v-container>
    <v-btn variant="outlined" @click="$router.push({ name: 'about' })">Go to About</v-btn>
    <welcome-item class="my-4" />
    <v-card variant="tonal">
      <v-card-text>This is a card using vuetify component inside the Home view</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

// Components
import WelcomeItem from '../components/WelcomeItem.vue'
import RouteButtons from '../components/RouteButtons.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    WelcomeItem,
    RouteButtons
  }
})
</script>
