<template>
  <el-row>
    <el-col :span="18">
      <div class="whiteBlock">
        <div>
          <h1>{{ articleData.Title }}</h1>
        </div>
        <div>
          <span>
            <a :href="'/UserDetails/' + userInfo.Id" class="mr-3 text-decoration-none" title="用户">
              <svg class="myIcon" style="fill:#d66063">
                <use xlink:href="/IconSvg/data.svg#user" />
              </svg>
              {{ articleData.Email }}
            </a>
          </span>
          <span class="text-muted mr-3" title="创建时间">
            <svg class="myIcon" style="fill:#000000">
              <use xlink:href="/IconSvg/data.svg#calendar" />
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

          <a
            v-for="(categoryId, index) in articleData.CategoryIds"
            :key="index"
            :href="'/ArticleList/' + userInfo.Id + '&categoryId=' + categoryId"
            class="badge badge-success mr-1"
          >{{ articleData.CategoryNames[index] }}</a>
        </div>
        <hr />
        <div>{{ articleData.Content }}</div>

        <button class="btn btn-outline-white pl-0" id="btnLike" title="喜欢" @click="BtnGoodHandle">
          <svg class="myIcon" style="fill:#d4237a">
            <use xlink:href="/IconSvg/data.svg#like" />
          </svg>
          <span id="like">{{ articleData.GoodCount }}</span>
        </button>
        <button class="btn btn-outline-white pl-0" id="btnHate" title="不喜欢" @click="BtnBadHandle">
          <svg class="myIcon" style="fill:#13227a">
            <use xlink:href="/IconSvg/data.svg#hate" />
          </svg>
          <span id="hate">{{ articleData.BadCount }}</span>
        </button>

        <a v-if="isCurrentUser" :href="'/EditArticle/' + articleData.Id" class="btn" title="编辑">
          <svg class="myIcon" style="fill:#f9d17c">
            <use xlink:href="/IconSvg/data.svg#edit" />
          </svg>
        </a>
      </div>

      <div class="whiteBlock">
        <h3 class="my-3">评论</h3>
        <div class="input-group mb-3">
          <input
            type="text"
            class="col-12 form-control"
            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
            name="txtComment"
            id="txtComment"
            v-model="commentContent"
          />
          <div class="input-group-append">
            <button
              @click="AddComment"
              name="btnComment"
              id="btnComment"
              class="btn btn-outline-primary"
              data-container="body"
              data-toggle="popover"
              data-placement="top"
            >发表评论</button>
          </div>
        </div>

        <ul id="comments" class="list-group list-group-flush">
          <li v-for="(data,index) in commentData" :key="index" class="list-group-item">
            <div class="d-flex">
              <div class="p-2">
                <a :href="'/Home/UserDetails/' + data.UserId " class="mr-1">
                  <img
                    class="border"
                    style="width:24px;height:24px;border-radius:50%"
                    :src="'/Image/' + data.ImagePath "
                  />
                </a>
              </div>
              <div class="p-2">
                <span class="h6">
                  <strong>
                    <a
                      :href="'/Home/UserDetails/' + data.UserId "
                      class="text-decoration-none text-dark"
                    >{{data.Email }}</a>
                  </strong>
                </span>
                <small class="text-muted">{{GetDateFormat(data.CreateTime)}}</small>
                <span class="d-block mt-2">{{ data.Content }}</span>
              </div>
            </div>
          </li>
        </ul>
        <nav class="mt-3 d-flex justify-content-center">
          <ul class="pagination" id="pagination">
            <li class="page-item" id="itemPrev">
              <a href="#info" class="page-link" id="linkPrev">上一页</a>
            </li>
            <li class="page-item" id="itemNext">
              <a href="#info" class="page-link" id="linkNext">下一页</a>
            </li>
          </ul>
        </nav>
      </div>
    </el-col>

    <el-col :span="6">
      <div class="whiteBlock text-center">
        <UserInfo :userInfo="userInfo" :isCurrentUser="isCurrentUser" :isFocused="isFocused" />
      </div>
      <div class="whiteBlock">
        <Tags :Id="userInfo.Id" :tenTags="tenTags" />
      </div>
      <div class="whiteBlock">
        <Total :articlesCount="articlesCount" :categoriesCount="categoriesCount" />
      </div>
      <div class="whiteBlock sticky-top overflow-auto max-vh-100">
        <p>目录</p>
        <div id="custom-toc-container"></div>
      </div>
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
    articleData: {},
    userInfo: {},
    articlesCount: 0,
    categoriesCount: 0,
    isCurrentUser: false,
    isFocused: false,
    tenTags: [],
    commentContent: "",
    commentData: []
  }),
  computed: {
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
      "GetComments"
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
    async GetLikeHate() {
      //对已经点赞或者点踩做出按钮限制
    },
    async GetCommentsInfo(id, pageIndex, pageSize) {
      const data = await this.GetComments({
        id: id,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      console.log(data);
      if (data.status == "ok") {
        this.commentData = data.data;
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async AddComment() {},
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
  created: function() {
    //获取文章信息
    this.GetArticleDetailsInfo();
    //获取评论信息
    this.GetCommentsInfo(this.$route.params.id, 1, 10);
  }
};
</script>
