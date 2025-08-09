import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'
import HistorialView from '../views/HistorialView.vue'
import HistorialPreDifView from '../views/HistorialPreDifView.vue'
import OptionsChartView from '../views/OptionsCharts.vue'
import UsersDashboardView from '../views/UsersDashboardView.vue'
import UsersDashboardPreDifView from '../views/UserDashboardPreDifView.vue'
import RespaldoView from '../views/RespaldosView.vue'
import ControladoresRespaldo from '../views/ControladoresRespaldo.vue'
import SupervisionSensores from '../views/SupervisionSensoresView.vue'
import SupervisionSensoresPreDif from '../views/SupervisionSensoresPreDifView.vue'
import ArchivoGatewayview from '../views/ArchivoGatewayview.vue'
import DiferentialPressureView from '../views/DiferentialPressureView.vue'
import RespaldosDiferencialView from '../views/RespaldosDiferencialView.vue'
import ControladoresRespaldoPreDif from '../views/ControladoresRespaldoPreDif.vue'
import ArchivosGatewayPreDifView from '../views/ArchivosGatewayPreDifView.vue'
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
      path: '/historialPresionDiferencial',
      name: 'historialPresionDiferencial',
      component: HistorialPreDifView
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsersDashboardView
    },
    {
      path: '/usuarioPresionDiferencial',
      name: 'usuarioPresionDiferencial',
      component: UsersDashboardPreDifView
    },
    {
      path: '/respaldos',
      name: 'respaldos',
      component: RespaldoView
    },
    {
      path: '/respaldosPresionDiferencial',
      name: 'respaldosPresionDiferencial',
      component: RespaldosDiferencialView
    },
    {
      path: '/txtRespaldos/:id',
      name: 'txtRespaldos',
      component: ControladoresRespaldo
    },
    {
      path: '/txtRespaldosPreDif/:id',
      name: 'txtRespaldosPreDif',
      component: ControladoresRespaldoPreDif
    },
    {
      path: '/ArchivoGateway/:id/:item',
      name: 'ArchivoGateway',
      component: ArchivoGatewayview
    },
    {
      path: '/ArchivoGatewayPreDif/:id/:item',
      name: 'ArchivoGatewayPreDif',
      component: ArchivosGatewayPreDifView
    },

    {
      path: '/supervisionSensores',
      name: 'supervisionSensores',
      component: SupervisionSensores
    },
    {
      path: '/supervisionSensorespresionDiferencial',
      name: 'supervisionSensorespresionDiferencial',
      component: SupervisionSensoresPreDif
    },
    {
      path: '/DiferentialPressureView',
      name: 'DiferentialPressureView',
      component: DiferentialPressureView
    }
  ]
})

export default router
