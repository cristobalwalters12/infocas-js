<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid class="wrapper fadeInDown">
        <v-card class="mx-auto box custom-card" max-width="700">
          <v-img
            class="myImage"
            src="/unnamed1.png"
            id="icon"
            alt="User Icon"
            contain
            aspect-ratio="1"
          />

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="correo"
                :counter="10"
                label="Usuario"
                required
                v-fade-in="0.6"
                :error-messages="correoError"
                :modelValue="correo"
                @update:modelValue="(newVal) => (correo = newVal)"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="login"
                label="Contraseña"
                hint="Al menos 8 caracteres"
                counter
                @click:append="show = !show"
                v-fade-in="0.7"
                :error-messages="passwordError"
                :modelValue="password"
                @update:modelValue="(newVal) => (password = newVal)"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn large class="custom-button fadeInDown.fourth" @click="submit">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
axios.defaults.withCredentials = true

export default {
  directives: {
    fadeIn(el, binding) {
      let delay = binding.value ? binding.value : 0
      el.style.opacity = 0
      el.style.transition = `opacity 0.5s ${delay}s`
      setTimeout(() => (el.style.opacity = 1), delay * 1000)
    }
  },
  setup() {
    const correo = ref('')
    const password = ref('')
    const correoError = ref('')
    const passwordError = ref('')
    const show = ref(false)
    const router = useRouter()

    const submit = async () => {
      if (correo.value && password.value) {
        try {
          const response = await axios.post('http://localhost:3000/api/login', {
            correo: correo.value,
            contraseña: password.value
          })
          // Guardar el token en localStorage
          localStorage.setItem('user-token', response.data.token)
          // Redireccionar al usuario a la página principal
          await router.push('/chart')
        } catch (error) {
          // Manejo de errores
          if (error.response) {
            console.error('Error', error.response.data)
          } else if (error.request) {
            console.error('Error', error.request)
          } else {
            console.error('Error', error.message)
          }
        }
      }
    }

    return {
      correo,
      password,
      correoError,
      passwordError,
      show,
      submit
    }
  }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  animation: fadeInDown 1s ease-in-out both;
}
.v-text-field {
  transition: opacity 0.5s;
}

.custom-button {
  background-color: #9b0c64;
  border: none;
  color: white;
  width: 250px;
  height: 50px !important;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 15px;
  box-shadow: 0 10px 30px 0 rgba(153, 7, 129, 0.4);
  border-radius: 5px;
  margin: 5px 20px 40px 20px;
}

.myImage {
  height: 300px;
  width: px;
}
.box {
  padding: 50px;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}
.custom-card {
  min-width: 450px;
  min-height: 660px;
}

.second {
  animation-delay: 0.6s;
}

.third {
  animation-delay: 0.8s;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
