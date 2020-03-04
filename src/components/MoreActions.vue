<template>
  <div>
    <p>更多操作</p>
    <a
      class="badge badge-warning"
      data-toggle="collapse"
      href="#multiCollapseExample1"
      role="button"
      aria-expanded="false"
      aria-controls="multiCollapseExample1"
    >修改密码</a>
    <a class="badge badge-warning" :href="'/ArticleList/' + Id">文章列表</a>
    <a class="badge badge-warning" :href="'/CategoryList/' + Id">分类列表</a>
    <div class="row">
      <div class="col">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <div class="card card-body">
            <form novalidate="novalidate">
              <div class="form-group">
                <label class="control-label" for="OldPassword">旧密码</label>
                <div>
                  <input
                    class="form-control text-box single-line password valid"
                    data-val="true"
                    data-val-length="字段 旧密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
                    data-val-length-max="50"
                    data-val-length-min="6"
                    data-val-required="旧密码 字段是必需的。"
                    id="OldPassword"
                    name="OldPassword"
                    type="password"
                    aria-describedby="OldPassword-error"
                    aria-invalid="false"
                    v-model="oldPwd"
                  />
                  <span
                    class="text-danger field-validation-valid"
                    data-valmsg-for="OldPassword"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label" for="NewPassword">新密码</label>
                <div>
                  <input
                    class="form-control text-box single-line password"
                    data-val="true"
                    data-val-length="字段 新密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
                    data-val-length-max="50"
                    data-val-length-min="6"
                    data-val-required="新密码 字段是必需的。"
                    id="NewPassword"
                    name="NewPassword"
                    type="password"
                    v-model="newPwd"
                  />
                  <span
                    class="field-validation-valid text-danger"
                    data-valmsg-for="NewPassword"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label" for="ConfirmNewPassword">确认新密码</label>
                <div>
                  <input
                    class="form-control text-box single-line password"
                    data-val="true"
                    data-val-equalto="“确认新密码”和“新密码”不匹配。"
                    data-val-equalto-other="*.NewPassword"
                    data-val-required="确认新密码 字段是必需的。"
                    id="ConfirmNewPassword"
                    name="ConfirmNewPassword"
                    type="password"
                    v-model="confirmNewPwd"
                  />
                  <span
                    class="field-validation-valid text-danger"
                    data-valmsg-for="ConfirmNewPassword"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
              <div class="form-group">
                <input type="button" @click="ChangePasswordClick" value="提交" class="btn btn-info" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MoreActions",
  props: {
    Id: String
  },
  data: () => ({
    oldPwd: "",
    newPwd: "",
    confirmNewPwd: ""
  }),
  methods: {
    ...mapActions(["ChangePassword"]),
    async ChangePasswordClick() {
      // 修改密码
      const data = await this.ChangePassword({
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
        confirmNewPwd: this.confirmNewPwd
      });
      console.log(data);
      if (data.status == "ok") {
        // 清空内容
        this.oldPwd = "";
        this.newPwd = "";
        this.confirmNewPwd = "";
        // 提示框提示回传消息
        this.$notify({
          title: "提示",
          message: data.result,
          duration: 0,
          type: "success"
        });
        // 恢复collapse
        // $("#multiCollapseExample1").collapse('hide');
      } else if (data.status == "fail") {
        // 提示框提示回传消息
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