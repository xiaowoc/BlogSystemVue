<template>
  <div>
    <el-button type="text" @click="CreateCategoryVisible = true">新建分类</el-button>

    <el-dialog title="新建分类" :visible.sync="CreateCategoryVisible">
      <el-form :model="createCategoryForm" :rules="createCategoryRules" ref="createCategoryForm">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input
            type="text"
            placeholder="请输入分类名称"
            v-model="createCategoryForm.categoryName"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CreateCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="SubmitForm('createCategoryForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    CreateCategoryVisible: false,
    createCategoryForm: {
      categoryName: ""
    },
    createCategoryRules: {
      categoryName: [
        { required: true, message: "请输入分类名称", trigger: "blur" },
        { min: 2, max: 10, message: "长度为 2 ~ 10 个字符", trigger: "blur" }
      ]
    }
  }),
  methods: {
    ...mapActions(["AddCategory"]),
    async AddCategoryClick() {
      const data = await this.AddCategory({
        categoryName: this.createCategoryForm.categoryName
      });
      console.log(data);
      if (data.status == "ok") {
        this.$message({
          message: data.result,
          type: "success"
        });
        //清空内容
        this.createCategoryForm.categoryName = "";
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
          this.AddCategoryClick();
          this.CreateCategoryVisible = false;
        } else {
          console.log("数据不完整!!");
          return false;
        }
      });
    }
  }
};
</script>