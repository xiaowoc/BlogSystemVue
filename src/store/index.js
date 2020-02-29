import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/api/Home'
import Article from '@/api/Article'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userName: "admin",
            userPwd: "password"
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getUserName(state) {
            return state.user.userName;
        }
    },
    mutations: {
        changeUserName(state, newUserName) {
            state.user.userName = newUserName;
        }
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
