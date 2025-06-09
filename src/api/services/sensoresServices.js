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
  const { nombreSensor, startDateTime, endDateTime } = data
  if (!nombreSensor || !startDateTime || !endDateTime) {
    console.error('Faltan datos requeridos para la solicitud.')
    return
  } else {
    try {
      const response = await api.post(API_PATHS.rangeInformation, data)

      return response
    } catch (error) {
      return error
    }
  }
}

function calcularTCM(temperaturas, deltaH = 83.144) {
  const R = 8.314
  const n = temperaturas.length

  if (n === 0) {
    throw new Error('La lista de temperaturas está vacía.')
  }

  let sumaExponentes = 0
  for (let i = 0; i < n; i++) {
    const Ti = temperaturas[i]
    sumaExponentes += Math.exp(-((deltaH * 1000) / (R * Ti)))
  }

  const promedioExponentes = sumaExponentes / n

  const TCM = -((deltaH * 1000) / (R * Math.log(promedioExponentes)))
  return TCM
}

const procesarDatosYCalcularTCM = async (range) => {
  try {
    const { nombreSensor, startDateTime, endDateTime } = range

    const start = new Date(startDateTime.split(' ')[0])
    const end = new Date(endDateTime.split(' ')[0])
    const diferenciaEnDias = (end - start) / (1000 * 60 * 60 * 24)

    if (nombreSensor === 'VALOR MEDIO SUBTERRÁNEO' || nombreSensor === 'CAMARA FRIA PR-TEM-122') {
      if (diferenciaEnDias < 29) {
        console.warn('El rango debe ser de exactamente 30 días.')
        return ' '
      } else {
        const response = await api.post(API_PATHS.rangeInformation, range)
        const data = response.data
        const temperaturasEnCelsius = data.map((registro) => registro.temperatura)
        const temperaturasEnKelvin = temperaturasEnCelsius.map((temp) => temp + 273.15)
        const TCM = calcularTCM(temperaturasEnKelvin)

        const resultado = {
          TCM_Kelvin: TCM,
          TCM_Celsius: TCM - 273.15
        }
        return resultado
      }
    } else {
      return ' '
    }
  } catch (error) {
    console.error('Error al obtener datos del endpoint:', error.message)
    throw error
  }
}

export {
  getNombreSensores,
  postRangeInformation,
  getTemperatureInformation,
  procesarDatosYCalcularTCM
}
