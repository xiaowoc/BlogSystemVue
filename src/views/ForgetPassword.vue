<template>
  <div>
    <form action="/Home/ForgetPassword" method="post" novalidate="novalidate">
      <input
        name="__RequestVerificationToken"
        type="hidden"
        value="yCD-_jGnykZaOXOnmCWZkYyVkJIGAOp2QsDiOD6tCQD-Pas2c6T-aWT3VQL5Pb4KH5cN9FX6fJn1MKTbmVrnm9lg9sUq3OUNeSRpiu9PKxQ1"
      />
      <div class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-md-2" for="Email">电子邮件</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              data-val="true"
              data-val-email="电子邮件 字段不是有效的电子邮件地址。"
              data-val-required="电子邮件 字段是必需的。"
              id="Email"
              name="Email"
              type="email"
              v-model="email"
            />
            <span
              class="field-validation-valid text-danger"
              data-valmsg-for="Email"
              data-valmsg-replace="true"
            ></span>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-offset-2 col-md-10">
            <input type="button" value="发送邮件" @click="ForgetPasswordClick" class="btn btn-info" />
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
    email: ""
  }),
  methods: {
    ...mapActions(["ForgetPassword"]),
    async ForgetPasswordClick() {
      const data = await this.ForgetPassword({ email: this.email });
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