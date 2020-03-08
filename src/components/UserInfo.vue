<template>
  <el-card>
    <el-dialog title="更换头像" :visible.sync="AvatarVisible">
      <el-upload
        class="avatar-uploader"
        action="null"
        :show-file-list="false"
        :before-upload="BeforeAvatarUpload"
      >
        <img v-if="imgSrc" :src="imgSrc" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AvatarVisible = false">取 消</el-button>
        <el-button type="primary" @click="AvatarVisible = false;ChangeImageClick()">确 定</el-button>
      </div>
    </el-dialog>
    <div
      class="center"
      style="position:relative;width:88px;height:88px;margin-left:auto;margin-right:auto;"
    >
      <el-avatar
        v-if="userInfo.ImagePath!=undefined "
        :size="88"
        :src="getServerHost+'/Image/' + userInfo.ImagePath"
      ></el-avatar>
      <a
        v-if="isCurrentUser"
        href="javascript:void(0);"
        id="avatarCover"
        :style="avatarCoverStyle"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
        @click="AvatarVisible = true"
        @mouseover="AvatarCoverOnMouseOver"
        @mouseleave="AvatarCoverOnMouseLeave"
      >更换头像</a>
    </div>
    <p style="text-align:center">{{ userInfo.Email }}</p>
    <p v-if="!isCurrentUser" style="text-align:center">{{ userInfo.Nickname }}</p>
    <el-input
      v-if="isCurrentUser"
      id="nickName"
      style="text-align:center"
      v-model="userInfo.Nickname"
      placeholder="编辑昵称"
      maxlength="30"
      @blur="ChangeNickNameBlur"
    ></el-input>
    <div style="text-align:center">
      <span>
        关注
        <span id="focus">{{ userInfo.FocusCount }}</span> 人
      </span>
      <span>
        粉丝
        <span id="fans">{{ userInfo.FansCount }}</span> 人
      </span>
      <el-button
        v-if="isFocused"
        type="text"
        @click="UnFocusUserClick"
        @mouseover="BtnunFocusOnMouseOver"
        @mouseleave="BtnunFocusOnMouseLeave"
      >{{ btnunFocusText }}</el-button>
      <el-button v-else-if="!isFocused" type="text" @click="FocusUserClick">点我关注</el-button>
    </div>
  </el-card>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "UserInfo",
  data: () => ({
    avatarCoverStyle: {
      width: "88px",
      height: "88px",
      left: "0",
      "line-height": "88px",
      opacity: "0",
      position: "absolute",
      "border-radius": "50%",
      "text-align": "center"
    },
    btnunFocusText: "√ 已关注",
    img: [],
    imgSrc: "",
    AvatarVisible: false
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
  computed: {
    ...mapGetters(["getServerHost"])
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
        opacity: "100",
        position: "absolute",
        "border-radius": "50%",
        "text-align": "center"
      };
    },
    AvatarCoverOnMouseLeave() {
      // 头像hover事件（恢复 √ 已关注）
      this.avatarCoverStyle = {
        width: "88px",
        height: "88px",
        left: "0",
        "line-height": "88px",
        opacity: "0",
        position: "absolute",
        "border-radius": "50%",
        "text-align": "center"
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
    },
    BeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      this.img = file;
      // 头像预览生成url
      this.imgSrc = URL.createObjectURL(this.img);
      return false; //屏蔽了action的默认上传
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  text-align: center;
}
.center {
  text-align: center !important;
}
</style>
<style>
#nickName {
  text-align: center;
  border-radius: 4px;
  border: 1px solid transparent;
}
#nickName:hover {
  border: "1px solid green";
}
</style>