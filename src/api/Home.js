import BaseHttp from "@/api/BaseHtml";
export default class Home extends BaseHttp {
  constructor() {
    super();
  }

  // 获取首页数据
  async GetIndex() {
    return (await this.get("Home/GetIndex")).data;
  }

  // 获取用户详情数据
  async GetUserDetails(id) {
    return (await this.get("Home/GetUserDetails?id=" + id + "")).data;
  }

  // 修改用户密码
  async ChangePassword(oldPwd, newPwd, confirmNewPwd) {
    const data = new FormData();
    data.append("oldPwd", oldPwd);
    data.append("newPwd", newPwd);
    data.append("confirmNewPwd", confirmNewPwd);
    return (await this.post("Home/ChangePassword", data)).data;
  }

  // 修改昵称
  async ChangeNickName(nickName) {
    const data = new FormData();
    data.append("nickName", nickName);
    return (await this.post("Home/ChangeNickName", data)).data;
  }

  // 修改头像
  async ChangeImage(file, config) {
    return (await this.post("Home/ChangeImage", file, config)).data;
  }

  // 关注功能
  async FocusUser(focusUserId) {
    const data = new FormData();
    data.append("focusUserId", focusUserId);
    return (await this.post("Home/FocusUser", data)).data;
  }

  // 取消关注功能
  async UnFocusUser(focusUserId) {
    const data = new FormData();
    data.append("focusUserId", focusUserId);
    return (await this.post("Home/UnFocusUser", data)).data;
  }

  // 登陆功能
  async Login(email, password, rememberMe) {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("rememberMe", rememberMe);
    return (await this.post("Home/Login", data)).data;
  }

  //注册功能
  async Register(email, password, confirmPassword) {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    return (await this.post("Home/Register", data)).data;
  }

  //搜索功能
  async Search(searchWord, searchType, pageIndex, pageSize) {
    return (
      await this.get(
        "Home/GetSearch?searchWord=" +
          searchWord +
          "&searchType=" +
          searchType +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          ""
      )
    ).data;
  }

  //注销功能
  async Logout() {
    return (await this.post("Home/Logout")).data;
  }

  //忘记密码
  async ForgetPassword(email) {
    const data = new FormData();
    data.append("email", email);
    return (await this.post("Home/PostForgetPassword", data)).data;
  }

  //重置密码
  async ResetPassword(token, password, confirmPassword) {
    const data = new FormData();
    data.append("token", token);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    return (await this.post("Home/PostResetPassword", data)).data;
  }

  //查看邮箱账号是否被使用
  async IsEmailInUse(email) {
    return (await this.get("Home/IsEmailInUse?email=" + email + "")).data;
  }
}
