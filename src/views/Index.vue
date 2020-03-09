<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>热门文章</span>
        </div>
        <el-card shadow="hover" v-for="(article, index) in famousArticle" :key="index">
          <strong class="d-block">
            <h3>
              <router-link :to="{path:'/ArticleDetails/' + article.Id}">{{ article.Title }}</router-link>
            </h3>
          </strong>
          <div class="py-2">
            <p class="h6">{{ article.IntroContent }}</p>
          </div>
          <div>
            <span title="用户">
              <router-link
                :to="{ name: 'UserDetails', params: { id: article.userId } }"
                class="colorUser"
              >
                <svg class="myIcon" style="fill:#d66063">
                  <use xlink:href="../assets/data.svg#user" />
                </svg>
                {{ article.Email }}
              </router-link>
            </span>
            <span title="创建时间">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="../assets/data.svg#calendar" />
              </svg>
              {{ GetDateFormat(article.CreateTime) }}
            </span>
            <span title="喜欢">
              <svg class="myIcon" style="fill:#d4237a">
                <use xlink:href="../assets/data.svg#like" />
              </svg>
              {{ article.GoodCount }}
            </span>
            <span title="不喜欢">
              <svg class="myIcon" style="fill:#13227a">
                <use xlink:href="../assets/data.svg#hate" />
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
            >{{ article.CategoryNames[cateIndex] }}&nbsp;</a>
          </div>
        </el-card>

        <div v-if="famousArticle.Count == 0" class="text-center">
          <span>暂无内容</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <div class="sticky-top">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热门博客</span>
          </div>
          <div v-for="(user, index) in popularUser" :key="index">
            <span>
              <router-link
                :to="{path:'/UserDetails/' + user.Id}"
                class="colorPopularUser"
              >{{ user.Email }}</router-link>
            </span>
            <span class="right">粉丝 {{ user.FansCount }} 人</span>
          </div>
          <div v-if="popularUser.Count == 0" class="text-center">
            <span>暂无内容</span>
          </div>
        </el-card>

        <Total :articlesCount="articlesCount" :usersCount="usersCount" />
      </div>
    </el-col>

    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>随机文章</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="GetArticlesClick">换一换</el-button>
        </div>
        <el-row :gutter="10">
          <el-col :span="12" v-for="(data, index) in articleData" :key="index">
            <el-card shadow="hover">
              <el-row :gutter="10">
                <el-col :span="4">
                  <img
                    :src="getServerHost+'/Image/' + data.imagePath"
                    name="searchImg"
                    style="width:50px;height:50px"
                    class="rounded-circle w-75"
                  />
                </el-col>
                <el-col :span="20">
                  <div class="card-body">
                    <h5 class="card-title">{{ data.Title }}</h5>
                    <p
                      class="card-text"
                    >{{ (data.IntroContent==""||data.IntroContent==null)?"（暂无简介）":data.IntroContent }}</p>
                    <p class="card-text">
                      <small class="text-muted">
                        {{ data.Email }}发布于{{
                        GetDateFormat(data.CreateTime)
                        }}
                      </small>
                    </p>
                    <router-link :to="{path:'/ArticleDetails/' + data.Id}">继续阅读</router-link>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
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
<style scoped>
.right {
  float: right;
}
.box-card {
  margin-bottom: 10px;
}
a {
  color: darkcyan;
}
.colorUser {
  color: rgb(23, 162, 184);
}
.colorPopularUser {
  color: rgb(59, 134, 216);
}
</style>
