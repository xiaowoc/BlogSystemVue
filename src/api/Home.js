import BaseHttp from '@/api/BaseHtml';
export default class Home extends BaseHttp {
    constructor() {
        super();
    }
    //获取首页数据
    async GetIndex() {
        return (await this.get("Home/GetIndex")).data;
    }
    //获取用户详情数据
    async GetUserDetails(id){
        return (await this.get("Home/GetUserDetails?id="+id+"")).data;
    }
    //修改用户密码
    async ChangePassword(oldPwd, newPwd, confirmNewPwd){
        let data=new FormData();
        data.append("oldPwd",oldPwd);
        data.append("newPwd",newPwd);
        data.append("confirmNewPwd",confirmNewPwd);
        return (await this.post("Home/ChangePassword",data)).data;
    }
    //修改昵称
    async ChangeNickName(nickName){
        let data=new FormData();
        data.append("nickName",nickName);
        return (await this.post("Home/ChangeNickName",data)).data;
    }
    //修改头像
    async ChangeImage(file,config){
        return (await this.post("Home/ChangeImage",file,config)).data;
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
