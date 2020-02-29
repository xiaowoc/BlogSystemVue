import axios from 'axios';
export default class BaseHtml {
    constructor() {
        //拦截器，对提交的请求添加请求头
        axios.interceptors.request.use(function (config) {
            // config.headers = {
            // };
            config.baseURL = "http://localhost:50078";
            return config;

        }, function (error) {
            return Promise.reject(error);
        });       
    }

    get(url) {
        return axios.get(url);
    }

    post(url, data) {
        return axios.post(url, data);
    }

}