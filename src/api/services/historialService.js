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

const InsertarResponsable = async ({ responsable, fecha, nombre_archivo }) => {
  try {
    const response = await api.post(API_PATHS.historial, { responsable, fecha, nombre_archivo })
    return response.data
  } catch (error) {
    return error
  }
}

export { getHistorial, InsertarResponsable }
