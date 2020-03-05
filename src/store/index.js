import Vue from "vue";
import Vuex from "vuex";
import Home from "@/api/Home";
import Article from "@/api/Article";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverHost: "http://localhost:50078" //设置后台资源的地址
  },
  getters: {
    getServerHost(state) {
      return state.serverHost;
    }
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
    async GetMoreCategories(state, { userId }) {
      const article = new Article();
      return await article.GetMoreCategories(userId);
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
    },
    // 忘记密码
    async ForgetPassword(state, { email }) {
      const home = new Home();
      return await home.ForgetPassword(email);
    },
    // 重置密码
    async ResetPassword(state, { token, password, confirmPassword }) {
      const home = new Home();
      return await home.ResetPassword(token, password, confirmPassword);
    },
    // 获取分类列表页必要数据
    async CategoryList(state, { userId, pageIndex, pageSize }) {
      const article = new Article();
      return await article.CategoryList(userId, pageIndex, pageSize);
    },
    // 删除分类
    async DeleteCategory(state, { Id }) {
      const article = new Article();
      return await article.DeleteCategory(Id);
    },
    // 编辑分类
    async EditCategory(state, { categoryId, newCategoryName }) {
      const article = new Article();
      return await article.EditCategory(categoryId, newCategoryName);
    },
    // 获取文章列表页必要数据
    async ArticleList(state, { userId, categoryId, pageIndex, pageSize }) {
      const article = new Article();
      return await article.ArticleList(userId, categoryId, pageIndex, pageSize);
    },
    // 删除文章
    async DeleteArticle(state, { Id }) {
      const article = new Article();
      return await article.DeleteArticle(Id);
    },
    // 获取新建文章必要数据
    async GetCreateArticle(state) {
      const article = new Article();
      return await article.GetCreateArticle();
    },
    // 添加文章
    async AddArticle(state, { title, content, introContent, categoryIds }) {
      const article = new Article();
      return await article.AddArticle(
        title,
        content,
        introContent,
        categoryIds
      );
    },
    // 获取编辑文章必要数据
    async GetEditArticle(state, { id }) {
      const article = new Article();
      return await article.GetEditArticle(id);
    },
    // 编辑文章
    async EditArticle(
      state,
      { articleId, title, content, introContent, categoryIds }
    ) {
      const article = new Article();
      return await article.EditArticle(
        articleId,
        title,
        content,
        introContent,
        categoryIds
      );
    },
    // 获取文章详情页必要信息
    async GetArticleDetails(state, { id }) {
      const article = new Article();
      return await article.GetArticleDetails(id);
    },
    // 点赞
    async GoodCount(state, { id }) {
      const article = new Article();
      return await article.GoodCount(id);
    },
    // 点踩
    async BadCount(state, { id }) {
      const article = new Article();
      return await article.BadCount(id);
    },
    // 获取评论必要信息
    async GetComments(state, { id, pageIndex, pageSize }) {
      const article = new Article();
      return await article.GetComments(id, pageIndex, pageSize);
    }
  },
  modules: {}
});
