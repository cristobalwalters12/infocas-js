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

<script>
export default {
  name: 'DeleteUser',
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
    Delete() {
      this.$emit('delete', this.editedItem)
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
