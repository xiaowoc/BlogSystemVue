import BaseHttp from '@/api/BaseHtml';
export default class Article extends BaseHttp {
    constructor() {
        super();
    }
    async GetArticles(returnCount) {
        return (await this.get("/Article/GetArticles?returnCount="+returnCount+"")).data;
    }
}
