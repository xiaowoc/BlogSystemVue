<template>
  <div>
    <el-button type="text" @click="registerFormVisible = true">注册</el-button>

    <el-dialog title="注册" :visible.sync="registerFormVisible">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="registerForm.email" autocomplete="off" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="password">
          <el-input
            v-model="registerForm.password"
            autocomplete="off"
            placeholder="登陆密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认登陆密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            autocomplete="off"
            placeholder="确认登陆密码"
            type="password"
          ></el-input>
        </el-form-item>

        <p>
          已有账号？
          <router-link to="/Login">立即登陆</router-link>
        </p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="registerFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm('registerForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (!mailReg.test(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          this.IsEmailInUseInfo().then(val => {
            if (this.isUsed) {
              callback(new Error("该邮箱已经被使用！"));
            } else {
              callback();
            }
          });
        }
      }, 100);
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.registerForm.confirmPassword !== "") {
          this.$refs.registerForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validateConfirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerFormVisible: false,
      isUsed: false,
      registerForm: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      registerRules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
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
    ...mapActions(["Register", "IsEmailInUse"]),
    async RegisterClick() {
      const data = await this.Register({
        email: this.registerForm.email,
        password: this.registerForm.password,
        confirmPassword: this.registerForm.confirmPassword
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
    },
    async IsEmailInUseInfo() {
      const data = await this.IsEmailInUse({ email: this.registerForm.email });
      console.log(data);
      data == true ? (this.isUsed = false) : (this.isUsed = true);
    },
    SubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.RegisterClick();
          this.passwordregisterFormVisible = false;
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>
