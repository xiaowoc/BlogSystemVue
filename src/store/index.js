import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/api/Home'
import Article from '@/api/Article'

Vue.use(Vuex)

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
        //获取首页随机文章
        async GetArticles(state, { returnCount }) {
            let article = new Article();
            return await article.GetArticles(returnCount);
        },
        //获取首页必要数据
        async GetIndex() {
            let home = new Home();
            return await home.GetIndex();
        },
        //获取用户详情
        async GetUserDetails(state, { id }) {
            let home = new Home();
            return await home.GetUserDetails(id);
        },
        //修改用户密码
        async ChangePassword(state, { oldPwd, newPwd, confirmNewPwd }) {
            let home = new Home();
            return await home.ChangePassword(oldPwd, newPwd, confirmNewPwd);
        },
        //修改昵称
        async ChangeNickName(state, { nickName }) {
            let home = new Home();
            return await home.ChangeNickName(nickName);
        },
        //修改头像
        async ChangeImage(state, { file }, config) {
            let home = new Home();
            return await home.ChangeImage(file, config);
        },
        //获取所有分类
        async getMoreCategories(state, { userId }) {
            console.log(userId);
            let article = new Article();
            return await article.getMoreCategories(userId);
        }
        // async addStudent(state, { name, age, sex }) {
        //     let stu = new Home();
        //     return await stu.addStudent(name, age, sex);
        // },
        // async getAllStudent() {
        //     let stu = new Home();
        //     return await stu.getStudents();
        // },
        // async getAgeGt20Student() {
        //     let stu = new Home();
        //     return await stu.getAgeGt20();
        // }
    },
    modules: {
    }
})
