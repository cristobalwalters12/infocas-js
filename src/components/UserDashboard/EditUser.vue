<template>
  <div>
    <v-btn color="yellow" @click="openDialog">Editar</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Editar Usuario</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
          <v-text-field v-model="editedItem.contraseña" label="Contraseña"></v-text-field>
          <v-text-field v-model="editedItem.rol" label="Rol"></v-text-field>
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
const emit = defineEmits(['edit'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const dialog = ref(false)
const editedItem = ref({ ...props.item })
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}
const saveEdit = () => {
  emit('edit', editedItem.value)
  dialog.value = false
}
watch(
  () => props.item,
  (newVal) => {
    editedItem.value = JSON.parse(JSON.stringify(newVal))
  },
  { deep: true }
)
</script>
