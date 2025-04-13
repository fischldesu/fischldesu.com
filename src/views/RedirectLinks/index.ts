import LBlog,   { meta as blog } from "@/views/RedirectLinks/LBlog.vue";
import LRepo,   { meta as repo} from "./LRepo.vue";
import LGithub, { meta as github} from "./LGithub.vue";
import LBili,   { meta as bilibili} from "./LBili.vue";

const RD = (url:string)=>window.location.replace(url);

export default [
  { path: '/blog', component: LBlog, beforeEnter: () => RD(blog.redirect) },
  { path: '/repo', component: LRepo, beforeEnter: () => RD(repo.redirect) },
  { path: '/github', component: LGithub, beforeEnter: () => RD(github.redirect)},
  { path: '/bili', component: LBili, beforeEnter: () => RD(bilibili.redirect)},
];
