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

<script>
export default {
  name: 'EditUser',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      editedItem: { ...this.item }
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    saveEdit() {
      this.$emit('save', this.editedItem)
      this.dialog = false
    }
  },
  watch: {
    item: {
      handler(newVal) {
        this.editedItem = { ...newVal }
      },
      deep: true
    }
  }
}
</script>
