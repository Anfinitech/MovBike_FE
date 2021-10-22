import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Bikes from './views/Bikes.vue'
import Stages from './views/Stages.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/bikes',
    name: 'Bikes',
    component: Bikes
  },
  {
    path: '/dashboard/stages',
    name: 'Stages',
    component: Stages
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
