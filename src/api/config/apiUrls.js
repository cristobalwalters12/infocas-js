const ENDPOINT = import.meta.env.VITE_HOST

const API_PATHS = {
  login: '/usuario/login',
  allUsers: '/usuario',
  addUser: '/usuario',
  editUser: '/usuario/:id',
  deleteUser: '/usuario/:id',
  historial: '/historial',
  rangeInformation: '/sensores/range-information',
  temperatureInformation: '/sensores/temperature-information',
  nombresSensores: '/nombres-sensores',
  getControladores: '/controladores',
  respaldar: '/controladores/findControladorAndRespaldar',
  respaldarSensores2024: '/controladores/respaldarSensores2024',
  getRespaldos: '/controladores/getControladoresRespaldos',
  getArchivosGateway: '/controladores/findArchivoControlador',
  DescargarRespaldos: '/controladores/descargarRespaldo',
  descargatxtGateway: '/controladores/downloadGateway'
}

export { ENDPOINT, API_PATHS }
