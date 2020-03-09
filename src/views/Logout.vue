<template>
  <div>
    <el-button type="text" @click="LogoutClick">注销</el-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["Logout"]),
    async LogoutClick() {
      const data = await this.Logout();
      //将state的登陆凭证删除
      this.$store.commit("SetUserId", "");
      //跳转回主页
      this.$router.push({ path: "/" });
      console.log(data);
    }
  }
};
</script>