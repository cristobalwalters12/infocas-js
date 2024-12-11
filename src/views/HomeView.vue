<template>
  <v-container>
    <login-form />
  </v-container>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    LoginForm
  },

  setup() {
    onMounted(() => {
      const currentUrl = window.location.href
      if (currentUrl.includes('https://www.bago.infocas.cl')) {
        window.location.href = 'https://www.infocas.cl'
      }
    })
  }
})
</script>
