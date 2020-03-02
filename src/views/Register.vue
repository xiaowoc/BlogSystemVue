<template>
  <div>
    <form action="/Home/Register" method="post" novalidate="novalidate">
      <div class="form-group">
        <label class="sr-only" for="Email">邮箱</label>
        <input
          class="form-control text-box single-line"
          data-val="true"
          data-val-email="邮箱 字段不是有效的电子邮件地址。"
          data-val-remote="“邮箱”无效。"
          data-val-remote-additionalfields="*.Email"
          data-val-remote-url="/Home/IsEmailInUse"
          data-val-required="邮箱 字段是必需的。"
          id="Email"
          name="Email"
          placeholder="邮箱"
          type="email"
          v-model="email"
        />
        <span
          class="field-validation-valid text-danger"
          data-valmsg-for="Email"
          data-valmsg-replace="true"
        ></span>
      </div>
      <div class="form-group">
        <label class="sr-only" for="Password">密码</label>
        <input
          class="form-control text-box single-line password"
          data-val="true"
          data-val-length="字段 密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
          data-val-length-max="50"
          data-val-length-min="6"
          data-val-required="密码 字段是必需的。"
          id="Password"
          name="Password"
          placeholder="密码"
          type="password"
          v-model="password"
        />
        <span
          class="field-validation-valid text-danger"
          data-valmsg-for="Password"
          data-valmsg-replace="true"
        ></span>
      </div>
      <div class="form-group">
        <label class="sr-only" for="ConfirmPassword">确认密码</label>
        <input
          class="form-control text-box single-line password"
          data-val="true"
          data-val-equalto="“确认密码”和“密码”不匹配。"
          data-val-equalto-other="*.Password"
          data-val-required="确认密码 字段是必需的。"
          id="ConfirmPassword"
          name="ConfirmPassword"
          placeholder="确认密码"
          type="password"
          v-model="confirmPassword"
        />
        <span
          class="field-validation-valid text-danger"
          data-valmsg-for="ConfirmPassword"
          data-valmsg-replace="true"
        ></span>
      </div>
      <div>
        <input type="button" @click="RegisterClick" value="注册" />
      </div>
      <p>
        已有账号？
        <router-link to="/Login">
          立即登陆
        </router-link>
      </p>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),
  methods: {
    ...mapActions(["Register"]),
    async RegisterClick() {
      const data = await this.Register({
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      console.log(data);
      if (data.status == "ok") {
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
