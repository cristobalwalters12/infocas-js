import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const UserLogin = async (user) => {
  try {
    const response = await api.post(API_PATHS.login, user)
    return response.data
  } catch (error) {
    throw error 
  }
}

const getAllUsers = async () => {
  try {
    const response = await api.get(API_PATHS.allUsers)
    return response.data
  } catch (error) {
    return error
  }
}

const addUser = async (user) => {
  try {
    const response = await api.post(API_PATHS.addUser, user)
    return response.data
  } catch (error) {
    return error
  }
}
const editUser = async (user) => {
  try {
    const url = API_PATHS.editUser.replace(':id', user.id)
    const response = await api.patch(url, user)
    return response.data
  } catch (error) {
    return error
  }
}
const deleteUser = async (user) => {
  try {
    const url = API_PATHS.deleteUser.replace(':id', user.id)
    const response = await api.delete(url, user)
    return response.data
  } catch (error) {
    return error
  }
}

export { getAllUsers, UserLogin, addUser, editUser, deleteUser }
