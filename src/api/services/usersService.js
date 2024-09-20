import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const UserLogin = async (user) => {
  try {
    const response = await api.post(API_PATHS.login, user)
    return response.data
  } catch (error) {
    return error
  }
}

export { UserLogin }
