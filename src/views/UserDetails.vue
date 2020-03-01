<template>
  <div>
    <div class="container-xl">
      <div class="row">
        <div
          class="modal fade bd-example-modal-lg"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">更换头像</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body mx-auto">
                <img id="previewImg" class="rounded-circle" :src="imgSrc" :style="imgStyle" />
                <div class="text-center">
                  <!-- <a
                    class="text-decoration-none"
                    href="javascript:void(0);"
                    onclick="$("#previewFile").click()"
                  >-->
                  <svg class="myIcon" style="fill:#c86a95;width:24px;height:24px;">
                    <use xlink:href="/IconSvg/data.svg#image" />
                  </svg>选择图片
                  <!-- </a> -->
                </div>
                <form enctype="multipart/form-data" id="changeImageForm">
                  <input
                    type="file"
                    name="file"
                    id="previewFile"
                    style="display:none"
                    accept="image/png, image/jpg, image/jpeg"
                    @change="ImgChange"
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button
                  type="button"
                  @click="ChangeImageClick"
                  class="btn btn-success"
                  data-dismiss="modal"
                >提交</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="whiteBlock">
            <div>
              <p class="text-muted h5">置顶</p>
            </div>
            <div v-for="(article,index) in topArticles" :key="index" class="mt-3">
              <hr />
              <strong class="d-block h3">
                <a
                  :href="'/Article/ArticleDetails/'+article.Id"
                  class="text-decoration-none"
                >{{article.Title}}</a>
              </strong>
              <div class="py-2">
                <p class="h6">{{article.IntroContent}}</p>
              </div>
              <div>
                <span title="创建日期">
                  <svg class="myIcon" style="fill:#000000">
                    <use xlink:href="/IconSvg/data.svg#calendar" />
                  </svg>
                  {{GetDateFormat(article.CreateTime)}}
                </span>
                <span title="喜欢">
                  <svg class="myIcon" style="fill:#d4237a">
                    <use xlink:href="/IconSvg/data.svg#like" />
                  </svg>
                  {{article.GoodCount}}
                </span>
                <span title="不喜欢">
                  <svg class="myIcon" style="fill:#13227a">
                    <use xlink:href="/IconSvg/data.svg#hate" />
                  </svg>
                  {{article.BadCount}}
                </span>
              </div>
              <div id="categories">
                <a
                  v-for="(categoryId,cateIndex) in article.CategoryIds"
                  :key="cateIndex"
                  :href="'/Article/ArticleList?userId='+article.userId+'&categoryId='+categoryId"
                  class="badge badge-danger mr-1"
                >{{article.CategoryNames[cateIndex]}}</a>
              </div>
            </div>
            <div v-if="topArticles.Count == 0">
              <hr />
              <strong>暂无置顶</strong>
            </div>
          </div>
          <div class="whiteBlock">
            <div class="d-flex">
              <p class="text-decoration-none text-muted mr-1 h5">最新博客</p>
              <a :href="'/Article/ArticleList?userId='+userInfo.Id" class="ml-auto text-muted">更多</a>
            </div>
            <div v-for="(article,index) in latestArticles" :key="index" class="mt-3">
              <hr />
              <strong class="d-block h3">
                <a
                  :href="'/Article/ArticleDetails/'+article.Id"
                  class="text-decoration-none"
                >{{article.Title}}</a>
              </strong>
              <div class="py-2">
                <p class="h6">{{article.IntroContent}}</p>
              </div>
              <div>
                <span title="创建日期">
                  <svg class="myIcon" style="fill:#000000">
                    <use xlink:href="/IconSvg/data.svg#calendar" />
                  </svg>
                  {{GetDateFormat(article.CreateTime)}}
                </span>
                <span title="喜欢">
                  <svg class="myIcon" style="fill:#d4237a">
                    <use xlink:href="/IconSvg/data.svg#like" />
                  </svg>
                  {{article.GoodCount}}
                </span>
                <span title="不喜欢">
                  <svg class="myIcon" style="fill:#13227a">
                    <use xlink:href="/IconSvg/data.svg#hate" />
                  </svg>
                  {{article.BadCount}}
                </span>
              </div>
              <div id="categories">
                <a
                  v-for="(categoryId,cateIndex) in article.CategoryIds"
                  :key="cateIndex"
                  :href="'/Article/ArticleList?userId='+article.Id+'&categoryId='+categoryId"
                  class="badge badge-warning mr-1"
                >{{article.CategoryNames[cateIndex]}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="sticky-top">
            <div class="whiteBlock text-center">
              <div class="position-relative mx-auto my-2" style="width:88px;height:88px;">
                <img
                  class="rounded-circle"
                  id="img-avatar"
                  style="width:88px;height:88px;"
                  :src="'/Image/'+userInfo.ImagePath"
                /> -->
                <a
                  v-if="isCurrentUser"
                  href="javascript:void(0);"
                  id="avatar-cover"
                  class="position-absolute text-decoration-none rounded-circle"
                  style="width:88px;height:88px;left:0;line-height:88px;opacity:0;"
                  data-toggle="modal"
                  data-target=".bd-example-modal-lg"
                >更换头像</a>
              </div>
              <p class="my-2">{{userInfo.Email}}</p>
              <p v-show="!isCurrentUser" class="my-2">{{userInfo.Nickname}}</p>
              <input
                v-show="isCurrentUser"
                id="nickName"
                class="w-100 text-center my-2"
                type="text"
                placeholder="编辑昵称"
                v-model="userInfo.Nickname"
                style="border-radius:4px;border:1px solid transparent;"
                maxlength="30"
                @blur="ChangeNickNameBlur"
              />
              <span class="badge badge-info">
                关注
                <span id="focus">{{userInfo.FocusCount}}</span> 人
              </span>
              <span class="badge badge-info">
                粉丝
                <span id="fans">{{userInfo.FansCount}}</span> 人
              </span>
              <a
                v-if="isFocused"
                href="javascript:void(0);"
                id="btnunFocus"
                class="badge badge-secondary"
              >√ 已关注</a>
              <a
                v-else-if="!isFocused"
                href="javascript:void(0);"
                id="btnFocus"
                class="badge badge-danger"
              >点我关注</a>
            </div>
            <div v-if="isCurrentUser" class="whiteBlock">
              <p>更多操作</p>
              <a
                class="badge badge-warning"
                data-toggle="collapse"
                href="#multiCollapseExample1"
                role="button"
                aria-expanded="false"
                aria-controls="multiCollapseExample1"
              >修改密码</a>
              <a class="badge badge-warning" :href="'/Article/ArticleList?userId='+userInfo.Id">文章列表</a>
              <a
                class="badge badge-warning"
                :href="'/Article/CategoryList?userId='+userInfo.Id"
              >分类列表</a>
              <div class="row">
                <div class="col">
                  <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <div class="card card-body">
                      <form novalidate="novalidate">
                        <div class="form-group">
                          <label class="control-label" for="OldPassword">旧密码</label>
                          <div>
                            <input
                              class="form-control text-box single-line password valid"
                              data-val="true"
                              data-val-length="字段 旧密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
                              data-val-length-max="50"
                              data-val-length-min="6"
                              data-val-required="旧密码 字段是必需的。"
                              id="OldPassword"
                              name="OldPassword"
                              type="password"
                              aria-describedby="OldPassword-error"
                              aria-invalid="false"
                              v-model="oldPwd"
                            />
                            <span
                              class="text-danger field-validation-valid"
                              data-valmsg-for="OldPassword"
                              data-valmsg-replace="true"
                            ></span>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="control-label" for="NewPassword">新密码</label>
                          <div>
                            <input
                              class="form-control text-box single-line password"
                              data-val="true"
                              data-val-length="字段 新密码 必须是一个字符串，其最小长度为 6，最大长度为 50。"
                              data-val-length-max="50"
                              data-val-length-min="6"
                              data-val-required="新密码 字段是必需的。"
                              id="NewPassword"
                              name="NewPassword"
                              type="password"
                              v-model="newPwd"
                            />
                            <span
                              class="field-validation-valid text-danger"
                              data-valmsg-for="NewPassword"
                              data-valmsg-replace="true"
                            ></span>
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="control-label" for="ConfirmNewPassword">确认新密码</label>
                          <div>
                            <input
                              class="form-control text-box single-line password"
                              data-val="true"
                              data-val-equalto="“确认新密码”和“新密码”不匹配。"
                              data-val-equalto-other="*.NewPassword"
                              data-val-required="确认新密码 字段是必需的。"
                              id="ConfirmNewPassword"
                              name="ConfirmNewPassword"
                              type="password"
                              v-model="confirmNewPwd"
                            />
                            <span
                              class="field-validation-valid text-danger"
                              data-valmsg-for="ConfirmNewPassword"
                              data-valmsg-replace="true"
                            ></span>
                          </div>
                        </div>
                        <div class="form-group">
                          <input
                            type="button"
                            @click="ChangePasswordClick"
                            value="提交"
                            class="btn btn-info"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="whiteBlock">
              <p class="d-flex">
                <span>标签</span>
                <span class="ml-auto">
                  <small>
                    <a class="text-muted" :href="'/Article/CategoryList?userId='+userInfo.Id">分类列表</a>
                  </small>
                </span>
              </p>
              <div id="categoriesDiv">
                <a
                  v-for="(tag,index) in tenTags"
                  :key="index"
                  :href="'/Article/ArticleList?userId='+userInfo.Id+'&categoryId='+tag.Id"
                  class="badge badge-success mr-1"
                >{{tag.BlogCategoryName}}</a>
                <a
                  v-if="!moreCategory"
                  class="badge badge-info"
                  href="javascript:void(0);"
                  @click="getMoreCategoriesClick"
                >更多</a>
              </div>
            </div>
            <div class="whiteBlock">
              <p>归档</p>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span>文章总计</span>
                  <span class="badge badge-pill badge-info">{{articlesCount}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span>分类总计</span>
                  <span class="badge badge-pill badge-info">{{categoriesCount}}</span>
                </li>
              </ul>
            </div>
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
    status: false,
    userInfo: [],
    latestArticles: [],
    topArticles: [],
    articlesCount: 0,
    categoriesCount: 0,
    isFocused: false,
    isCurrentUser: false,
    tenTags: [],
    oldPwd: "",
    newPwd: "",
    confirmNewPwd: "",
    img: [],
    imgSrc: "",
    imgStyle: {
      display: "none"
    },
    moreCategory: false
  }),
  computed: {
    GetDateFormat() {
      return str => {
        return new Date(parseInt(str.substr(6, 13))).toLocaleDateString();
      };
    }
  },
  methods: {
    ...mapActions([
      "GetUserDetails",
      "ChangePassword",
      "ChangeImage",
      "ChangeNickName",
      "getMoreCategories"
    ]),
    async GetUserDetailsInfo() {
      //获取用户详情页数据信息
      const data = await this.GetUserDetails(this.$route.params);
      this.status = data.status;
      this.userInfo = data.userInfo;
      this.latestArticles = data.latestArticles;
      this.topArticles = data.topArticles;
      this.articlesCount = data.articlesCount;
      this.categoriesCount = data.categoriesCount;
      this.isFocused = data.isFocused;
      this.isCurrentUser = data.isCurrentUser;
      this.tenTags = data.tenTags;
      console.log(data);
    },
    async ChangePasswordClick() {
      //修改密码
      const data = await this.ChangePassword({
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
        confirmNewPwd: this.confirmNewPwd
      });
      console.log(data);
      if (data.status == "ok") {
        //清空内容
        this.oldPwd = "";
        this.newPwd = "";
        this.confirmNewPwd = "";

        //恢复collapse
        // $("#multiCollapseExample1").collapse('hide');
      } else if (data.status == "fail") {
      }
      //提示框提示回传消息
      // $(".toast-body").text(data.result);
      // $(".toast").show();
      // $(".toast").toast('show');
    },
    async ChangeNickNameBlur() {
      //修改昵称
      const data = await this.ChangeNickName({
        nickName: this.userInfo.Nickname
      });
      console.log(data);
      if (data.status == "ok") {
        console.log("ok");
      } else if (data.status == "fail") {
        //提示框提示回传消息
        // $(".toast-body").text(data.result);
        // $(".toast").show();
        // $(".toast").toast("show");
      }
    },
    ImgChange(e) {
      this.img = event.target.files[0];
      // 头像预览生成url
      this.imgSrc = URL.createObjectURL(this.img);
      this.imgStyle = {
        width: "200px",
        height: "200px",
        display: "block"
      };
    },
    async ChangeImageClick() {
      console.log(this.img);
      //修改头像
      const formData = new FormData();
      formData.append("file", this.img, this.img.name);
      const data = await this.ChangeImage(
        { file: formData },
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(data);
      if (data.status == "ok") {
        console.log("ok,new image path is" + data.path);
        this.userInfo.ImagePath = data.path;
      } else if (data.status == "fail") {
        //返回错误信息
        // $(".toast-body").text(data.result);
        // $(".toast").show();
        // $(".toast").toast("show");
      }
    },
    async getMoreCategoriesClick() {
      //获取所有分类
      const data = await this.getMoreCategories({
        userId: this.userInfo.userId
      });
      console.log(data);
      //把数据循环生成html标签
      if (data.status == "ok") {
        this.tenTags = data.data;
        this.moreCategory = true;
      } else if (data.status == "fail") {
        //输出错误信息
        // $(".toast-body").text(data.result);
        // $(".toast").show();
        // $(".toast").toast("show");
      }
    },
    FocusUser() {
      var focusUserId = "@Model.Id";
      $.ajax({
        url: "/Home/FocusUser/",
        dataType: "json",
        data: { focusUserId: focusUserId },
        type: "post",
        success: function(data) {
          //   $(".toast-body").text(data.result);
          //   $(".toast").toast("show");
          if (data.status == "ok") {
            $("#btnFocus").text("√ 已关注"); //修改显示内容
            $("#btnFocus").attr("class", "badge badge-secondary"); //更换显示class
            $("#fans").text(parseInt($("#fans").html()) + 1); //数量+1
            $("#btnFocus").unbind(); //取消绑定事件
            $("#btnFocus").attr("id", "btnunFocus"); //id修改
            $("#btnunFocus").hover(
              function() {
                //再给新id绑定hover事件
                $("#btnunFocus").text("取消关注");
              },
              function() {
                $("#btnunFocus").text("√ 已关注");
              }
            );
            $("#btnunFocus").on("click", function() {
              //再给新id绑定点击事件
              $("#btnunFocus").bind("click", UnFocusUser());
            });
          } else if (data.status == "fail") {
            $(".toast-body").text(data.result);
            $(".toast").show();
            $(".toast").toast("show");
          }
        }
      });
    },
    // $(function () {
    //             //初始化绑定点击事件和hover事件
    //             $("#btnFocus").on('click', function () {
    //                 $("#btnFocus").bind('click', FocusUser());
    //             });
    //             $("#btnunFocus").on('click', function () {
    //                 $("#btnunFocus").bind('click', UnFocusUser());
    //             });
    //             //关注覆盖显示
    //             $("#btnunFocus").hover(function () {
    //                 $("#btnunFocus").text("取消关注");
    //             }, function () {
    //                 $("#btnunFocus").text("√ 已关注");
    //             });
    //             //头像覆盖显示
    //             $("#avatar-cover").hover(function () {
    //                 $("#avatar-cover").css({ "width": "88px", "height": "88px", "left": "0", "line-height": "88px", "color": "white", "background-color": "rgba(0,0,0,.6)", "opacity": "100" });
    //             }, function () {
    //                 $("#avatar-cover").css({ "width": "88px", "height": "88px", "left": "0", "line-height": "88px", "opacity": "0" });
    //             });
    //             //昵称覆盖显示
    //             $("#nickName").hover(function () {
    //                 $("#nickName").css({ "border": "1px solid green" });
    //             }, function () {
    //                 $("#nickName").css({ "border-radius": "4px", "border": "1px solid transparent", "display": "@(isCurrentUser?"block":"none")" });
    //             });
    //             //昵称失去焦点提交
    //             $("#nickName").blur(function () {
    //                 ChangeNickName($("#nickName").val());
    //             });
    //
    //         })

    UnFocusUser() {
      var focusUserId = "@Model.Id";
      $.ajax({
        url: "/Home/UnFocusUser/",
        dataType: "json",
        data: { focusUserId: focusUserId },
        type: "post",
        success: function(data) {
          $(".toast-body").text(data.result);
          $(".toast").toast("show");
          if (data.status == "ok") {
            $("#btnunFocus").text("关注");
            $("#btnunFocus").attr("class", "badge badge-danger");
            $("#fans").text(parseInt($("#fans").html()) - 1); //数量-1
            $("#btnunFocus").unbind();
            $("#btnunFocus").attr("id", "btnFocus");
            $("#btnFocus").on("click", function() {
              $("#btnFocus").bind("click", FocusUser());
            });
          } else if (data.status == "fail") {
            $(".toast-body").text(data.result);
            $(".toast").show();
            $(".toast").toast("show");
          }
        }
      });
    }
  },
  created: function() {
    this.GetUserDetailsInfo();
  }
};
</script>