<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid class="wrapper fadeInDown">
        <v-card class="mx-auto box custom-card" max-width="700">
          <v-img
            class="myImage"
            src="/Infocas.png"
            id="icon"
            alt="User Icon"
            contain
            aspect-ratio="1"
          />

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="correo"
                :counter="30"
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
                hint="Al menos 5 caracteres"
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
          <v-alert v-if="alert.show" :type="alert.type">{{ alert.message }}</v-alert>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { UserLogin } from '../api/services/usersService'
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
    const alert = ref({ show: false, message: '', type: 'error' })
    const submit = async () => {
      correoError.value = ''
      passwordError.value = ''
      alert.value.show = false

      if (correo.value && password.value) {
        try {
          const response = await UserLogin({
            correo: btoa(correo.value),
            contraseña: btoa(password.value)
          })

          // Si no hay error, guardamos los datos en localStorage y redirigimos
          localStorage.setItem('user-token', response.token)
          sessionStorage.setItem('user-token', response.token)
          localStorage.setItem('user-id', response.nombre)
          localStorage.setItem('user-role', response.rol)
          localStorage.setItem('vista_dashboard', response.vista_dashboard)
          localStorage.setItem('vista_sensores', response.vista_sensores)
          document.cookie = `user-token=${response.token}; path=/; domain=.infocas.cl`
          document.cookie = `user-id=${response.nombre}; path=/; domain=.infocas.cl`
          document.cookie = `user-role=${response.rol}; path=/; domain=.infocas.cl`
          document.cookie = `vista_dashboard=${response.vista_dashboard}; path=/; domain=.infocas.cl`
          document.cookie = `vista_sensores=${response.vista_sensores}; path=/; domain=.infocas.cl`
          const currentUrl = window.location.href
          setTimeout(() => {
            if (currentUrl.includes('https://www.infocas.cl')) {
              window.location.href = 'https://www.bago.infocas.cl/options'
            } else {
              router.push('/options')
            }
          }, 100)
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert.value.show = true
            alert.value.message = 'Correo o contraseña incorrectos'
            alert.value.type = 'error'
          } else {
            console.error('Error', error.message)
            alert.value.show = true
            alert.value.message = 'Error desconocido. Por favor, intente nuevamente.'
            alert.value.type = 'error'
          }
        }
      } else {
        alert.value.show = true
        alert.value.message = 'Por favor rellene todos los campos'
        alert.value.type = 'error'
      }
    }

    return {
      correo,
      password,
      correoError,
      passwordError,
      show,
      submit,
      alert
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
  background-color: #024bad;
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
