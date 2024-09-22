<template>
  <div>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
    <div v-if="loading">
      <v-progress-linear color="pink" indeterminate></v-progress-linear>
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
import imagenEnterprice from '../../assets/etica-copia (1).png'
import AddUser from './AddUser.vue'
import EditUser from './EditUser.vue'
import DeleteUser from './DeleteUser.vue'
import { addUser, deleteUser, editUser, getAllUsers } from '../../api/services/usersService'
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
      imagenEnterprice: imagenEnterprice,
      loading: false
    }
  },
  methods: {
    async fetchAllUsers() {
      this.loading = true
      try {
        const data = await getAllUsers()
        this.data = data
      } catch (error) {
        console.error('Error fetching users data:', error)
      } finally {
        this.loading = false
      }
    },
    async handleSaveUser(User) {
      this.loading = true
      try {
        const savedUser = await addUser(User)
        this.data.push(savedUser)
      } catch (error) {
        console.error('Error adding user:', error)
      } finally {
        this.loading = false
      }
    },
    async handleSave(editeditem) {
      this.loading = true
      try {
        await editUser(editeditem)
        this.data = this.data.map((item) => (item.id === editeditem.id ? editeditem : item))
      } catch (error) {
        console.error('Error editing user:', error)
      } finally {
        this.loading = false
      }
    },
    async Delete(deleteditem) {
      this.loading = true
      try {
        await deleteUser(deleteditem)
        this.data = this.data.filter((item) => item.id !== deleteditem.id)
      } catch (error) {
        console.error('Error deleting user:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchAllUsers()
  }
}
</script>
