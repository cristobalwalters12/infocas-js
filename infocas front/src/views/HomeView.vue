<template>
  <v-container>
    <login-form />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

// Components
import WelcomeItem from '../components/WelcomeItem.vue'
import RouteButtons from '../components/RouteButtons.vue'
import LoginForm from '../components/LoginForm.vue' // No olvides importar tu nuevo componente

export default defineComponent({
  name: 'HomeView',

  components: {
    WelcomeItem,
    RouteButtons,
    LoginForm // Y registralo aquí
  }
})
</script>
