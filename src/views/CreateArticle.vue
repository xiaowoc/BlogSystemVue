<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card>
        <el-button
          type="text"
          @click="
              dialogFormVisible = true;
              GetMoreCategoriesClick();
            "
        >提交</el-button>

        <hr />
        <div>
          <p class="ml-3">目录</p>
          <div class="overflow-auto max-vh-65">
            <div id="custom-toc-container" previewcontainer="false"></div>
          </div>
        </div>
      </el-card>
    </el-col>

    <el-col :span="18">
      <mavon-editor v-model="editValue" class="vh-85" />
    </el-col>
    <el-dialog title="添加文章" :visible.sync="dialogFormVisible">
      <el-form>
        <el-input v-model="title" autocomplete="off" placeholder="标题"></el-input>
        <el-input type="textarea" v-model="introContent" autocomplete="off" placeholder="文章简介"></el-input>
        <div class="form-group mt-3" id="categoriesDiv">
          <el-checkbox-group v-model="checkedCategoryIds">
            <el-checkbox
              v-for="(category, index) in categories"
              :key="index"
              :label="category.Id"
            >{{category.BlogCategoryName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            AddArticleClick();
          "
        >确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    userId: "",
    editValue: "",
    categories: [],
    title: "",
    dialogFormVisible: false,
    introContent: "",
    checkedCategoryIds: []
  }),
  methods: {
    ...mapActions(["GetCreateArticle", "GetMoreCategories", "AddArticle"]),
    async GetCreateArticleInfo() {
      const data = await this.GetCreateArticle();
      this.userId = data.userId;
      console.log(data);
    },
    async GetMoreCategoriesClick() {
      if (this.userId == "") {
        // 输出错误信息
        this.$notify.error({
          title: "提示",
          message: "获取用户信息失败，请检查登陆状态",
          duration: 0
        });
      }
      // 获取所有分类
      const data = await this.GetMoreCategories({
        userId: this.userId
      });
      console.log(data);
      // 把数据循环生成html标签
      if (data.status == "ok") {
        this.categories = data.data;
        //输出提示信息
        // this.$notify({
        //   title: "提示",
        //   message: "已同步所有分类",
        //   duration: 0,
        //   type: "success"
        // });
      } else if (data.status == "fail") {
        // 输出错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async AddArticleClick() {
      const data = await this.AddArticle({
        title: this.title,
        content: this.editValue,
        introContent: this.introContent,
        categoryIds:
          this.checkedCategoryIds.length == 0 ? null : this.checkedCategoryIds
      });
      console.log(data);
      if (data.status == "ok") {
        this.$notify({
          title: "提示",
          message: "提交成功！",
          duration: 0,
          type: "success"
        });
        //跳转到文章详情页
      } else if (data.status == "fail") {
        // 输出错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    }
  },
  created: function() {
    this.GetCreateArticleInfo();
  }
};
</script>
