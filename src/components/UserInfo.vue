<template>
  <div>
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
              <svg class="myIcon" style="fill:#c86a95;width:24px;height:24px;">
                <use xlink:href="/IconSvg/data.svg#image" />
              </svg>选择图片
            </div>
            <form enctype="multipart/form-data" id="changeImageForm">
              <input
                type="file"
                name="file"
                id="previewFile"
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

    <div class="position-relative mx-auto my-2" style="width:88px;height:88px;">
      <img
        class="rounded-circle"
        id="img-avatar"
        style="width:88px;height:88px;"
        :src="'/Image/' + userInfo.ImagePath"
      />
      <a
        v-if="isCurrentUser"
        href="javascript:void(0);"
        id="avatarCover"
        class="position-absolute text-decoration-none rounded-circle"
        :style="avatarCoverStyle"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
        @mouseover="AvatarCoverOnMouseOver"
        @mouseleave="AvatarCoverOnMouseLeave"
      >更换头像</a>
    </div>
    <p class="my-2">{{ userInfo.Email }}</p>
    <p v-if="!isCurrentUser" class="my-2">{{ userInfo.Nickname }}</p>
    <input
      v-if="isCurrentUser"
      id="nickName"
      class="w-100 text-center my-2"
      type="text"
      placeholder="编辑昵称"
      v-model="userInfo.Nickname"
      :style="nickNameStyle"
      maxlength="30"
      @mouseover="NickNameOnMouseOver"
      @mouseleave="NickNameOnMouseLeave"
      @blur="ChangeNickNameBlur"
    />
    <span class="badge badge-info">
      关注
      <span id="focus">{{ userInfo.FocusCount }}</span> 人
    </span>
    <span class="badge badge-info">
      粉丝
      <span id="fans">{{ userInfo.FansCount }}</span> 人
    </span>
    <a
      v-if="isFocused"
      href="javascript:void(0);"
      id="btnunFocus"
      class="badge badge-secondary"
      @click="UnFocusUserClick"
      @mouseover="BtnunFocusOnMouseOver"
      @mouseleave="BtnunFocusOnMouseLeave"
    >{{ btnunFocusText }}</a>
    <a
      v-else-if="!isFocused"
      href="javascript:void(0);"
      id="btnFocus"
      class="badge badge-danger"
      @click="FocusUserClick"
    >点我关注</a>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "UserInfo",
  data: () => ({
    avatarCoverStyle: {
      width: "88px",
      height: "88px",
      left: "0",
      "line-height": "88px",
      opacity: "0"
    },
    nickNameStyle: {
      "border-radius": "4px",
      border: "1px solid transparent"
    },
    btnunFocusText: "√ 已关注",
    img: [],
    imgSrc: "",
    imgStyle: {
      display: "none"
    }
  }),
  props: {
    userInfo: {
      Id: String,
      Email: String,
      ImagePath: String,
      Nickname: String,
      FansCount: Number,
      FocusCount: Number
    },
    isCurrentUser: Boolean,
    isFocused: Boolean
  },
  methods: {
    ...mapActions([
      "ChangeNickName",
      "UnFocusUser",
      "FocusUser",
      "ChangeImage"
    ]),
    AvatarCoverOnMouseOver() {
      // 头像hover事件（变成 取消关注）
      this.avatarCoverStyle = {
        width: "88px",
        height: "88px",
        left: "0",
        "line-height": "88px",
        color: "white",
        "background-color": "rgba(0,0,0,.6)",
        opacity: "100"
      };
    },
    AvatarCoverOnMouseLeave() {
      // 头像hover事件（恢复 √ 已关注）
      this.avatarCoverStyle = {
        width: "88px",
        height: "88px",
        left: "0",
        "line-height": "88px",
        opacity: "0"
      };
    },
    NickNameOnMouseOver() {
      // 昵称hover事件（变成 取消关注）
      this.nickNameStyle = {
        border: "1px solid green"
      };
    },
    NickNameOnMouseLeave() {
      // 昵称hover事件（恢复 √ 已关注）
      this.nickNameStyle = {
        "border-radius": "4px",
        border: "1px solid transparent"
      };
    },
    async ChangeNickNameBlur() {
      // 修改昵称
      const data = await this.ChangeNickName({
        nickName: this.userInfo.Nickname
      });
      console.log(data);
      if (data.status == "ok") {
        console.log("ok");
      } else if (data.status == "fail") {
        // 提示框提示回传消息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    BtnunFocusOnMouseOver() {
      // 取消关注hover事件（变成 取消关注）
      this.btnunFocusText = "取消关注";
    },
    BtnunFocusOnMouseLeave() {
      // 取消关注hover事件（恢复 √ 已关注）
      this.btnunFocusText = "√ 已关注";
    },
    async UnFocusUserClick() {
      const data = await this.UnFocusUser({ focusUserId: this.userInfo.Id });
      console.log(data);
      if (data.status == "ok") {
        this.$notify({
          title: "提示",
          message: "取消关注成功！",
          duration: 0,
          type: "success"
        });
        // this.userInfo.FansCount -= 1;
        // this.isFocused = false;
      } else if (data.status == "fail") {
        // 提示错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    },
    async FocusUserClick() {
      const data = await this.FocusUser({ focusUserId: this.userInfo.Id });
      console.log(data);
      if (data.status == "ok") {
        this.$notify({
          title: "提示",
          message: "关注成功！",
          duration: 0,
          type: "success"
        });
        // this.userInfo.FansCount += 1; // 数量+1
        // this.isFocused = true;
      } else if (data.status == "fail") {
        // 返回错误提示
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
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
      //未选择图片无法提交
      if (this.img.length == 0) {
        // 返回错误信息
        this.$notify.error({
          title: "提示",
          message: "尚未选择图片",
          duration: 0
        });
        return false;
      }
      // 修改头像
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
        // this.userInfo.ImagePath = data.path;
      } else if (data.status == "fail") {
        // 返回错误信息
        this.$notify.error({
          title: "提示",
          message: data.result,
          duration: 0
        });
      }
    }
  }
};
</script>