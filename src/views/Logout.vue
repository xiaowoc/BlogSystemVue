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
      console.log(data);
    }
  }
};
</script>