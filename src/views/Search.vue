<template>
  <div>
    <form class="form-inline my-2 my-lg-0 ml-auto" action="/Home/Search" method="get">
      <div class="input-group">
        <input
          id="searchWord"
          name="searchWord"
          type="text"
          class="form-control"
          placeholder
          aria-label
          aria-describedby="button-addon2"
          v-model="searchWord"
        />
        <div class="input-group-append">
          <div class="btn-group">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              @click="SearchClick(searchWord,searchType,pageIndex,pageSize)"
            >搜索</button>
            <button
              type="button"
              class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="sr-only">下拉选项开关</span>
            </button>
            <div class="dropdown-menu">
              <a
                class="dropdown-item active"
                href="javascript:void(0);"
                @click="searchType = 0"
              >标题和用户名(默认)</a>
              <div role="separator" class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:void(0);" @click="searchType = 1">标题</a>
              <a class="dropdown-item" href="javascript:void(0);" @click="searchType = 2">用户名</a>
            </div>
          </div>
        </div>
      </div>
    </form>
    <hr />
    <div>
      <div class="whiteBlock">
        <p class="mb-0 align-items-center h5 d-flex">
          <span class="d-none d-sm-inline">关键字:</span>
          <span class="badge badge-info" title="关键字">{{ searchWord }}</span>&nbsp;
          <span class="d-none d-sm-inline">查找类型:</span>
          <span v-if="searchType == 0" class="badge badge-info" title="查找类型">标题和用户名</span>

          <span v-else-if="searchType == 1" class="badge badge-info" title="查找类型">标题</span>

          <span v-else-if="searchType == 2" class="badge badge-info" title="查找类型">用户名</span>
          <span v-else class="badge badge-info" title="查找类型">出现错误!!!</span>
          &nbsp;
          <span class="d-none d-sm-inline">匹配数量:</span>
          <span class="badge badge-info" title="匹配数量">{{ dataCount }}</span>&nbsp;
        </p>
      </div>
      <div class="whiteBlock pb-0">
        <div class="d-flex mb-2">
          <div class="row w-100">
            <div v-for="(data, index) in dataList" :key="index" class="col-lg-6 col-sm-12 mb-4">
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
                    <p class="card-text">{{ data.Content }}</p>
                    <p class="card-text">
                      <small class="text-muted">
                        {{ data.Email }} 发布于
                        {{ GetDateFormat(data.CreateTime) }}
                      </small>
                    </p>
                    <router-link :to="{path:'/ArticleDetails/' + data.Id}">继续阅读</router-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="dataList.Count == 0" class="text-center">什么都没有哦!</div>

            <el-pagination
              @current-change="HandleCurrentChange"
              :current-page.sync="pageIndex"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="dataCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    searchWord: "",
    searchType: 0,
    dataList: [],
    dataCount: 0,
    pageCount: 0,
    pageIndex: 1,
    pageSize: 10
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
    ...mapActions(["Search"]),
    async SearchClick(searchWord, searchType, pageIndex, pageSize) {
      const data = await this.Search({
        searchWord: searchWord,
        searchType: searchType,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      console.log(data);
      if (data.status == "ok") {
        this.dataList = data.data;
        this.dataCount = data.dataCount;
        this.pageCount = data.pageCount;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.searchWord = data.searchWord;
        this.searchType = data.searchType;
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    HandleCurrentChange(val) {
      this.SearchClick(this.searchWord, this.searchType, val, this.pageSize);
    }
  }
};
</script>
