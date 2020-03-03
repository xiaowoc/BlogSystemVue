<template>
  <el-row>
    <div
      class="modal fade modalEditCategory"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">编辑分类</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form novalidate="novalidate">
              <div class="form-group">
                <label class="control-label" for="NewCategoryName">新分类名称</label>
                <div>
                  <input
                    class="form-control text-box single-line"
                    data-val="true"
                    data-val-length="字段 新分类名称 必须是一个字符串，其最小长度为 2，最大长度为 200。"
                    data-val-length-max="200"
                    data-val-length-min="2"
                    data-val-required="新分类名称 字段是必需的。"
                    id="NewCategoryName"
                    name="NewCategoryName"
                    type="text"
                    value
                  />
                  <input type="hidden" name="CategoryId" id="CategoryId" value />
                  <span
                    class="field-validation-valid text-danger"
                    data-valmsg-for="NewCategoryName"
                    data-valmsg-replace="true"
                  ></span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              onclick="CloseEdit()"
              class="btn btn-secondary"
              data-dismiss="modal"
            >关闭</button>
            <button
              type="button"
              onclick="EditCategory()"
              class="btn btn-success"
              data-dismiss="modal"
            >提交</button>
          </div>
        </div>
      </div>
    </div>

    <el-row :span="18">
      <div class="whiteBlock pb-0">
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a :href="'/UserDetails/'+userInfo.Id">用户首页</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">所有分类</li>
            </ol>
          </nav>
        </div>

        <div v-for="(category,index) in categoriesInfo" :key="index" class="mt-3" :id="category.Id">
          <hr />
          <strong class="d-block h3">
            <a
              :href="'/ArticleList?userId='+requestId+'&categoryId='+category.Id"
              class="text-decoration-none"
            >{{category.BlogCategoryName}}</a>
          </strong>
          <div>
            <span title="创建时间">
              <svg class="myIcon" style="fill:#000000">
                <use xlink:href="/IconSvg/data.svg#calendar" />
              </svg>
              {{GetDateFormat(category.CreateTime)}}
            </span>
            <span title="文章引用数量">
              <svg class="myIcon" style="fill:#e861dc">
                <use xlink:href="/IconSvg/data.svg#flow" />
              </svg>
              {{category.ArticleCount}}
            </span>

            <el-button type="text" @click="EditCategoryClick(category.Id)">编辑</el-button>

            <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
            </el-dialog>-->

            <el-popconfirm title="确定删除吗？" @onConfirm="DeleteCategoryClick(category.Id)">
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
        </div>

        <div v-if="categoriesInfo.Count==0" class="text-center">
          <strong>什么都没有哦</strong>
        </div>

        <!-- <nav class="mt-3">
                        <ul class="pagination pb-1">
                            @if (ViewBag.PageCount == 0 || ViewBag.PageCount == 1)
                            {
                            }
                            else if (ViewBag.PageCount <= 7)//分页总数小于7
                            {
                                //当当前页数不是第一个时，显示‘上一页’
                                if (ViewBag.PageIndex != 1)
                                {
                                    <li class="page-item">
                                        <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@(ViewBag.PageIndex-1)">上一页</a>
                                    </li>
                                }
                                //实际页数小于可显示页数
                                for (int i = 1; i <= ViewBag.PageCount; i++)
                                {
                                    if (ViewBag.PageIndex == i)
                                    {
                                        <li class="page-item active">
                                            <a class="page-link" href="#">@i<span class="sr-only">(current)</span></a>
                                        </li>
                                    }
                                    else
                                    {
                                        <li class="page-item">
                                            <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@i">@i</a>
                                        </li>
                                    }
                                }
                                //当当前页数不是最后一个页数时，显示‘下一页’
                                if (ViewBag.PageIndex != ViewBag.PageCount)
                                {
                                    <li class="page-item">
                                        <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@(ViewBag.PageIndex+1)">下一页</a>
                                    </li>
                                }
                            }
                            else//分页总数大于7
                            {
                                //当当前页数不是第一个时，显示‘上一页’
                                if (ViewBag.PageIndex != 1)
                                {
                                    <li class="page-item">
                                        <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@(ViewBag.PageIndex-1)">上一页</a>
                                    </li>
                                }
                                //实际页数大于可显示页数，这时得分三种情况
                                if (ViewBag.PageIndex <= 7 / 2 + 1)
                                {
                                    //1.在头部前4个不用动
                                    //实际页数小于可显示页数
                                    for (int i = 1; i <= 7; i++)
                                    {
                                        if (ViewBag.PageIndex == i)
                                        {
                                            <li class="page-item active">
                                                <a class="page-link" href="#">@i<span class="sr-only">(current)</span></a>
                                            </li>
                                        }
                                        else
                                        {
                                            <li class="page-item">
                                                <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@i">@i</a>
                                            </li>
                                        }
                                    }
                                }
                                else if (ViewBag.PageCount - ViewBag.PageIndex <= 7 / 2)
                                {
                                    //2.在尾部总页数-当前页数<=3不用动
                                    for (int i = ViewBag.PageCount - (7 - 1); i <= ViewBag.PageCount; i++)
                                    {
                                        if (ViewBag.PageIndex == i)
                                        {
                                            <li class="page-item active">
                                                <a class="page-link" href="#">@i<span class="sr-only">(current)</span></a>
                                            </li>
                                        }
                                        else
                                        {
                                            <li class="page-item">
                                                <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@i">@i</a>
                                            </li>
                                        }
                                    }
                                }
                                else
                                {
                                    //3.在中间时，当前页数-3到当前页数+3
                                    for (int i = ViewBag.PageIndex - 7 / 2; i <= ViewBag.PageIndex + 7 / 2; i++)
                                    {
                                        if (ViewBag.PageIndex == i)
                                        {
                                            <li class="page-item active">
                                                <a class="page-link" href="#">@i<span class="sr-only">(current)</span></a>
                                            </li>
                                        }
                                        else
                                        {
                                            <li class="page-item">
                                                <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@i">@i</a>
                                            </li>
                                        }
                                    }
                                }
                                //当当前页数不是最后一个页数时，显示‘下一页’
                                if (ViewBag.PageIndex != ViewBag.PageCount)
                                {
                                    <li class="page-item">
                                        <a class="page-link" href="/Article/CategoryList?userId=@ViewBag.RequestId&pageIndex=@(ViewBag.PageIndex+1)">下一页</a>
                                    </li>
                                }
                            }
                        </ul>
        </nav>-->
      </div>
    </el-row>

    <el-row :span="6">
      <div class="sticky-top">
        <div class="whiteBlock text-center">
          <UserInfo :userInfo="userInfo" :isCurrentUser="isCurrentUser" :isFocused="isFocused" />
        </div>
        <div class="whiteBlock">
          <Total :articlesCount="articlesCount" :categoriesCount="categoriesCount" />
        </div>
      </div>
    </el-row>
  </el-row>
</template>
<script>
import { mapActions } from "vuex";
import UserInfo from "@/components/UserInfo.vue";
import MoreActions from "@/components/MoreActions.vue";
import Total from "@/components/Total.vue";
export default {
  components: {
    UserInfo,
    Total
  },
  data: () => ({
    categoriesInfo: {},
    pageCount: 0,
    pageIndex: 0,
    isCurrentUser: false,
    isFocused: false,
    requestId: "",
    userInfo: {},
    articlesCount: 0,
    categoriesCount: 0
  }),
  computed: {
    GetDateFormat() {
      return str => {
        return new Date(parseInt(str.substr(6, 13))).toLocaleDateString();
      };
    }
  },
  methods: {
    ...mapActions(["CategoryList", "DeleteCategory"]),
    async GetCategoryList() {
      console.log(this.$route.params);
      const data = await this.CategoryList(this.$route.params);
      console.log(data);
      this.categoriesInfo = data.categoriesInfo;
      this.pageCount = data.pageCount;
      this.pageIndex = data.pageIndex;
      this.isCurrentUser = data.isCurrentUser;
      this.isFocused = data.isFocused;
      this.requestId = data.requestId;
      this.userInfo = data.userInfo;
      this.articlesCount = data.articlesCount;
      this.categoriesCount = data.categoriesCount;
    },
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
        //删除数据
        // $("#" + id + "").remove();
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    EditCategoryClick(categoryId) {}

    //         function EditCategory() {
    //             var newCategoryName = $("#NewCategoryName").val();
    //             var categoryId=$("#CategoryId").val();
    //             $.ajax({
    //                 url: "/Article/EditCategory/",
    //                 type: "post",
    //                 data: { categoryId, newCategoryName },
    //                 dataType: "json",
    //                 success: function (data) {
    //                     if (data.status == "ok") {
    //                         $(".toast-body").text(data.result);
    //                         $(".toast").show();
    //                         $(".toast").toast('show');
    //                         location.reload();
    //                     } else if (data.status == "fail") {
    //                         $(".toast-body").text(data.result);
    //                         $(".toast").show();
    //                         $(".toast").toast('show');
    //                     }
    //                 }
    //             })
    //         }

    //         function OpenEdit(categoryId) {
    //             $("#CategoryId").val(categoryId);
    //         }
  },
  created: function() {
    this.GetCategoryList();
  }
};
</script>