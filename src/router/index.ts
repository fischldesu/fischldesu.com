import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import subpath from '@/router/routes';

const routes:Array<RouteRecordRaw> = [ { path: '/', name: 'home', component: HomeView} ];
for (const subpath_ of subpath)
  routes.push(subpath_);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router
