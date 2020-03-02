import Vue from "vue";
import Vuex from "vuex";
import Home from "@/api/Home";
import Article from "@/api/Article";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // user: {
    //     isLogin:true,
    //     userName: "admin",
    //     userId: "",
    //     userNickName
    // }
  },
  getters: {
    // getUser(state) {
    //     return state.user;
    // },
    // getUserName(state) {
    //     return state.user.userName;
    // }
  },
  mutations: {
    // changeUserName(state, newUserName) {
    //     state.user.userName = newUserName;
    // }
  },
  actions: {
    // 获取首页随机文章
    async GetArticles(state, { returnCount }) {
      const article = new Article();
      return await article.GetArticles(returnCount);
    },
    // 获取首页必要数据
    async GetIndex() {
      const home = new Home();
      return await home.GetIndex();
    },
    // 获取用户详情
    async GetUserDetails(state, { id }) {
      const home = new Home();
      return await home.GetUserDetails(id);
    },
    // 修改用户密码
    async ChangePassword(state, { oldPwd, newPwd, confirmNewPwd }) {
      const home = new Home();
      return await home.ChangePassword(oldPwd, newPwd, confirmNewPwd);
    },
    // 修改昵称
    async ChangeNickName(state, { nickName }) {
      const home = new Home();
      return await home.ChangeNickName(nickName);
    },
    // 修改头像
    async ChangeImage(state, { file }, config) {
      const home = new Home();
      return await home.ChangeImage(file, config);
    },
    // 获取所有分类
    async getMoreCategories(state, { userId }) {
      const article = new Article();
      return await article.getMoreCategories(userId);
    },
    // 关注功能
    async FocusUser(state, { focusUserId }) {
      const home = new Home();
      return await home.FocusUser(focusUserId);
    },
    // 取消关注功能
    async UnFocusUser(state, { focusUserId }) {
      const home = new Home();
      return await home.UnFocusUser(focusUserId);
    },
    // 登陆功能
    async Login(state, { email, password, rememberMe }) {
      const home = new Home();
      return await home.Login(email, password, rememberMe);
    },
    // 注册功能
    async Register(state, { email, password, confirmPassword }) {
      const home = new Home();
      return await home.Register(email, password, confirmPassword);
    },
    // 搜索功能
    async Search(state, { searchWord, searchType }) {
      const home = new Home();
      return await home.Search(searchWord, searchType);
    },
    // 注销功能
    async Logout(state) {
      const home = new Home();
      return await home.Logout();
    }
  },
  modules: {}
});
