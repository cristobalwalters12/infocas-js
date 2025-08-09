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
  descargatxtGateway: '/controladores/downloadGateway',
  //SENSORES PREDIF CONTROLADORES
  getAllControladoresPredif: '/controladores_presion_diferencial', //get
  getControladoresPredif: '/controladores_presion_diferencial/getControladoresRespaldo', //post con solo el controlador, le pega al SFTP
  getArchivosControladorPredif: '/controladores_presion_diferencial/getArchivosControlador', //post con controlador y carpeta, le pega al SFTP
  respaldarSensoresPredif: '/controladores_presion_diferencial/respaldarSensoresPreDif', //post con controlador y startDateTime y endDateTime
  descargatxtGatewayPredif: '/controladores_presion_diferencial/downloadGateway',
  //SENSORES PREDIF NOMBRE DE LOS SENSORES
  getIdsPosibles: '/nombre_sensores_presion_diferencial/idspresiondiferencialPosibles', // get sin parametros
  getSensoresControladorPredif:
    '/nombre_sensores_presion_diferencial/sensoresControladorPresionDiferencial', //solo post con el ID
  getNombreSensoresPredif: '/nombre_sensores_presion_diferencial', //get sin parametros ya que es un find all
  //sensores PREDIF INFORMACION DE LOS SENSORES
  getRangeInformationPredif:
    '/sensores_presion_diferencial/range-information-pressure-differential', //post con nombreSensorPresionDiferencial, startDateTime y endDateTime
  getRangeMaxMinPredif: '/sensores_presion_diferencial/pressure-differential-range', //post con nombreSensorPresionDiferencial, startDateTime y endDateTime
  getHistorialSensoresPredif: '/historial-presion-diferencial',
  postHistorialSensoresPredif: '/historial-presion-diferencial' //post con responsable,fecha,nombre_archivo
}

export { ENDPOINT, API_PATHS }
