import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Bikes from './views/Bikes.vue'

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

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
