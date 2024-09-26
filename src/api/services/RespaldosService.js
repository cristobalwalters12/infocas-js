import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const getControladores = async () => {
  try {
    const response = await api.get(API_PATHS.getControladores)
    return response.data
  } catch (error) {
    return error
  }
}

const doResplado = async (respaldo)  =>{
  try {
    const response = await api.post(API_PATHS.respaldar, respaldo)
    return response.data
  }
  catch (error) {
    return error
  }
}

const getRespaldosControladores = async (respaldo) => {
  try {
    const response = await api.post(API_PATHS.getRespaldos, respaldo)
    return response.data
  } catch (error) {
    return error
  }
}

export { getControladores, doResplado, getRespaldosControladores }
