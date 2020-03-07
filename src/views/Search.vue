<template>
  <div>
    <el-input placeholder="请输入内容" v-model="searchWord" class="input-with-select">
      <el-select v-model="searchType" slot="prepend" placeholder="请选择">
        <el-option
          v-for="(option,index) in searchOption"
          :key="index"
          :label="option"
          :value="index"
        ></el-option>
        <!-- <el-option label="option0" value="0"></el-option>
        <el-option label="option1" value="1"></el-option>-->
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="SearchClick(searchWord,searchType,pageIndex,pageSize)"
      ></el-button>
    </el-input>

    <br />
    <div>
      <div class="whiteBlock">
        <p class="mb-0 align-items-center h5 d-flex">
          <el-tag type="success">关键字:{{searchWord}}</el-tag>&nbsp;
          <el-tag v-if="searchType == 0" type="success">查找类型:标题和用户名</el-tag>
          <el-tag v-else-if="searchType == 1" type="success">查找类型:标题</el-tag>
          <el-tag v-else-if="searchType == 2" type="success">查找类型:用户名</el-tag>
          <el-tag v-else type="success">查找类型:出现错误!!!</el-tag>&nbsp;
          <el-tag type="success">匹配数量:{{dataCount}}</el-tag>&nbsp;
        </p>
      </div>
      <div class="whiteBlock pb-0">
        <div class="d-flex mb-2">
          <div class="row w-100">
            <div v-for="(data, index) in dataList" :key="index" class="col-lg-6 col-sm-12 mb-4">
              <div class="row no-gutters border shadow-sm">
                <div class="col-4">
                  <img
                    :src="getServerHost+'/Image/' + data.imagePath"
                    name="searchImg"
                    class="rounded-circle w-75"
                    style="width:50px;height:50px;"
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
                    <router-link :to="{path:'/ArticleDetails/' + data.Id}" target="_blank">继续阅读</router-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="dataList.Count == 0" class="text-center">什么都没有哦!</div>

            <el-pagination
              v-if="dataCount!=0"
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    searchWord: "",
    searchType: 0,
    searchOption: ["标题和用户名", "标题", "用户名"],
    dataList: [],
    dataCount: 0,
    pageCount: 0,
    pageIndex: 1,
    pageSize: 10,
    optionName: ""
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
<style scoped>
.el-select {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
