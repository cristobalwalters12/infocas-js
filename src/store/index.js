import { createStore } from 'vuex'

export default createStore({
  state: {
    chartData: {
      labels: [],
      datasets: [{ data: [] }]
    },
    temperatureData: {
      labels: [],
      datasets: []
    },
    humidityData: {
      labels: [],
      datasets: []
    },
    diferentialPressureData: {
      labels: [],
      datasets: []
    },
    items: [],
    personaName: '',
    token: null
  },
  mutations: {
    setToken(state, token) {
      console.log('🔹 Guardando Token en Vuex:', token)
      state.token = token
      document.cookie =
        'user-token=; path=/; domain=.infocas.cl; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    },
    clearToken(state) {
      console.log('🔹 Eliminando Token de Vuex')
      state.token = null
    },
    UPDATE_CHART_DATA(state, payload) {
      state.chartData = payload
    },
    UPDATE_TEMPERATURE_DATA(state, payload) {
      state.temperatureData = payload
    },
    UPDATE_HUMIDITY_DATA(state, payload) {
      state.humidityData = payload
    },
    UPDATE_CHARTPRESSURE_DATA(state, payload) {
      state.diferentialPressureData = payload
    },
    SET_ITEMS(state, payload) {
      state.items = payload
    },
    SET_NOMBRE_PERSONA(state, payload) {
      state.personaName = payload
    }
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token)
    },
    logout({ commit }) {
      commit('clearToken')
    },
    updateChartData({ commit }, data) {
      commit('UPDATE_CHART_DATA', data)
    },
    updateTemperatureData({ commit }, data) {
      commit('UPDATE_TEMPERATURE_DATA', data)
    },
    updateHumidityData({ commit }, data) {
      commit('UPDATE_HUMIDITY_DATA', data)
    },
    updateChartPressureData({ commit }, data) {
      commit('UPDATE_CHARTPRESSURE_DATA', data)
    },
    setItems({ commit }, data) {
      commit('SET_ITEMS', data)
    },
    setNombrePersona({ commit }, data) {
      commit('SET_NOMBRE_PERSONA', data)
    }
  },
  getters: {
    getToken: (state) => state.token
  }
})
