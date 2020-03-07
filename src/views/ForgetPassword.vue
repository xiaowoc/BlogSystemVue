<template>
  <div>
    <el-form :model="forgetPasswordForm" :rules="forgetpasswordRules" ref="forgetPasswordForm">
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="forgetPasswordForm.email" autocomplete="off" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubmitForm('forgetPasswordForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      email: "",
      forgetPasswordForm: {
        email: ""
      },
      forgetpasswordRules: {
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["ForgetPassword"]),
    async ForgetPasswordClick() {
      const data = await this.ForgetPassword({
        email: this.forgetPasswordForm.email
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
          this.ForgetPasswordClick();
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>