import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

//SENSORES PREDIF CONTROLADORES
//getAllControladoresPredif: '/controladores_presion_diferencial', //get
//getControladoresPredif: '/controladores_presion_diferencial/getControladoresRespaldo', //post con solo el controlador, le pega al SFTP
//getArchivosControladorPredif: '/controladores_presion_diferencial/getArchivosControlador', //post con controlador y carpeta, le pega al SFTP
//respaldarSensoresPredif: '/controladores_presion_diferencial/respaldarSensoresPreDif', //post con controlador y startDateTime y endDateTime
//SENSORES PREDIF NOMBRE DE LOS SENSORES
//getIdsPosibles: '/nombre_sensores_presion_diferencial/idspresiondiferencialPosibles', // get sin parametros
// getSensoresControladorPredif:'/nombre_sensores_presion_diferencial/sensoresControladorPresionDiferencial', //solo post con el ID
//getNombreSensoresPredif:'/nombre_sensores_presion_diferencial/nombre_sensores_presion_diferencial', //get sin parametros ya que es un find all
//sensores PREDIF INFORMACION DE LOS SENSORES
// getRangeInformationPredif:'/sensores_presion_diferencial/range-information-pressure-differential', //post con nombreSensorPresionDiferencial, startDateTime y endDateTime
//getRangeMaxMinPredif: '/sensores_presion_diferencial/pressure-differential-range' //post con nombreSensorPresionDiferencial, startDateTime y endDateTime
//getHistorialSensoresPredif: '/historial-presion-diferencial',
//postHistorialSensoresPredif: '/historial-presion-diferencial' //post con responsable,fecha,nombre_archivo
const getControladoresPredif = async (controlador) => {
  try {
    const response = await api.post(API_PATHS.getControladoresPredif, controlador)
    return response.data
  } catch (error) {
    return error
  }
}
const getArchivosControladorPredif = async ({ controlador, carpeta }) => {
  try {
    const response = await api.post(API_PATHS.getArchivosControladorPredif, {
      controlador,
      carpeta
    })
    return response.data.sort((a, b) => b.date - a.date)
  } catch (error) {
    return error
  }
}
const respaldarSensoresPredif = async ({ controlador, startDateTime, endDateTime }) => {
  try {
    const response = await api.post(API_PATHS.respaldarSensoresPredif, {
      controlador,
      startDateTime,
      endDateTime
    })
    return response.data
  } catch (error) {
    return error
  }
}
const getIdsPosibles = async () => {
  try {
    const response = await api.get(API_PATHS.getIdsPosibles)
    return response.data
  } catch (error) {
    return error
  }
}
const getSensoresControladorPredif = async (id) => {
  try {
    const response = await api.post(API_PATHS.getSensoresControladorPredif, id)
    return response.data
  } catch (error) {
    return error
  }
}
const getNombreSensoresPredif = async () => {
  try {
    const response = await api.get(API_PATHS.getNombreSensoresPredif)
    return response.data
  } catch (error) {
    return error
  }
}
const getRangeInformationPredif = async ({
  nombreSensorPresionDiferencial,
  startDateTime,
  endDateTime
}) => {
  try {
    const response = await api.post(API_PATHS.getRangeInformationPredif, {
      nombreSensorPresionDiferencial,
      startDateTime,
      endDateTime
    })
    return response.data
  } catch (error) {
    return error
  }
}

const getRangeMaxMinPredif = async ({
  nombreSensorPresionDiferencial,
  startDateTime,
  endDateTime
}) => {
  try {
    const response = await api.post(API_PATHS.getRangeMaxMinPredif, {
      nombreSensorPresionDiferencial,
      startDateTime,
      endDateTime
    })
    return response.data
  } catch (error) {
    return error
  }
}
const getHistorialSensoresPredif = async () => {
  try {
    const response = await api.get(API_PATHS.getHistorialSensoresPredif)
    return response.data
  } catch (error) {
    return error
  }
}
const postHistorialSensoresPredif = async ({ responsable, fecha, nombre_archivo }) => {
  try {
    const response = await api.post(API_PATHS.postHistorialSensoresPredif, {
      responsable,
      fecha,
      nombre_archivo
    })

    return response.data
  } catch (error) {
    return error
  }
}
const getAllControladoresPredif = async () => {
  try {
    const response = await api.get(API_PATHS.getAllControladoresPredif)
    return response.data
  } catch (error) {
    return error
  }
}

const descargatxtGatewayPredif = async (controlador) => {
  try {
    const response = await api.post(API_PATHS.descargatxtGatewayPredif, controlador, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', controlador.archivo)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return response.data
  } catch (error) {
    console.error('Error al descargar el archivo del gateway:', error)
    throw error
  }
}

export {
  getControladoresPredif,
  getArchivosControladorPredif,
  respaldarSensoresPredif,
  getIdsPosibles,
  getSensoresControladorPredif,
  getNombreSensoresPredif,
  getRangeInformationPredif,
  getRangeMaxMinPredif,
  getHistorialSensoresPredif,
  postHistorialSensoresPredif,
  getAllControladoresPredif,
  descargatxtGatewayPredif
}
