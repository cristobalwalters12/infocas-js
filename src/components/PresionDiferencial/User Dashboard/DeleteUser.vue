<template>
  <div>
    <v-btn color="red" @Click="openDialog">Eliminar</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Eliminar Usuario</v-card-title>
        <v-card-text>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="Delete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref} from 'vue'
const emit = defineEmits(['delete'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const dialog = ref(false)
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}
const Delete = () => {
  emit('delete', props.item)
  dialog.value = false
}
</script>