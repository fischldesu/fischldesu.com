import { createRouter, createWebHistory } from 'vue-router'
import HomeView, { SubRoutes } from '@/views/HomeView.vue'

const routerRoutes = [ { path: '/', name: 'home', component: HomeView,} ];
for (const route of SubRoutes) {
  routerRoutes.push(route);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerRoutes,
})

export default router
