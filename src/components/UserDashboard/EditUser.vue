<template>
  <div>
    <v-btn color="yellow" @click="openDialog">Editar</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Editar Usuario</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveEdit">
            <v-text-field
              v-model="editedItem.nombre"
              label="Nombre"
              :error-messages="getErrorMessage($v.editedItem.nombre)"
              @blur="$v.editedItem.nombre.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="editedItem.correo"
              label="Correo"
              :error-messages="getErrorMessage($v.editedItem.correo)"
              @blur="$v.editedItem.correo.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="editedItem.contraseña"
              label="Contraseña"
              :error-messages="getErrorMessage($v.editedItem.contraseña)"
              @blur="$v.editedItem.contraseña.$touch()"
              dense
            ></v-text-field>
            <v-text-field
              v-model="editedItem.rol"
              label="Rol"
              :error-messages="getErrorMessage($v.editedItem.rol)"
              @blur="$v.editedItem.rol.$touch()"
              dense
            ></v-text-field>
            <v-card-title class="headline">Acceso a vistas</v-card-title>
            <v-row class="mt-2" dense>
              <v-col cols="6">
                <v-checkbox
                  v-model="editedItem.vista_sensores"
                  label="Vista Sensores"
                  hide-details
                  dense
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="editedItem.vista_dashboard"
                  label="Vista Dashboard"
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
          <v-btn color="blue darken-1" text @click="saveEdit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const emit = defineEmits(['edit'])

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const dialog = ref(false)
const editedItem = ref({ ...props.item })

// Definimos las reglas de validación
const rules = {
  editedItem: {
    nombre: { required, minLength: minLength(3) },
    correo: { required, email },
    contraseña: { required, minLength: minLength(6) },
    rol: { required }
  }
}

// Inicializamos Vuelidate
const $v = useVuelidate(rules, { editedItem })

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const saveEdit = () => {
  $v.value.$touch() // Marca todos los campos como "tocados"

  if (!$v.value.$invalid) {
    emit('edit', editedItem.value) // Emite el objeto editado
    dialog.value = false
  }
}

watch(
  () => props.item,
  (newVal) => {
    editedItem.value = JSON.parse(JSON.stringify(newVal))
  },
  { deep: true }
)

const getErrorMessage = (field) => {
  if (!field.$dirty) return ''
  if (field.required?.$invalid) return 'Este campo es obligatorio'
  if (field.email?.$invalid) return 'Debe ser un correo válido'
  if (field.minLength?.$invalid) {
    return `Debe tener al menos ${field.$params.minLength.min} caracteres`
  }
  return ''
}
</script>
