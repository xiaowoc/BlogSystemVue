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
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="SearchClick(searchWord,searchType,pageIndex,pageSize)"
      ></el-button>
    </el-input>
    <br />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tag type="success">关键字:{{searchWord}}</el-tag>&nbsp;
        <el-tag v-if="searchType == 0" type="success">查找类型:标题和用户名</el-tag>
        <el-tag v-else-if="searchType == 1" type="success">查找类型:标题</el-tag>
        <el-tag v-else-if="searchType == 2" type="success">查找类型:用户名</el-tag>
        <el-tag v-else type="success">查找类型:出现错误!!!</el-tag>&nbsp;
        <el-tag type="success">匹配数量:{{dataCount}}</el-tag>&nbsp;
      </div>

      <el-row :gutter="10">
        <el-col :span="12" v-for="(data, index) in dataList" :key="index">
          <el-card shadow="hover">
            <el-row :gutter="10">
              <el-col :span="4">
                <img
                  :src="getServerHost+'/Image/' + data.imagePath"
                  name="searchImg"
                  style="width:50px;height:50px"
                />
              </el-col>
              <el-col :span="20">
                <div class="card-body">
                  <h5 class="card-title">{{ data.Title }}</h5>
                  <p class="card-text">{{ data.IntroContent==""?"（暂无简介）":"data.IntroContent" }}</p>
                  <p class="card-text">
                    <small>
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
      <div v-if="pageCount == 0" class="text-center">什么都没有哦!</div>
      <el-pagination
        v-if="dataCount!=0"
        @current-change="HandleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="dataCount"
      ></el-pagination>
    </el-card>
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
    pageCount: -1,
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
