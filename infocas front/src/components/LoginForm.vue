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
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn large class="custom-button" v-fade-in="0.8">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  data: () => ({
    correo: '',
    password: '',
    show: false
  }),
  directives: {
    fadeIn(el, binding) {
      let delay = binding.value ? binding.value : 0
      el.style.opacity = 0
      el.style.transition = `opacity 0.5s ${delay}s`
      setTimeout(() => (el.style.opacity = 1), delay * 1000)
    }
  },
  methods: {
    submit() {
      // Si la validación es exitosa, puedes enviar los datos de inicio de sesión a tu servidor aquí
      // Tu lógica de inicio de sesión irá aquí

      const router = useRouter()

      // Comprobamos si el correo y la contraseña no están vacíos
      if (this.correo && this.password) {
        // Si no están vacíos, redirigimos al usuario a /chart
        router.push('/chart')
      }
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
