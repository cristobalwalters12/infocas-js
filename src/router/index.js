import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'
import HistorialView from '../views/HistorialView.vue'
import OptionsChartView from '../views/OptionsCharts.vue'
import UsersDashboardView from '../views/UsersDashboardView.vue'
import RespaldoView from '../views/RespaldosView.vue'
import ControladoresRespaldo from '../views/ControladoresRespaldo.vue'
import SupervisionSensores from '../views/SupervisionSensoresView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/options',
      name: 'options',
      component: OptionsChartView
    },
    {
      path: '/chart',
      name: 'chart',
      component: ChartView
    },
    {
      path: '/historial',
      name: 'historial',
      component: HistorialView
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsersDashboardView
    },
    {
      path: '/respaldos',
      name: 'respaldos',
      component: RespaldoView
    },
    {
      path: '/txtRespaldos/:id',
      name: 'txtRespaldos',
      component: ControladoresRespaldo
    },
    {
      path: '/supervisionSensores',
      name: 'supervisionSensores',
      component: SupervisionSensores
    }
  ]
})

export default router
