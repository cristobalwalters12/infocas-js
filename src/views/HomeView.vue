<template>
  <v-container>
    <login-form />
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'

import LoginForm from '../components/LoginForm.vue'
export default defineComponent({
  name: 'HomeView',

  components: {
    LoginForm
  }
})
</script>
