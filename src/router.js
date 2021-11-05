import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/stations',
      name: 'Stations',
      component: () => import('./views/Stations.vue')
    },
    {
      path: '/bikes',
      name: 'Bikes',
      component: () => import('./views/Bikes.vue')
    },
    {
      path: '/ourteam',
      name: 'OurTeam',
      component: () => import('./views/OurTeam.vue')
    },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
