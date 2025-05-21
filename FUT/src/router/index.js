import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '@/views/Welcome.vue'

const routes = [
  { path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'MonOnze - Creer ton équipe !'
    }
  },
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: 'MonOnze - Welcome'
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
