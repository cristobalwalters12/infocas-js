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
    items:[]
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
    SET_ITEMS(state, payload) {
      state.items = payload
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
    setItems({ commit }, data) {
      commit('SET_ITEMS', data)
    }
  }
})
