<template>
  <div>
    <form class="form-signin" method="post" novalidate="novalidate">
      <div class="form-group">
        <label class="sr-only" for="Email">电子邮件</label>
        <input
          class="form-control ml-0 text-box single-line"
          data-val="true"
          data-val-email="电子邮件 字段不是有效的电子邮件地址。"
          data-val-required="电子邮件 字段是必需的。"
          id="LoginEmail"
          name="LoginEmail"
          placeholder="账号"
          type="email"
          v-model="loginEmail"
        />
        <span
          class="field-validation-valid text-danger"
          data-valmsg-for="Email"
          data-valmsg-replace="true"
        ></span>
      </div>

      <div class="form-group">
        <label class="sr-only" for="LoginPwd">登陆密码</label>
        <input
          class="form-control text-box single-line password"
          data-val="true"
          data-val-length="字段 登陆密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
          data-val-length-max="50"
          data-val-length-min="6"
          data-val-required="登陆密码 字段是必需的。"
          id="LoginPwd"
          name="LoginPwd"
          placeholder="密码"
          type="password"
          v-model="loginPwd"
        />
        <span
          class="field-validation-valid text-danger"
          data-valmsg-for="LoginPwd"
          data-valmsg-replace="true"
        ></span>
      </div>

      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input
            class="custom-control-input"
            data-val="true"
            data-val-required="记住我 字段是必需的。"
            id="RememberMe"
            name="RememberMe"
            type="checkbox"
            v-model="rememberMe"
          />
          <label class="custom-control-label" for="RememberMe">记住我</label>
          <span
            class="field-validation-valid text-danger"
            data-valmsg-for="RememberMe"
            data-valmsg-replace="true"
          ></span>
        </div>
      </div>
      <div>
        <input type="button" @click="LoginClick" value="登陆" />
      </div>

      <span>
        没有账户，
        <router-link to="/Register">
          立即注册
        </router-link>
      </span>
      or
      <span>
        <a class="text-decoration-none" href="/Home/ForgetPassword">忘记密码</a>
      </span>
      <p class="text-center text-muted mt-2 mb-0">
        <small
          >如果在编辑文章页面或新建文章页面，请先保存当前进度再登陆！</small
        >
      </p>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    loginEmail: "",
    loginPwd: "",
    rememberMe: false
  }),
  methods: {
    ...mapActions(["Login"]),
    async LoginClick() {
      const data = await this.Login({
        email: this.loginEmail,
        password: this.loginPwd,
        rememberMe: this.rememberMe
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
