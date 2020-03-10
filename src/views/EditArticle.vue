<template>
  <el-row>
    <el-row>
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
        <mavon-editor v-model="articleInfo.Content" class="vh-85" />
      </el-col>

      <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
        <el-form>
          <el-input v-model="articleInfo.Title" autocomplete="off" placeholder="标题"></el-input>
          <el-input
            type="textarea"
            v-model="articleInfo.IntroContent"
            autocomplete="off"
            placeholder="文章简介"
          ></el-input>
          <div class="form-group mt-3" id="categoriesDiv">
            <el-checkbox-group v-model="articleInfo.CategoryIds">
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
            EditArticleClick();
          "
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    userId: "",
    articleInfo: {},
    dialogFormVisible: false,
    categories: []
  }),
  methods: {
    ...mapActions(["GetEditArticle", "GetMoreCategories", "EditArticle"]),
    async GetEditArticleInfo() {
      const data = await this.GetEditArticle(this.$route.params);
      console.log(data);
      this.userId = data.userId;
      this.articleInfo = data.article;
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
    async EditArticleClick() {
      const data = await this.EditArticle({
        articleId: this.articleInfo.Id,
        title: this.articleInfo.Title,
        content: this.articleInfo.Content,
        introContent: this.articleInfo.IntroContent,
        categoryIds:
          this.articleInfo.CategoryIds.length == 0
            ? null
            : this.articleInfo.CategoryIds
      });
      console.log(data);
      if (data.status == "ok") {
        this.$notify({
          title: "提示",
          message: "编辑成功！",
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
    this.GetEditArticleInfo();
  }
};
</script>