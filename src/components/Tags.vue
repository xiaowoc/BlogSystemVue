<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>标签</span>
      <span>
        <router-link
          :to="{path:'/CategoryList/' + Id}"
          style="float: right; padding: 3px 0;font-size:13px;color: darkcyan;"
        >分类列表</router-link>
      </span>
    </div>
    <div id="categoriesDiv">
      <router-link
        v-for="(tag, index) in allCategory"
        :key="index"
        :to="{path:'/ArticleList/' + Id + '&categoryId=' + tag.Id}"
      >{{ tag.BlogCategoryName }}&nbsp;</router-link>
      <el-button v-if="!moreCategory" type="text" @click="GetMoreCategoriesClick">更多</el-button>
    </div>
  </el-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Tags",
  props: {
    Id: String,
    tenTags: Array
  },
  data: () => ({
    moreCategory: false,
    allCategory: []
  }),
  methods: {
    ...mapActions(["GetMoreCategories"]),
    GetTenTags() {
      this.allCategory = this.tenTags;
    },
    async GetMoreCategoriesClick() {
      // 获取所有分类
      const data = await this.GetMoreCategories({
        userId: this.Id
      });
      console.log(data);
      // 把数据循环生成html标签
      if (data.status == "ok") {
        this.allCategory = data.data;
        this.moreCategory = true;
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
  updated: function() {
    this.GetTenTags();
  }
};
</script>
<style scoped>
a {
  color: rgb(28, 153, 175);
}
</style>