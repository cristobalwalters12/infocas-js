<template>
  <div>
    <div class="d-flex justify-start">
      <img :src="imagenEnterprice" alt="imagenEnterprice" style="width: 210px; height: 110px" />
    </div>
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
                  <EditUser :item="item" @edit="handleSave" />
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

    <!-- Diálogo de Confirmación -->
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="text-h5">{{ dialogTitle }}</v-card-title>
        <v-card-text>{{ dialogMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink-darken-4" text @click="dialogVisible = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
const dialogVisible = ref(false) // Controla la visibilidad del diálogo
const dialogTitle = ref('') // Título dinámico del diálogo
const dialogMessage = ref('') // Mensaje dinámico del diálogo

const fetchAllUsers = async () => {
  loading.value = true
  try {
    const users = await getAllUsers()
    data.value = users
  } catch (error) {
    showDialog('Error', 'Error al obtener los usuarios.')
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
    showDialog('Éxito', 'Usuario guardado correctamente.')
  } catch (error) {
    showDialog('Error', 'Error al guardar el usuario.')
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
    showDialog('Éxito', 'Usuario modificado correctamente.')
  } catch (error) {
    showDialog('Error', 'Error al modificar el usuario.')
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
    showDialog('Éxito', 'Usuario eliminado correctamente.')
  } catch (error) {
    showDialog('Error', 'Error al eliminar el usuario.')
    console.error('Error deleting user:', error)
  } finally {
    loading.value = false
  }
}

const showDialog = (title, message) => {
  dialogTitle.value = title
  dialogMessage.value = message
  dialogVisible.value = true
}

onMounted(fetchAllUsers)
</script>
