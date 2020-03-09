<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Header
  },
  methods: {
    ...mapActions(["IsLogin"]),
    async GetIsLoginInfo() {
      await this.IsLogin();
    }
  },
  created: function() {
    //刷新页面后，或者第一次加载时去后台获取是否登陆，已经登陆则将userId写入state
    this.GetIsLoginInfo();
  }
};
</script>
