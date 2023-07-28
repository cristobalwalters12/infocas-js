<template>
  <v-container>
    <login-form />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

// Components
import RouteButtons from '../components/RouteButtons.vue'
import LoginForm from '../components/LoginForm.vue'
export default defineComponent({
  name: 'HomeView',

  components: {
    RouteButtons,
    LoginForm
  }
})
</script>
