import BaseHttp from "@/api/BaseHtml";
export default class Article extends BaseHttp {
  constructor() {
    super();
  }

  async GetArticles(returnCount) {
    return (
      await this.get("/Article/GetArticles?returnCount=" + returnCount + "")
    ).data;
  }

  async getMoreCategories(userId) {
    return (await this.get("/Article/getMoreCategories?userId=" + userId + ""))
      .data;
  }
}
