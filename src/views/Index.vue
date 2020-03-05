<template>
  <el-col>
    <el-col :span="18">
      <div class="whiteBlock">
        <p class="h4">热门文章</p>
        <div v-for="(article, index) in famousArticle" :key="index" class="mt-3">
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
            <span title="用户">
              <router-link
                :to="{ name: 'UserDetails', params: { id: article.userId } }"
                class="text-decoration-none text-info"
              >
                <svg class="myIcon" style="fill:#d66063">
                  <use xlink:href="/IconSvg/data.svg#user" />
                </svg>
                {{ article.Email }}
              </router-link>
            </span>
            <span title="创建时间">
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
              class="badge badge-warning mr-1"
            >{{ article.CategoryNames[cateIndex] }}</a>
          </div>
        </div>
        <div v-if="famousArticle.Count == 0" class="text-center">
          <span>暂无内容</span>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="sticky-top">
        <div class="whiteBlock">
          <p class="h4">热门博客</p>
          <hr />
          <div
            v-for="(user, index) in popularUser"
            :key="index"
            class="d-flex justify-content-between align-items-center my-2"
          >
            <span>
              <a :href="'/UserDetails/' + user.Id" class="text-decoration-none">{{ user.Email }}</a>
            </span>
            <span class="badge badge-info">粉丝 {{ user.FansCount }} 人</span>
          </div>
          <div v-if="popularUser.Count == 0" class="text-center">
            <span>暂无内容</span>
          </div>
        </div>
        <div class="whiteBlock">
          <Total :articlesCount="articlesCount" :usersCount="usersCount" />
        </div>
      </div>
    </el-col>

    <el-col :span="24">
      <div class="whiteBlock pb-0">
        <div id="cardList">
          <div class="d-flex mb-2">
            <p class="h4 d-inline">随机文章</p>
            <button class="btn btn-outline-secondary ml-auto" @click="GetArticlesClick">换一换</button>
          </div>
          <div class="row" id="cardListRow">
            <div v-for="(data, index) in articleData" class="col-lg-6 col-sm-12 mb-4" :key="index">
              <div class="row no-gutters border shadow-sm">
                <div class="col-4">
                  <img
                    :src="'/Image/' + data.imagePath"
                    name="searchImg"
                    class="rounded-circle w-75"
                  />
                </div>
                <div class="col-8 position-static">
                  <div class="card-body">
                    <h5 class="card-title">{{ data.Title }}</h5>
                    <p class="card-text">{{ data.IntroContent }}</p>
                    <p class="card-text">
                      <small class="text-muted">
                        {{ data.Email }}发布于{{
                        GetDateFormat(data.CreateTime)
                        }}
                      </small>
                    </p>
                    <a :href="'/ArticleDetails/' + data.Id" class="stretched-link">继续阅读</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-col>
</template>
<script>
import { mapActions } from "vuex";
import Total from "@/components/Total.vue";
export default {
  components: {
    Total
  },
  data: () => ({
    returnCount: 4,
    articleData: [],
    popularUser: [],
    articlesCount: 0,
    usersCount: 0,
    famousArticle: [],
    status: false
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
    ...mapActions(["GetArticles", "GetIndex"]),
    async GetArticlesClick() {
      const data = await this.GetArticles({
        returnCount: this.returnCount
      });
      this.articleData = data;
      console.log(this.articleData);
    },
    async GetIndexInfo() {
      const data = await this.GetIndex();
      this.popularUser = data.popularUser;
      this.articlesCount = data.articlesCount;
      this.usersCount = data.usersCount;
      this.famousArticle = data.famousArticle;
      this.status = data.status;
      console.log(data);
    }
  },
  created: function() {
    this.GetIndexInfo();
    this.GetArticlesClick();
  }
};
</script>
