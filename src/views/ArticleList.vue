<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb v-if="category!=null" separator="/">
            <el-breadcrumb-item :to="{path:'/UserDetails/' + userInfo.Id}">用户首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类:{{category.CategoryName}}</el-breadcrumb-item>
          </el-breadcrumb>

          <el-breadcrumb v-else separator="/">
            <el-breadcrumb-item :to="{path:'/UserDetails/' + userInfo.Id}">用户首页</el-breadcrumb-item>
            <el-breadcrumb-item>所有文章</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-card shadow="hover" v-for="(article,index) in articlesInfo" :key="index" class="mt-3">
          <strong class="d-block h3">
            <router-link :to="{path:'/ArticleDetails/'+article.Id}">{{article.Title}}</router-link>
          </strong>
          <div class="py-2">
            <p class="h6">{{article.IntroContent==""?"（暂无简介）":article.IntroContent}}</p>
          </div>
          <div>
            <span title="创建日期">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="../assets/data.svg#calendar" />
              </svg>
              {{GetDateFormat(article.CreateTime)}}
            </span>
            <span title="喜欢">
              <svg class="myIcon" style="fill:#d4237a">
                <use xlink:href="../assets/data.svg#like" />
              </svg>
              {{article.GoodCount}}
            </span>
            <span title="不喜欢">
              <svg class="myIcon" style="fill:#13227a">
                <use xlink:href="../assets/data.svg#hate" />
              </svg>
              {{article.BadCount}}
            </span>

            <router-link v-if="isCurrentUser" :to="{path:'/EditArticle/'+article.Id}" title="编辑">
              <svg class="myIcon" style="fill:#f9d17c">
                <use xlink:href="../assets/data.svg#edit" />
              </svg>
            </router-link>

            <el-popconfirm title="确定删除吗？" @onConfirm="DeleteArticleClick(article.Id)">
              <a href="javascript:void(0);" slot="reference">
                <svg class="myIcon" style="fill:#d81e06">
                  <use xlink:href="../assets/data.svg#delete" />
                </svg>
              </a>
            </el-popconfirm>
          </div>
          <div id="categories">
            <a
              v-for="(category,cateIndex) in article.CategoryIds"
              :key="cateIndex"
              :href="'/ArticleList/'+requestId+'&categoryId='+category"
              class="badge badge-warning mr-1"
            >{{article.CategoryNames[cateIndex]}}&nbsp;</a>
          </div>
        </el-card>

        <div v-if="articlesInfo.length==0 ">
          <hr />
          <div class="text-center">
            <strong>什么都没有哦</strong>
          </div>
        </div>
        <el-pagination
          v-if="articlesInfo.length!=0"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="pageMatchArticleCount"
        ></el-pagination>
      </el-card>
    </el-col>
    <el-col :span="6">
      <UserInfo :userInfo="userInfo" :isCurrentUser="isCurrentUser" :isFocused="isFocused" />

      <Tags :Id="userInfo.Id" :tenTags="tenTags" />

      <Total :articlesCount="articlesCount" :categoriesCount="categoriesCount" />
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import Tags from "@/components/Tags.vue";
import Total from "@/components/Total.vue";
export default {
  components: {
    UserInfo,
    Tags,
    Total
  },
  data: () => ({
    articlesInfo: [],
    pageCount: 0,
    pageIndex: 1,
    pageSize: 7,
    pageMatchArticleCount: 0,
    category: {},
    isCurrentUser: false,
    requestId: "",
    tenTags: [],
    articlesCount: 0,
    categoriesCount: 0,
    isFocused: false,
    userInfo: {}
  }),
  computed: {
    //转换时间格式
    GetDateFormat() {
      return str => {
        if (str == undefined) {
          return str;
        } else {
          return new Date(parseInt(str.substr(6, 13))).toLocaleDateString();
        }
      };
    }
  },
  methods: {
    ...mapActions(["ArticleList", "DeleteArticle"]),
    async GetArticleList(userId, categoryId, pageIndex, pageSize) {
      const data = await this.ArticleList({
        userId: userId,
        categoryId: categoryId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      console.log(data);
      if (data.status == "ok") {
        this.articlesInfo = data.articlesInfo;
        this.pageCount = data.pageCount;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.pageMatchArticleCount = data.pageMatchArticleCount;
        this.category = data.category;
        this.isCurrentUser = data.isCurrentUser;
        this.requestId = data.requestId;
        this.tenTags = data.tenTags;
        this.articlesCount = data.articlesCount;
        this.categoriesCount = data.categoriesCount;
        this.isFocused = data.isFocused;
        this.userInfo = data.userInfo;
      } else {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: "获取数据失败",
          duration: 0
        });
      }
    },
    async DeleteArticleClick(articleId) {
      const data = await this.DeleteArticle({ Id: articleId });
      console.log(data);
      if (data.status == "ok") {
        // 提示信息
        this.$notify({
          title: "提示",
          message: data.result,
          duration: 0,
          type: "success"
        });
        //刷新数据
        this.GetArticleList(
          this.requestId,
          this.category == null ? null : this.category.Id,
          1,
          this.pageSize
        );
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    //分页当前索引改变
    handleCurrentChange(val) {
      this.GetArticleList(
        this.requestId,
        this.category == null ? null : this.category.Id,
        val,
        this.pageSize
      );
    }
  },
  created: function() {
    this.GetArticleList(
      this.$route.params.userId,
      this.$route.params.categoryId,
      this.pageIndex,
      this.pageSize
    );
  }
};
</script>
<style scoped>
a {
  color: darkcyan;
}
</style>