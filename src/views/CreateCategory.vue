<template>
  <div>
    <el-button type="text" @click="CreateCategoryVisible = true">新建分类</el-button>

    <el-dialog title="新建分类" :visible.sync="CreateCategoryVisible">
      <el-input
        type="text"
        placeholder="请输入分类名称"
        v-model="categoryName"
        maxlength="10"
        show-word-limit
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CreateCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateCategoryVisible = false;AddCategoryClick()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    CreateCategoryVisible: false,
    categoryName: ""
  }),
  methods: {
    ...mapActions(["AddCategory"]),
    async AddCategoryClick() {
      const data = await this.AddCategory({ categoryName: this.categoryName });
      console.log(data);
      if (data.status == "ok") {
        this.$message({
          message: data.result,
          type: "success"
        });
        //清空内容
        this.categoryName = "";
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