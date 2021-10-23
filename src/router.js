import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

import Bikes from './views/Bikes/Bikes.vue'
import createBikes from './views/Bikes/createBikes.vue'
import deleteBikes from './views/Bikes/deleteBikes.vue'
import updateBikes from './views/Bikes/updateBikes.vue'

import Stations from './views/Stations/Stations.vue'

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
    path: '/dashboard/bikes/create',
    name: 'createBikes',
    component: createBikes
  },
  {
    path: '/dashboard/bikes/delete',
    name: 'deleteBikes',
    component: deleteBikes
  },
  {
    path: '/dashboard/bikes/update',
    name: 'updateBikes',
    component: updateBikes
  },
  {
    path: '/dashboard/stations',
    name: 'Stations',
    component: Stations
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
