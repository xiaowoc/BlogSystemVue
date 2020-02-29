<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2" disabled>个人主页</el-menu-item>
      <el-menu-item index="3">
        <router-link to="/CreateArticle" :underline="false">写博客</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <el-link href="#" :underline="false">添加分类</el-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>