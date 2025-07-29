import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

//SENSORES PREDIF CONTROLADORES
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
    return response.data
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
    console.log('postHistorialSensoresPredif', {
      responsable,
      fecha,
      nombre_archivo
    })
    const response = await api.post(API_PATHS.postHistorialSensoresPredif, {
      responsable,
      fecha,
      nombre_archivo
    })
    console.log('Response from postHistorialSensoresPredif:', response.data)
    return response.data
  } catch (error) {
    return error
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
  postHistorialSensoresPredif
}
