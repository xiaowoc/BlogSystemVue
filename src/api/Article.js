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
  async getMoreCategories(userId) {
    return (await this.get("/Article/getMoreCategories?userId=" + userId + ""))
      .data;
  }
  //获取分类列表必要内容
  async CategoryList(userId) {
    return (await this.get("/Article/GetCategoryList?userId=" + userId + ""))
      .data;
  }
  //删除分类
  async DeleteCategory(Id) {
    const data = new FormData();
    data.append("Id", Id);
    return (await this.post("/Article/DeleteCategory", data)).data;
  }
}
