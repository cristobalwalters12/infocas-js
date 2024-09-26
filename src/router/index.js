import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'
import HistorialView from '../views/HistorialView.vue'
import OptionsChartView from '../views/OptionsCharts.vue'
import UsersDashboardView from '../views/UsersDashboardView.vue'
import RespaldoView from '../views/RespaldosView.vue'
import ControladoresRespaldo from '../views/ControladoresRespaldo.vue'
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
    },{
      path:'/txtRespaldos/:id',
      name:'txtRespaldos',
      component:ControladoresRespaldo

    }
  ]
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('user-token')
  if (authRequired && !token) {
    return next('/')
  }

  next()
})

export default router
