import { createStore } from 'vuex'

export default createStore({
  state: {
    chartData: {
      labels: [],
      datasets: [{ data: [] }]
    }
  },
  mutations: {
    UPDATE_CHART_DATA(state, payload) {
      state.chartData = payload
    }
  },
  actions: {
    updateChartData({ commit }, data) {
      commit('UPDATE_CHART_DATA', data)
    }
  }
})
