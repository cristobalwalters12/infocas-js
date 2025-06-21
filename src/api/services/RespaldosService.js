import { API_PATHS } from '../config/apiUrls'
import { api } from '../config/apiConfig'

const getControladores = async () => {
  try {
    const response = await api.get(API_PATHS.getControladores)
    const excludeControladores = [
      '192.168.10.70',
      '192.168.10.72',
      '192.168.10.74',
      '192.168.10.75',
      '192.168.10.77',
      '192.168.10.79',
      '192.168.10.89',
      '192.168.10.69'
    ]
    const filteredData = response.data.filter(
      (item) => !excludeControladores.includes(item.controlador)
    )

    return filteredData
  } catch (error) {
    return error
  }
}

const doResplado = async (respaldo) => {
  try {
    const response = await api.post(API_PATHS.respaldar, respaldo)
    return response.data
  } catch (error) {
    return error
  }
}
const doRespaldo2024 = async (respaldo) => {
  try {
    const response = await api.post(API_PATHS.respaldarSensores2024, respaldo)
    return response.data
  } catch (error) {
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
const getArchivosGateway = async (controlador) => {
  try {
    const response = await api.post(API_PATHS.getArchivosGateway, controlador)
    return response.data
  } catch (error) {
    console.error('Error al obtener los archivos del gateway:', error)
    throw error
  }
}

const descargarRespaldo = async (respaldo) => {
  try {
    const response = await api.post(API_PATHS.DescargarRespaldos, respaldo, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', respaldo.archivo)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return response.data
  } catch (error) {
    console.error('Error al descargar el archivo:', error)
    throw error
  }
}
const descargatxtGateway = async (controlador) => {
  try {
    const response = await api.post(API_PATHS.descargatxtGateway, controlador, {
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
  getControladores,
  doResplado,
  doRespaldo2024,
  getRespaldosControladores,
  descargarRespaldo,
  getArchivosGateway,
  descargatxtGateway
}
