<template>
  <div>
    <el-form :model="resetPasswordForm" :rules="resetPasswordRules" ref="resetPasswordForm">
      <el-form-item label="登陆密码" prop="password">
        <el-input
          v-model="resetPasswordForm.password"
          autocomplete="off"
          placeholder="登陆密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认登陆密码" prop="confirmPassword">
        <el-input
          v-model="resetPasswordForm.confirmPassword"
          autocomplete="off"
          placeholder="确认登陆密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubmitForm('resetPasswordForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.resetPasswordForm.confirmPassword !== "") {
          this.$refs.resetPasswordForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validateConfirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.resetPasswordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      resetPasswordForm: {
        password: "",
        confirmPassword: ""
      },
      resetPasswordRules: {
        password: [
          { validator: validatePwd, trigger: "blur" },
          { min: 6, message: "长度需要在6个字符以上", trigger: "blur" }
        ],
        confirmPassword: [
          { validator: validateConfirmPwd, trigger: "blur" },
          { min: 6, message: "长度需要在6个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["ResetPassword"]),
    async ResetPasswordClick() {
      const data = await this.ResetPassword({
        token: this.$route.query.Token,
        password: this.resetPasswordForm.password,
        confirmPassword: this.resetPasswordForm.confirmPassword
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
    },
    SubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ResetPasswordClick();
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>