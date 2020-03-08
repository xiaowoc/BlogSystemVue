<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card class="box-card">
        <div>
          <h1>{{ articleData.Title }}</h1>
        </div>
        <div>
          <span>
            <router-link :to="{path:'/UserDetails/' + userInfo.Id}" title="用户">
              <svg class="myIcon" style="fill:#d66063">
                <use xlink:href="../assets/data.svg#user" />
              </svg>
              {{ articleData.Email }}
            </router-link>
          </span>
          <span class="text-muted mr-3" title="创建时间">
            <svg class="myIcon" style="fill:#000000">
              <use xlink:href="../assets/data.svg#calendar" />
            </svg>
            {{ GetDateFormat(articleData.CreateTime) }}
          </span>

          <span
            v-if="
              articleData.CategoryIds == undefined ||
                articleData.CategoryIds.length == 0
            "
            class="text-black-50"
          >暂无分类</span>
          <router-link
            v-for="(categoryId, index) in articleData.CategoryIds"
            :key="index"
            :to="{path:'/ArticleList/' + userInfo.Id + '&categoryId=' + categoryId}"
          >{{ articleData.CategoryNames[index] }}</router-link>
        </div>

        <mavon-editor
          v-model="articleData.Content"
          :subfield="false"
          :boxShadow="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :ishljs="true"
        />
        <br />

        <span v-if="isClickLikeHate" title="喜欢" :class="{clickClass:isLike}">
          <svg class="myIcon" style="fill:#d4237a">
            <use xlink:href="../assets/data.svg#like" />
          </svg>
          {{ articleData.GoodCount }}
        </span>&nbsp;
        <span v-if="isClickLikeHate" title="不喜欢" :class="{clickClass:isHate}">
          <svg class="myIcon" style="fill:#13227a">
            <use xlink:href="../assets/data.svg#hate" />
          </svg>
          {{ articleData.BadCount }}
        </span>
        <a
          v-if="!isClickLikeHate"
          href="javascript:void(0);"
          class="btn btn-outline-white pl-0"
          id="btnLike"
          title="喜欢"
          @click="BtnGoodHandle"
        >
          <svg class="myIcon" style="fill:#d4237a">
            <use xlink:href="../assets/data.svg#like" />
          </svg>
          <span id="like">{{ articleData.GoodCount }}</span>
        </a>
        <a
          v-if="!isClickLikeHate"
          href="javascript:void(0);"
          class="btn btn-outline-white pl-0"
          id="btnHate"
          title="不喜欢"
          @click="BtnBadHandle"
        >
          <svg class="myIcon" style="fill:#13227a">
            <use xlink:href="../assets/data.svg#hate" />
          </svg>
          <span id="hate">{{ articleData.BadCount }}</span>
        </a>

        <router-link v-if="isCurrentUser" :to="{path:'/EditArticle/' + articleData.Id}" title="编辑">
          <svg class="myIcon" style="fill:#f9d17c">
            <use xlink:href="../assets/data.svg#edit" />
          </svg>
        </router-link>
      </el-card>

      <el-card class="box-card">
        <h3 class="my-3">评论</h3>

        <el-input
          placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
          v-model="commentContent"
          class="input-with-select"
        >
          <el-button slot="append" @click="AddCommentClick">发表评论</el-button>
        </el-input>

        <el-card shadow="never" v-for="(data,index) in commentData" :key="index">
          <el-row>
            <el-col :span="4">
              <router-link :to="{path:'/UserDetails/' + data.UserId }" title="用户">
                <img
                  class="border"
                  style="width:24px;height:24px;border-radius:50%"
                  :src="getServerHost+'/Image/' + data.ImagePath "
                />
              </router-link>
            </el-col>
            <el-col :span="20">
              <h3>
                <strong>
                  <router-link
                    :to="{path:'/UserDetails/' + data.UserId }"
                    title="用户"
                  >{{data.Email }}</router-link>
                </strong>&nbsp;
                <small style="font-size:12px;">{{GetDateFormat(data.CreateTime)}}</small>
              </h3>
              <br />
              <span class="d-block mt-2">{{ data.Content }}</span>
            </el-col>
          </el-row>
        </el-card>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="commentIndex"
          :page-size="commentSize"
          layout="prev, pager, next, jumper"
          :total="commentCount"
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
import { mapGetters } from "vuex";
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
    articleData: {},
    userInfo: {},
    articlesCount: 0,
    categoriesCount: 0,
    isCurrentUser: false,
    isFocused: false,
    tenTags: [],
    commentContent: "",
    commentData: [],
    commentIndex: 1,
    commentSize: 10,
    commentCount: 0,
    isClickLikeHate: false,
    isLike: false,
    isHate: false
  }),
  computed: {
    ...mapGetters(["getServerHost"]),
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
    ...mapActions([
      "GetArticleDetails",
      "BadCount",
      "GoodCount",
      "GetComments",
      "AddComment",
      "GetLikeHate"
    ]),
    async GetArticleDetailsInfo() {
      const data = await this.GetArticleDetails(this.$route.params);
      console.log(data);
      if (data.status == "ok") {
        this.articleData = data.articleData;
        this.userInfo = data.userInfo;
        this.articlesCount = data.articlesCount;
        this.categoriesCount = data.categoriesCount;
        this.isCurrentUser = data.isCurrentUser;
        this.isFocused = data.isFocused;
        this.tenTags = data.tenTags;
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async GetLikeHateInfo() {
      //对已经点赞或者点踩做出按钮限制
      const data = await this.GetLikeHate(this.$route.params);
      console.log(data);
      if (data.status == "ok") {
        //重置一下属性
        this.isLike = false;
        this.isHate = false;
        if (data.result == "like") {
          //对文字做限制
          this.isClickLikeHate = true;
          this.isLike = true;
        } else if (data.result == "hate") {
          //对文字做限制
          this.isClickLikeHate = true;
          this.isHate = true;
        }
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async GetCommentsInfo() {
      const data = await this.GetComments({
        id: this.$route.params.id,
        pageIndex: this.commentIndex,
        pageSize: this.commentSize
      });
      console.log(data);
      if (data.status == "ok") {
        this.commentData = data.data;
        this.commentIndex = data.pageCurrentIndex;
        this.commentSize = data.pageSize;
        this.commentCount = data.pageMatchCommentCount;
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async AddCommentClick() {
      if (this.commentContent == "") {
        //还没有评论
        this.$message.error("还没有评论哦");
      } else {
        const data = await this.AddComment({
          Id: this.articleData.Id,
          Content: this.commentContent
        });
        console.log(data);
        if (data.status == "ok") {
          //提示消息
          this.$message({
            message: "已发送",
            type: "success"
          });
          //返回第一页评论
          this.commentIndex = 1;
          this.GetCommentsInfo();
          //内容清空
          this.commentContent = "";
        } else if (data.status == "fail") {
          // 提示错误信息
          this.$notify.error({
            title: "提示",
            message: data.result,
            duration: 0
          });
        }
      }
    },
    async BtnGoodHandle() {
      const data = await this.GoodCount({ id: this.articleData.Id });
      console.log(data);
      if (data.status == "ok") {
        // 提示信息
        this.$notify({
          title: "提示",
          message: "点赞成功！",
          duration: 0,
          type: "success"
        });
        //刷新按钮状态
        this.GetLikeHateInfo();
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async BtnBadHandle() {
      const data = await this.BadCount({ id: this.articleData.Id });
      console.log(data);
      if (data.status == "ok") {
        // 提示信息
        this.$notify({
          title: "提示",
          message: "点踩成功！",
          duration: 0,
          type: "success"
        });
        //刷新按钮状态
        this.GetLikeHateInfo();
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    handleCurrentChange(val) {
      this.commentIndex = val;
      this.GetCommentsInfo();
    }
  },
  created: function() {
    //获取文章信息
    this.GetArticleDetailsInfo();
    //获取评论信息
    this.GetCommentsInfo();
    //获取点赞点踩状态
    this.GetLikeHateInfo();
  }
};
</script>
<style scoped>
.clickClass {
  color: red !important;
}
.el-card {
  margin-bottom: 0px;
}
</style>