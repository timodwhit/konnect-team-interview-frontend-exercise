import { createRouter, createWebHistory } from 'vue-router'
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/PageHome.vue'),
  },
  {
    path: '/service/:id',
    component: () => import('../views/PageService.vue'),
  },
  {
    path: '/developer/:id',
    component: () => import('../views/PageDeveloper.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
