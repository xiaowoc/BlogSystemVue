<template>
  <el-row>
    <el-col :span="18">
      <div class="whiteBlock pb-0">
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{path:'/UserDetails/'+userInfo.Id}">用户首页</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">所有分类</li>
            </ol>
          </nav>
        </div>

        <div v-for="(category,index) in categoriesInfo" :key="index" class="mt-3" :id="category.Id">
          <hr />
          <strong class="d-block h3">
            <router-link
              :to="{path:'/ArticleList/'+requestId+'&categoryId='+category.Id}"
            >{{category.BlogCategoryName}}</router-link>
          </strong>
          <div>
            <span title="创建时间">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="../assets/data.svg#calendar" />
              </svg>
              {{GetDateFormat(category.CreateTime)}}
            </span>
            <span title="文章引用数量">
              <svg class="myIcon" style="fill:#e861dc">
                <use xlink:href="../assets/data.svg#flow" />
              </svg>
              {{category.ArticleCount}}
            </span>
            <a
              href="javascript:void(0);"
              type="text"
              @click="dialogFormVisible = true;currentCategoryId=category.Id"
            >
              <svg class="myIcon" style="fill:#f9d17c">
                <use xlink:href="../assets/data.svg#edit" />
              </svg>
            </a>

            <el-popconfirm title="确定删除吗？" @onConfirm="DeleteCategoryClick(category.Id)">
              <a href="javascript:void(0);" slot="reference">
                <svg class="myIcon" style="fill:#d81e06">
                  <use xlink:href="../assets/data.svg#delete" />
                </svg>
              </a>
            </el-popconfirm>
          </div>
        </div>

        <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="新的分类名称">
              <el-input v-model="newCategoryName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false;EditCategoryClick()">确 定</el-button>
          </div>
        </el-dialog>

        <div v-if="categoriesInfo.length==0" class="text-center">
          <strong>什么都没有哦</strong>
        </div>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="pageCount"
        ></el-pagination>
      </div>
    </el-col>

    <el-col :span="6">
      <div class="whiteBlock text-center">
        <UserInfo :userInfo="userInfo" :isCurrentUser="isCurrentUser" :isFocused="isFocused" />
      </div>
      <div class="whiteBlock">
        <Total :articlesCount="articlesCount" :categoriesCount="categoriesCount" />
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import Total from "@/components/Total.vue";
export default {
  components: {
    UserInfo,
    Total
  },
  data: () => ({
    categoriesInfo: {},
    pageCount: 0,
    pageIndex: 1,
    pageSize: 7,
    isCurrentUser: false,
    isFocused: false,
    requestId: "",
    userInfo: {},
    articlesCount: 0,
    categoriesCount: 0,
    dialogFormVisible: false,
    newCategoryName: "",
    currentCategoryId: ""
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
    ...mapActions(["CategoryList", "DeleteCategory", "EditCategory"]),
    //获取分类页面必要的数据
    async GetCategoryList(userId, pageIndex, pageSize) {
      const data = await this.CategoryList({
        userId: userId,
        pageIndex: pageIndex,
        pageSize: pageSize
      });
      console.log(data);
      if (data.status == "ok") {
        this.categoriesInfo = data.categoriesInfo;
        this.pageCount = data.pageCount;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.isCurrentUser = data.isCurrentUser;
        this.isFocused = data.isFocused;
        this.requestId = data.requestId;
        this.userInfo = data.userInfo;
        this.articlesCount = data.articlesCount;
        this.categoriesCount = data.categoriesCount;
      } else {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: "获取数据失败",
          duration: 0
        });
      }
    },
    //删除分类
    async DeleteCategoryClick(Id) {
      const data = await this.DeleteCategory({ Id: Id });
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
        this.GetCategoryList(this.requestId, 1, this.pageSize);
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    //编辑分类
    async EditCategoryClick() {
      const data = await this.EditCategory({
        categoryId: this.currentCategoryId,
        newCategoryName: this.newCategoryName
      });
      console.log(data);
      if (data.status == "ok") {
        //清空信息
        this.newCategoryName = "";
        // 提示错误信息
        this.$notify({
          title: "提示",
          message: data.result,
          duration: 0,
          type: "success"
        });
        //刷新页面
        // location.reload();
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
      this.GetCategoryList(this.requestId, val, this.pageSize);
    }
  },
  created: function() {
    this.GetCategoryList(
      this.$route.params.userId,
      this.pageIndex,
      this.pageSize
    );
  }
};
</script>