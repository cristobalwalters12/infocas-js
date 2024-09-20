import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const getHistorial = async () => {
  try {
    const response = await api.get(API_PATHS.historial)
    return response.data
  } catch (error) {
    return error
  }
}

export { getHistorial }
