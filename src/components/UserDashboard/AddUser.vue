<template>
  <div>
    <v-btn color="blue" @click="openDialog">Agregar Usuario</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Agregar Usuario</v-card-title>
        <v-card-text>
          <v-text-field v-model="id" label="ID" type="number"></v-text-field>
          <v-text-field v-model="nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="correo" label="Correo"></v-text-field>
          <v-text-field v-model="contraseña" label="Contraseña"></v-text-field>
          <v-text-field v-model="rol" label="Rol"></v-text-field>
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
const emit = defineEmits(['save'])

const dialog = ref(false)
const id = ref(null)
const nombre = ref('')
const correo = ref('')
const contraseña = ref('')
const rol = ref('')

const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}
const saveUser = () => {
  const usuario = {
    id: Number(id.value),
    nombre: nombre.value,
    correo: correo.value,
    contraseña: contraseña.value,
    rol: rol.value
  }
  emit('save', usuario)
  dialog.value = false
}

</script>