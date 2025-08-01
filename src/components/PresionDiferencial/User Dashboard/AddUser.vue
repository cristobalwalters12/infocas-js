<template>
  <div>
    <v-btn color="blue" @click="openDialog">Agregar Usuario</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Agregar Usuario</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUser">
            <v-text-field
              v-model="id"
              label="ID"
              type="number"
              :error-messages="getErrorMessage($v.id)"
              @blur="$v.id.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="nombre"
              label="Nombre"
              :error-messages="getErrorMessage($v.nombre)"
              @blur="$v.nombre.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="correo"
              label="Correo"
              :error-messages="getErrorMessage($v.correo)"
              @blur="$v.correo.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="contraseña"
              label="Contraseña"
              :error-messages="getErrorMessage($v.contraseña)"
              @blur="$v.contraseña.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="rol"
              label="Rol"
              :error-messages="getErrorMessage($v.rol)"
              @blur="$v.rol.$touch()"
              dense
            ></v-text-field>
            <v-card-title class="headline">Acceso a vistas</v-card-title>

            <v-row class="mt-2" dense>
              <v-col cols="6">
                <v-checkbox
                  v-model="vista_sensores_presion_diferencial"
                  label="Vista Sensores Presión Diferencial"
                  hide-details
                  dense
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="vista_dashboard_presion_diferencial"
                  label="Vista Dashboard Presión Diferencial"
                  hide-details
                  dense
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, numeric } from '@vuelidate/validators'

const emit = defineEmits(['save'])

const dialog = ref(false)
const id = ref(null)
const nombre = ref('')
const correo = ref('')
const contraseña = ref('')
const rol = ref('')
const vista_sensores_presion_diferencial = ref(false) // Estado para Vista Sensores
const vista_dashboard_presion_diferencial = ref(false) // Estado para Vista Dashboard

// Reglas de validación
const rules = {
  id: { required, numeric },
  nombre: { required, minLength: minLength(3) },
  correo: { required, email },
  contraseña: { required, minLength: minLength(6) },
  rol: { required }
}

// Instancia de Vuelidate
const $v = useVuelidate(rules, { id, nombre, correo, contraseña, rol })

const openDialog = () => {
  dialog.value = true
}

const clean = () => {
  id.value = null
  nombre.value = ''
  correo.value = ''
  contraseña.value = ''
  rol.value = ''
  vista_sensores_presion_diferencial.value = false
  vista_dashboard_presion_diferencial.value = false
}

const closeDialog = () => {
  clean()
  dialog.value = false
}

const saveUser = () => {
  $v.value.$touch()

  if (!$v.value.$invalid) {
    const usuario = {
      id: Number(id.value),
      nombre: nombre.value,
      correo: correo.value,
      contraseña: contraseña.value,
      rol: rol.value,
      vista_sensores_presion_diferencial: vista_sensores_presion_diferencial.value,
      vista_dashboard_presion_diferencial: vista_dashboard_presion_diferencial.value
    }
    emit('save', usuario)
    clean()
    dialog.value = false
  }
}

// Función para obtener el mensaje de error correspondiente
const getErrorMessage = (field) => {
  if (!field.$dirty) return '' // No mostrar errores si no ha sido "tocado"
  if (field.required?.$invalid) return 'Este campo es obligatorio'
  if (field.email?.$invalid) return 'Debe ser un correo válido'
  if (field.minLength?.$invalid)
    return `Debe tener al menos ${field.$params.minLength.min} caracteres`
  if (field.numeric?.$invalid) return 'Debe ser un número'
  return ''
}
</script>
