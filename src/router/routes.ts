import AboutView from "@/views/AboutView.vue";
import MusicView from "@/views/MusicView.vue";
import NavLinks from "@/views/RedirectLinks";

const RouterRoutes:Array<object> = [
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

NavLinks.forEach(route => RouterRoutes.push(route))
export default RouterRoutes;
