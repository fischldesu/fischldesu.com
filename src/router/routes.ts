import type {RouteRecordRaw} from "vue-router";

import AboutView from "@/views/AboutView.vue";
import MusicView from "@/views/MusicView.vue";
import NavLinks from "@/views/RedirectLinks";

const Subpath:Array<RouteRecordRaw> = [
  {
    path: '/music',
    name: 'Music',
    component: MusicView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  }
];

NavLinks.forEach(route => Subpath.push({path: route.path, component: route.component, beforeEnter: route.beforeEnter}));
export default Subpath;
