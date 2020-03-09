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
    //用户详情(id查询)
    path: "/UserDetails/:id",
    name: "UserDetailsWithId",
    component: () => import("../views/UserDetails.vue")
  },
  {
    //用户详情
    path: "/UserDetails",
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
  },
  {
    //忘记密码
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: () => import("../views/ForgetPassword.vue")
  },
  {
    //重置密码
    path: "/ResetPassword",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue")
  },
  {
    //分类列表
    path: "/CategoryList/:userId",
    name: "CategoryList",
    component: () => import("../views/CategoryList.vue")
  },
  {
    //文章列表
    path: "/ArticleList/:userId",
    name: "ArticleList",
    component: () => import("../views/ArticleList.vue")
  },
  {
    //新建文章
    path: "/CreateArticle",
    name: "CreateArticle",
    component: () => import("../views/CreateArticle.vue")
  },
  {
    //编辑文章
    path: "/EditArticle/:id",
    name: "EditArticle",
    component: () => import("../views/EditArticle.vue")
  },
  {
    //文章详情
    path: "/ArticleDetails/:id",
    name: "ArticleDetails",
    component: () => import("../views/ArticleDetails.vue")
  },
  {
    //新建分类
    path: "/CreateCategory",
    name: "CreateCategory",
    component: () => import("../views/CreateCategory")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
