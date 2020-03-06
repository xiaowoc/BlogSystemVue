import BaseHttp from "@/api/BaseHtml";
export default class Article extends BaseHttp {
  constructor() {
    super();
  }
  //获取随机文章
  async GetArticles(returnCount) {
    return (
      await this.get("/Article/GetArticles?returnCount=" + returnCount + "")
    ).data;
  }
  //获取所有分类
  async GetMoreCategories(userId) {
    return (await this.get("/Article/GetMoreCategories?userId=" + userId + ""))
      .data;
  }
  //获取分类列表必要内容
  async CategoryList(userId, pageIndex, pageSize) {
    return (
      await this.get(
        "/Article/GetCategoryList?userId=" +
          userId +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          ""
      )
    ).data;
  }
  //删除分类
  async DeleteCategory(Id) {
    const data = new FormData();
    data.append("Id", Id);
    return (await this.post("/Article/DeleteCategory", data)).data;
  }
  //编辑分类
  async EditCategory(categoryId, newCategoryName) {
    const data = new FormData();
    data.append("categoryId", categoryId);
    data.append("newCategoryName", newCategoryName);
    return (await this.post("/Article/EditCategory", data)).data;
  }
  //获取文章列表必要内容
  async ArticleList(userId, categoryId, pageIndex, pageSize) {
    return (
      await this.get(
        "/Article/GetArticleList?userId=" +
          userId +
          "&categoryId=" +
          categoryId +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          ""
      )
    ).data;
  }
  //删除文章
  async DeleteArticle(Id) {
    const data = new FormData();
    data.append("Id", Id);
    return (await this.post("/Article/DeleteArticle", data)).data;
  }
  //获取新建文章必要数据
  async GetCreateArticle() {
    return (await this.get("/Article/GetCreateArticle")).data;
  }
  //添加文章
  async AddArticle(title, content, introContent, categoryIds) {
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("introContent", introContent);
    if (categoryIds != null) {
      for (let index = 0; index < categoryIds.length; index++) {
        data.append("categoryIds[]", categoryIds[index]);
      }
    }
    return (await this.post("/Article/AddArticle", data)).data;
  }
  //获取编辑文章必要数据
  async GetEditArticle(id) {
    return (await this.get("/Article/GetEditArticle?id=" + id + "")).data;
  }
  //编辑文章
  async EditArticle(articleId, title, content, introContent, categoryIds) {
    const data = new FormData();
    data.append("articleId", articleId);
    data.append("title", title);
    data.append("content", content);
    data.append("introContent", introContent);
    if (categoryIds != null) {
      for (let index = 0; index < categoryIds.length; index++) {
        data.append("categoryIds[]", categoryIds[index]);
      }
    }
    return (await this.post("/Article/EditArticle", data)).data;
  }
  //获取文章详情页必要信息
  async GetArticleDetails(id) {
    return (await this.get("/Article/GetArticleDetails?id=" + id + "")).data;
  }
  //点赞
  async GoodCount(id) {
    const data = new FormData();
    data.append("id", id);
    return (await this.post("/Article/GoodCount", data)).data;
  }
  //点踩
  async BadCount(id) {
    const data = new FormData();
    data.append("id", id);
    return (await this.post("/Article/BadCount", data)).data;
  }
  //获取评论必要数据
  async GetComments(id, pageIndex, pageSize) {
    return (
      await this.get(
        "/Article/GetComments?id=" +
          id +
          "&pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          ""
      )
    ).data;
  }
  //添加评论
  async AddComment(Id, Content) {
    const data = new FormData();
    data.append("Id", Id);
    data.append("Content", Content);
    return (await this.post("/Article/AddComment", data)).data;
  }
  //查询点赞或者点踩状态
  async GetLikeHate(id) {
    return (await this.get("/Article/GetLikeHate?id=" + id + "")).data;
  }
  //添加分类
  async AddCategory(categoryName) {
    const data = new FormData();
    data.append("categoryName", categoryName);
    return (await this.post("/Article/AddCategory", data)).data;
  }
}
