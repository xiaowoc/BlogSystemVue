<template>
  <div>
    <p class="d-flex">
      <span>标签</span>
      <span class="ml-auto">
        <small>
          <router-link :to="{path:'/CategoryList/' + Id}">分类列表</router-link>
        </small>
      </span>
    </p>
    <div id="categoriesDiv">
      <router-link
        v-for="(tag, index) in allCategory"
        :key="index"
        :to="{path:'/ArticleList/' + Id + '&categoryId=' + tag.Id}"
      >{{ tag.BlogCategoryName }}</router-link>
      <el-button v-if="!moreCategory" type="text" @click="GetMoreCategoriesClick">更多</el-button>
    </div>
  </div>
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
