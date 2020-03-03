<template>
  <div>
    <form action="/home/resetpassword" method="post" novalidate="novalidate">
      <input
        name="__RequestVerificationToken"
        type="hidden"
        value="f1LNt-2nOZ_R0yZ1P5Fi8F8Uxl1WzWknV1zw8bDZ7TaL0taDNQvUFkJGdinvL8oqJnnQPN_M_BhvDHEbPX_AgdDpDoK-83P4E1gCwYJ1GEY1"
      />
      <div class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-md-2" for="Password">密码</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line password"
              data-val="true"
              data-val-length="字段 密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
              data-val-length-max="50"
              data-val-length-min="6"
              data-val-required="密码 字段是必需的。"
              id="Password"
              name="Password"
              type="password"
              v-model="password"
            />
            <span
              class="field-validation-valid text-danger"
              data-valmsg-for="Password"
              data-valmsg-replace="true"
            ></span>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="ConfirmPassword">确认密码</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line password"
              data-val="true"
              data-val-equalto="“确认密码”和“密码”不匹配。"
              data-val-equalto-other="*.Password"
              data-val-required="确认密码 字段是必需的。"
              id="ConfirmPassword"
              name="ConfirmPassword"
              type="password"
              v-model="confirmPassword"
            />
            <span
              class="field-validation-valid text-danger"
              data-valmsg-for="ConfirmPassword"
              data-valmsg-replace="true"
            ></span>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-offset-2 col-md-10">
            <input type="button" value="提交" @click="ResetPasswordClick" class="btn btn-info" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    password: "",
    confirmPassword: ""
  }),
  methods: {
    ...mapActions(["ResetPassword"]),
    async ResetPasswordClick() {
      const data = await this.ResetPassword({
        token: this.$route.query.Token,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      console.log(data);
      if (data.status == "ok") {
        // 提示成功信息
        this.$notify({
          title: "提示",
          message: data.result,
          type: "success",
          duration: 0
        });
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    }
  }
};
</script>