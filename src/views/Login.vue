<template>
  <div>
    <el-button type="text" @click="loginFormVisible = true">登陆</el-button>

    <el-dialog title="登陆" :visible.sync="loginFormVisible">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item label="电子邮箱" prop="loginEmail">
          <el-input v-model="loginForm.loginEmail" autocomplete="off" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="loginPwd">
          <el-input
            v-model="loginForm.loginPwd"
            autocomplete="off"
            placeholder="登陆密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="记住我">
          <el-switch v-model="loginForm.rememberMe"></el-switch>
        </el-form-item>
        <span>
          没有账户，
          <router-link to="/Register">立即注册</router-link>
        </span>
        or
        <span>
          <router-link to="/ForgetPassword">忘记密码</router-link>
        </span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm('loginForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      loginFormVisible: false,
      loginForm: {
        loginEmail: "",
        loginPwd: "",
        rememberMe: false
      },
      loginRules: {
        loginEmail: [{ validator: checkEmail, trigger: "blur" }],
        loginPwd: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          { min: 6, message: "长度至少 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["Login"]),
    async LoginClick() {
      const data = await this.Login({
        email: this.loginForm.loginEmail,
        password: this.loginForm.loginPwd,
        rememberMe: this.loginForm.rememberMe
      });
      console.log(data);
      if (data.status == "ok") {
        //将userId值存进state，以此为登陆依据
        this.$store.commit("SetUserId", data.userId);
        //跳转回主页
        this.$router.push({ path: "/" });
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
          this.LoginClick();
          this.loginFormVisible = false;
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>
