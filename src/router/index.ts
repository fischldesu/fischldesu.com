import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RouterRoutes from '@/router/routes'

const routerRoutes = [ { path: '/', name: 'home', component: HomeView,} ];
for (const route of RouterRoutes) {
  routerRoutes.push(route);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerRoutes,
})

export default router
