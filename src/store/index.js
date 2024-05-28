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
    personaName: ''
  },
  mutations: {
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
  }
})
