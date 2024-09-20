const ENDPOINT = import.meta.env.VITE_HOST

const API_PATHS = {
  login: '/usuario/login',
  historial: '/historial',
  rangeInformation: '/sensores/range-information',
  temperatureInformation: '/sensores/temperature-information',
  nombresSensores: '/nombres-sensores'
}

export { ENDPOINT, API_PATHS }
