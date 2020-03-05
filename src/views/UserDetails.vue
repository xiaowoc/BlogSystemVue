<template>
  <el-col>
    <el-col :span="18">
      <div class="whiteBlock">
        <div>
          <p class="text-muted h5">置顶</p>
        </div>
        <div v-for="(article, index) in topArticles" :key="index" class="mt-3">
          <hr />
          <strong class="d-block h3">
            <a
              :href="'/ArticleDetails/' + article.Id"
              class="text-decoration-none"
            >{{ article.Title }}</a>
          </strong>
          <div class="py-2">
            <p class="h6">{{ article.IntroContent }}</p>
          </div>
          <div>
            <span title="创建日期">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="/IconSvg/data.svg#calendar" />
              </svg>
              {{ GetDateFormat(article.CreateTime) }}
            </span>
            <span title="喜欢">
              <svg class="myIcon" style="fill:#d4237a">
                <use xlink:href="/IconSvg/data.svg#like" />
              </svg>
              {{ article.GoodCount }}
            </span>
            <span title="不喜欢">
              <svg class="myIcon" style="fill:#13227a">
                <use xlink:href="/IconSvg/data.svg#hate" />
              </svg>
              {{ article.BadCount }}
            </span>
          </div>
          <div id="categories">
            <a
              v-for="(categoryId, cateIndex) in article.CategoryIds"
              :key="cateIndex"
              :href="
                    '/ArticleList/' +
                      article.userId +
                      '&categoryId=' +
                      categoryId
                  "
              class="badge badge-danger mr-1"
            >{{ article.CategoryNames[cateIndex] }}</a>
          </div>
        </div>
        <div v-if="topArticles.length == 0">
          <hr />
          <strong>暂无置顶</strong>
        </div>
      </div>
      <div class="whiteBlock">
        <div class="d-flex">
          <p class="text-decoration-none text-muted mr-1 h5">最新博客</p>
          <a :href="'/ArticleList/' + userInfo.Id" class="ml-auto text-muted">更多</a>
        </div>
        <div v-for="(article, index) in latestArticles" :key="index" class="mt-3">
          <hr />
          <strong class="d-block h3">
            <a
              :href="'/ArticleDetails/' + article.Id"
              class="text-decoration-none"
            >{{ article.Title }}</a>
          </strong>
          <div class="py-2">
            <p class="h6">{{ article.IntroContent }}</p>
          </div>
          <div>
            <span title="创建日期">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="/IconSvg/data.svg#calendar" />
              </svg>
              {{ GetDateFormat(article.CreateTime) }}
            </span>
            <span title="喜欢">
              <svg class="myIcon" style="fill:#d4237a">
                <use xlink:href="/IconSvg/data.svg#like" />
              </svg>
              {{ article.GoodCount }}
            </span>
            <span title="不喜欢">
              <svg class="myIcon" style="fill:#13227a">
                <use xlink:href="/IconSvg/data.svg#hate" />
              </svg>
              {{ article.BadCount }}
            </span>
          </div>
          <div id="categories">
            <a
              v-for="(categoryId, cateIndex) in article.CategoryIds"
              :key="cateIndex"
              :href="
                    '/Article/ArticleList?userId=' +
                      article.Id +
                      '&categoryId=' +
                      categoryId
                  "
              class="badge badge-warning mr-1"
            >{{ article.CategoryNames[cateIndex] }}</a>
          </div>
        </div>
      </div>
    </el-col>

    <el-col :span="6">
      <div class="sticky-top">
        <div class="whiteBlock text-center">
          <UserInfo :userInfo="userInfo" :isCurrentUser="isCurrentUser" :isFocused="isFocused" />
        </div>
        <div v-if="isCurrentUser" class="whiteBlock">
          <MoreActions :Id="userInfo.Id" />
        </div>
        <div class="whiteBlock">
          <Tags :Id="userInfo.Id" :tenTags="tenTags" />
        </div>
        <div class="whiteBlock">
          <Total :articlesCount="articlesCount" :categoriesCount="categoriesCount" />
        </div>
      </div>
    </el-col>
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import Tags from "@/components/Tags.vue";
import MoreActions from "@/components/MoreActions.vue";
import Total from "@/components/Total.vue";
export default {
  data: () => ({
    status: false,
    userInfo: {},
    latestArticles: [],
    topArticles: [],
    articlesCount: 0,
    categoriesCount: 0,
    isFocused: false,
    isCurrentUser: false,
    tenTags: []
  }),
  components: {
    UserInfo,
    Tags,
    MoreActions,
    Total
  },
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
    ...mapActions(["GetUserDetails"]),
    async GetUserDetailsInfo() {
      // 获取用户详情页数据信息
      const data = await this.GetUserDetails(this.$route.params);
      console.log(data);
      if (data.status == "ok") {
        this.status = data.status;
        this.userInfo = data.userInfo;
        this.latestArticles = data.latestArticles;
        this.topArticles = data.topArticles;
        this.articlesCount = data.articlesCount;
        this.categoriesCount = data.categoriesCount;
        this.isFocused = data.isFocused;
        this.isCurrentUser = data.isCurrentUser;
        this.tenTags = data.tenTags;
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
    this.GetUserDetailsInfo();
  }
};
</script>
