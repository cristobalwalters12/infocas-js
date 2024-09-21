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

const getTemperatureInformation = async ({ nombreSensor, startDateTime, endDateTime }) => {
  try {
    const response = await api.post(API_PATHS.temperatureInformation, {
      nombreSensor,
      startDateTime,
      endDateTime
    })
    return response
  } catch (error) {
    return error
  }
}

const postRangeInformation = async (data) => {
  try {
    const response = await api.post(API_PATHS.rangeInformation, data)
    return response
  } catch (error) {
    return error
  }
}

export { getNombreSensores, postRangeInformation, getTemperatureInformation }
