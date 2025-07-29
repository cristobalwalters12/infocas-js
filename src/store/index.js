import { createStore } from 'vuex'
import moment from 'moment'

export default createStore({
  state: {
    chartData: {
      labels: [],
      datasets: []
    },
    chartDataCh1Ch2: {
      labels: [],
      datasets: []
    },
    temperatureData: {
      labels: [],
      datasets: []
    },
    humidityData: {
      labels: [],
      datasets: []
    },
    diferentialPressureDataCH1: {
      labels: [],
      datasets: []
    },
    diferentialPressureDataCH2: {
      labels: [],
      datasets: []
    },
    differentialPressureRawData: [],
    humidityTemperatureData: [],
    items: [],
    personaName: '',
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      document.cookie =
        'user-token=; path=/; domain=.infocas.cl; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    },
    clearToken(state) {
      state.token = null
    },
    SET_DIFFERENTIAL_PRESSURE_RAW_DATA(state, payload) {
      state.differentialPressureRawData = payload
    },
    SET_HUMIDITY_TEMPERATURE_DATA(state, payload) {
      state.humidityTemperatureData = payload
    },
    UPDATE_CHART_DATA(state, payload) {
      console.log('Updating chart data with payload:', payload)
      state.chartData = payload
    },
    UPDATE_CHART_DATA_CH1CH2(state, payload) {
      state.chartDataCh1Ch2 = payload
    },
    UPDATE_TEMPERATURE_DATA(state, payload) {
      console.log('Updating temperature data with payload:', payload)
      state.temperatureData = payload
    },
    UPDATE_HUMIDITY_DATA(state, payload) {
      console.log('Updating humidity data with payload:', payload)
      state.humidityData = payload
    },
    UPDATE_CHARTPRESSURE_DATA(state, payload) {
      state.diferentialPressureData = payload
    },
    UPDATE_DIFERENTIAL_PRESSURE_CH1(state, payload) {
      state.diferentialPressureDataCH1 = payload
    },
    UPDATE_DIFERENTIAL_PRESSURE_CH2(state, payload) {
      state.diferentialPressureDataCH2 = payload
    },
    SET_ITEMS(state, payload) {
      state.items = payload
    },
    SET_NOMBRE_PERSONA(state, payload) {
      state.personaName = payload
    },

    RESET_CHART_DATA(state) {
      state.chartData = {
        labels: [],
        datasets: []
      }
      state.temperatureData = {
        labels: [],
        datasets: []
      }
      state.humidityData = {
        labels: [],
        datasets: []
      }
    },

    RESET_DIFFERENTIAL_PRESSURE_CHART_DATA(state) {
      state.diferentialPressureDataCH1 = {
        labels: [],
        datasets: []
      }
      state.diferentialPressureDataCH2 = {
        labels: [],
        datasets: []
      }
      state.chartDataCh1Ch2 = {
        labels: [],
        datasets: []
      }
      state.differentialPressureRawData = []
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
    updateChartDataCh1Ch2({ commit }, data) {
      commit('UPDATE_CHART_DATA_CH1CH2', data)
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
    },
    processAndSetChartData({ commit }, apiData) {
      commit('SET_DIFFERENTIAL_PRESSURE_RAW_DATA', apiData)
      const labels = apiData.map(
        (item) => moment.utc(item.fecha).format('YYYY-MM-DD') + ' ' + item.hora
      )
      const Dif_Ch1 = apiData.map((item) => item.Dif_Ch1)
      const Dif_Ch2 = apiData.map((item) => item.Dif_Ch2)

      const chartDataCh1Ch2 = {
        labels,
        datasets: [
          {
            label: 'Dif_Ch1',
            data: Dif_Ch1,
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'rgba(0, 128, 0, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'Dif_Ch2',
            data: Dif_Ch2,
            backgroundColor: 'rgba(0, 0, 205, 0.2)',
            borderColor: 'rgba(0, 0, 205, 1)',
            borderWidth: 1,
            yAxisID: 'y2'
          }
        ]
      }
      const chartDataCh1 = {
        labels,
        datasets: [
          {
            label: 'Dif_Ch1',
            data: Dif_Ch1,
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'rgba(0, 128, 0, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          }
        ]
      }
      const chartDataCh2 = {
        labels,
        datasets: [
          {
            label: 'Dif_Ch2',
            data: Dif_Ch2,
            backgroundColor: 'rgba(0, 0, 205, 0.2)',
            borderColor: 'rgba(0, 0, 205, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          }
        ]
      }

      commit('UPDATE_CHART_DATA_CH1CH2', chartDataCh1Ch2)
      commit('UPDATE_DIFERENTIAL_PRESSURE_CH1', chartDataCh1)
      commit('UPDATE_DIFERENTIAL_PRESSURE_CH2', chartDataCh2)
    },
    resetChartData({ commit }) {
      commit('RESET_DIFFERENTIAL_PRESSURE_CHART_DATA')
    },
    resetChartDataTempHum({ commit }) {
      commit('RESET_CHART_DATA')
    }
  },
  getters: {
    getToken: (state) => state.token
  }
})
