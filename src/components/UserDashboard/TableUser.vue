<template>
  <div>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
    <v-card>
      <v-card-title
        primary-title
        class="text-h4 bg-grey-lighten-4 pa-6 d-flex justify-space-between"
      >
        Mantenedor de Usuarios
        <div class="d-flex">
          <div class="pr-4">
            <AddUser @save="handleSaveUser" />
          </div>
          <div>
            <v-btn color="pink-darken-4" @click="$router.push('/chart')"
              >Volver a los graficos</v-btn
            >
          </div>
        </div>
      </v-card-title>
      <v-table height="400px">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">nombre</th>
            <th class="text-left">correo</th>
            <th class="text-left">rol</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.correo }}</td>
            <td>{{ item.rol }}</td>
            <td>
              <div class="d-flex">
                <div class="pr-3">
                  <EditUser :item="item" @save="handleSave" />
                </div>
                <div>
                  <DeleteUser :item="item" @delete="Delete" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import imagenEnterprice from '../../assets/etica-copia (1).png'
import AddUser from './AddUser.vue'
import EditUser from './EditUser.vue'
import DeleteUser from './DeleteUser.vue'
export default {
  name: 'TableUser',
  components: {
    AddUser,
    EditUser,
    DeleteUser
  },
  data() {
    return {
      data: [],
      imagenEnterprice: imagenEnterprice
    }
  },
  methods: {
    handleSaveUser(User) {
      axios.post(`${import.meta.env.VITE_HOST}/usuario`, User).then((response) => {
        this.data.push(response.data)
      })
    },
    handleSave(editeditem) {
      axios.patch(`${import.meta.env.VITE_HOST}/usuario/${editeditem.id}`, editeditem).then(() => {
        this.data = this.data.map((item) => (item.id === editeditem.id ? editeditem : item))
      })
    },
    Delete(editeditem) {
      axios.delete(`${import.meta.env.VITE_HOST}/usuario/${editeditem.id}`).then(() => {
        this.data = this.data.filter((item) => item.id !== editeditem.id)
      })
    }
  },
  mounted() {
    axios.get(`${import.meta.env.VITE_HOST}/usuario`).then((response) => {
      this.data = response.data
    })
  }
}
</script>
