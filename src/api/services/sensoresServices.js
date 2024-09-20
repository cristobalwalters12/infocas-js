import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const getNombreSensores = async () => {
  try {
    const response = await api.get(API_PATHS.nombresSensores)
    return response.data
  } catch (error) {
    return error
  }
}

export { getNombreSensores }
