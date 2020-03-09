<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更多操作</span>
    </div>
    <div>
      <el-button type="text" @click="changePasswordVisible = true">修改密码</el-button>&nbsp;
      <router-link :to="{path:'/ArticleList/' + Id}">文章列表</router-link>&nbsp;
      <router-link :to="{path:'/CategoryList/' + Id}">分类列表</router-link>

      <el-dialog title="修改密码" :visible.sync="changePasswordVisible">
        <el-form :model="changePasswordForm" :rules="changePasswordRules" ref="changePasswordForm">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input
              v-model="changePasswordForm.oldPwd"
              type="password"
              autocomplete="off"
              placeholder="旧密码"
            >旧密码</el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input
              v-model="changePasswordForm.newPwd"
              type="password"
              autocomplete="off"
              placeholder="新密码"
            >新密码</el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmNewPwd">
            <el-input
              v-model="changePasswordForm.confirmNewPwd"
              type="password"
              autocomplete="off"
              placeholder="确认新密码"
            >确认新密码</el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="changePasswordVisible = false">取 消</el-button>
          <el-button type="primary" @click="SubmitForm('changePasswordForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MoreActions",
  props: {
    Id: String
  },
  data() {
    var validateNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.changePasswordForm.confirmNewPwd !== "") {
          this.$refs.changePasswordForm.validateField("confirmNewPwd");
        }
        callback();
      }
    };
    var validateConfirmNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.changePasswordForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePasswordForm: {
        oldPwd: "",
        newPwd: "",
        confirmNewPwd: ""
      },
      changePasswordRules: {
        oldPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, message: "长度需要在6个字符以上", trigger: "blur" }
        ],
        newPwd: [
          { validator: validateNewPwd, trigger: "blur" },
          { min: 6, message: "长度需要在6个字符以上", trigger: "blur" }
        ],
        confirmNewPwd: [
          { validator: validateConfirmNewPwd, trigger: "blur" },
          { min: 6, message: "长度需要在6个字符以上", trigger: "blur" }
        ]
      },
      changePasswordVisible: false
    };
  },
  methods: {
    ...mapActions(["ChangePassword"]),
    async ChangePasswordClick() {
      // 修改密码
      const data = await this.ChangePassword({
        oldPwd: this.changePasswordForm.oldPwd,
        newPwd: this.changePasswordForm.newPwd,
        confirmNewPwd: this.changePasswordForm.confirmNewPwd
      });
      console.log(data);
      if (data.status == "ok") {
        // 清空内容
        this.changePasswordForm.oldPwd = "";
        this.changePasswordForm.newPwd = "";
        this.changePasswordForm.confirmNewPwd = "";
        // 提示框提示回传消息
        this.$notify({
          title: "提示",
          message: data.result,
          duration: 0,
          type: "success"
        });
      } else if (data.status == "fail") {
        // 提示框提示回传消息
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
          this.ChangePasswordClick();
          this.changePasswordVisible = false;
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
a {
  color: rgb(28, 153, 175);
}
</style>