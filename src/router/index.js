import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    //创建文章
    path: "/CreateArticle",
    name: "CreateArticle",
    component: () => import("../views/CreateArticle.vue")
  },
  {
    //用户详情
    path: "/UserDetails/:id",
    name: "UserDetails",
    component: () => import("../views/UserDetails.vue")
  },
  {
    //登陆
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    //注册
    path: "/Register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    //搜索
    path: "/Search",
    name: "Search",
    component: () => import("../views/Search.vue")
  },
  {
    //注销
    path: "/Logout",
    name: "Logout",
    component: () => import("../views/Logout.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
