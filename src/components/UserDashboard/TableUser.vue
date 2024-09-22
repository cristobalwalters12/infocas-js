<template>
  <div>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>

    <!-- Progreso linear controlado por v-if -->
    <v-progress-linear v-if="loading" color="pink" indeterminate></v-progress-linear>

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
              >Volver a los gráficos</v-btn
            >
          </div>
        </div>
      </v-card-title>

      <v-table height="400px">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Correo</th>
            <th class="text-left">Rol</th>
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

<script setup>
import { ref, onMounted } from 'vue'
import imagenEnterprice from '../../assets/etica-copia (1).png'
import AddUser from './AddUser.vue'
import EditUser from './EditUser.vue'
import DeleteUser from './DeleteUser.vue'
import { addUser, deleteUser, editUser, getAllUsers } from '../../api/services/usersService'

const data = ref([])
const loading = ref(false)

const fetchAllUsers = async () => {
  loading.value = true
  try {
    const users = await getAllUsers()
    data.value = users
  } catch (error) {
    console.error('Error fetching users data:', error)
  } finally {
    loading.value = false
  }
}

const handleSaveUser = async (User) => {
  loading.value = true
  try {
    const savedUser = await addUser(User)
    data.value.push(savedUser)
  } catch (error) {
    console.error('Error adding user:', error)
  } finally {
    loading.value = false
  }
}

const handleSave = async (editedItem) => {
  loading.value = true
  try {
    await editUser(editedItem)
    data.value = data.value.map((item) => (item.id === editedItem.id ? editedItem : item))
  } catch (error) {
    console.error('Error editing user:', error)
  } finally {
    loading.value = false
  }
}
const Delete = async (deletedItem) => {
  loading.value = true
  try {
    await deleteUser(deletedItem)
    data.value = data.value.filter((item) => item.id !== deletedItem.id)
  } catch (error) {
    console.error('Error deleting user:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAllUsers)
</script>
