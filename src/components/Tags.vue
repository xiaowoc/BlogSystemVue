<template>
  <div>
    <p class="d-flex">
      <span>标签</span>
      <span class="ml-auto">
        <small>
          <a class="text-muted" :href="'/CategoryList/' + Id">分类列表</a>
        </small>
      </span>
    </p>
    <div id="categoriesDiv">
      <a
        v-for="(tag, index) in tenTags"
        :key="index"
        :href="'/ArticleList/' + Id + '&categoryId=' + tag.Id"
        class="badge badge-success mr-1"
        >{{ tag.BlogCategoryName }}</a
      >
      <a
        v-if="!moreCategory"
        class="badge badge-info"
        href="javascript:void(0);"
        @click="GetMoreCategoriesClick"
        >更多</a
      >
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Tags",
  props: {
    Id: String,
    tenTags: {
      Id: String,
      BlogCategoryName: String,
      CreateTime: Date,
      ArticleCount: Number
    }
  },
  data: () => ({
    moreCategory: false
  }),
  methods: {
    ...mapActions(["GetMoreCategories"]),
    async GetMoreCategoriesClick() {
      // 获取所有分类
      const data = await this.GetMoreCategories({
        userId: this.Id
      });
      console.log(data);
      // 把数据循环生成html标签
      if (data.status == "ok") {
        // this.tenTags = data.data;
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
  }
};
</script>
