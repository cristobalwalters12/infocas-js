import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const getRespaldos = async () => {
  try {
    const response = await api.get(API_PATHS.getRespaldos)
    return response.data
  } catch (error) {
    return error
  }
}

export { getRespaldos }
