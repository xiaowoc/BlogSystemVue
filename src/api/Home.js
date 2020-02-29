import BaseHttp from '@/api/BaseHtml';
export default class Home extends BaseHttp {
    constructor() {
        super();
    }
    async GetIndex() {
        return (await this.get("Home/GetIndex")).data;
    }
    // async addStudent(name, age, sex) {
    //     return (await this.post("student", { name, age, sex })).data;
    // }
    // async getStudents() {
    //     return (await this.get("student")).data;
    // }
    // async getAgeGt20() {
    //     return await this.get('student?filter={"where":{"age":{"gt":20}}}');
    // }
}
