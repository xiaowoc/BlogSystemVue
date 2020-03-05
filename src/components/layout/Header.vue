<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/UserDetails/:id">个人主页</el-menu-item>
      <el-menu-item index="#">添加分类</el-menu-item>
      <!-- <el-menu-item index="/Register">注册</el-menu-item> -->
      <el-menu-item index="/Login">登陆</el-menu-item>
      <el-menu-item index="/Logout">注销</el-menu-item>
      <!-- <el-menu-item index="/Search">搜索</el-menu-item> -->
      <el-menu-item index="/ForgetPassword">忘记密码</el-menu-item>
      <el-menu-item index="/ResetPassword">重置密码</el-menu-item>
      <el-menu-item index="/CategoryList/:userId">分类列表</el-menu-item>
      <el-menu-item index="/ArticleList/:userId">文章列表</el-menu-item>
      <el-menu-item index="/CreateArticle">创建文章</el-menu-item>
      <el-menu-item index="/EditArticle">编辑文章</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {};
</script>
