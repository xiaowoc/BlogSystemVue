<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item v-if="getUserId!=''" :index="'/UserDetails/'+ getUserId">个人主页</el-menu-item>
      <el-menu-item index="/CreateCategory">添加分类</el-menu-item>
      <el-menu-item index="/CreateArticle">创建文章</el-menu-item>
      <el-menu-item index="/Search">搜索</el-menu-item>
      <el-menu-item v-if="getUserId==''" index="/Register">注册</el-menu-item>
      <el-menu-item v-if="getUserId==''" index="/Login">登陆</el-menu-item>
      <el-menu-item v-if="getUserId!=''" index="/Logout">注销</el-menu-item>
      <!-- <el-menu-item index="/ForgetPassword">忘记密码</el-menu-item>
      <el-menu-item index="/ResetPassword">重置密码</el-menu-item>-->
      <!-- <el-menu-item index="/CategoryList/">分类列表</el-menu-item>
      <el-menu-item index="/ArticleList/">文章列表</el-menu-item>-->

      <!-- <el-menu-item index="/EditArticle">编辑文章</el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUserId"])
  }
};
</script>
<style scoped>
.el-menu-item.is-active {
  border-bottom: 2px solid transparent !important;
}
</style>