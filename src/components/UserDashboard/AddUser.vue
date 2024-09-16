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

<script>
export default{
  name: 'AddUser',
  data(){
    return{
      dialog: false,
      id: null,
      nombre: '',
      correo: '',
      contraseña: '',
      rol: ''
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    saveUser() {
      const usuario = {
        id: Number(this.id),
        nombre: this.nombre,
        correo: this.correo,
        contraseña: this.contraseña,
        rol: this.rol
      }
      this.$emit('save', usuario)
      this.dialog = false
    }
  },

}

</script>
