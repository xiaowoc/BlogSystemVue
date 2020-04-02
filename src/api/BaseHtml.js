import axios from "axios";
import router from "@/router/index";
import store from "@/store/index";
export default class BaseHtml {
  constructor() {
    // 拦截器，对提交的请求添加请求头
    axios.interceptors.request.use(
      function(config) {
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        };
        // 配置连接的获取的api地址
        config.baseURL = "https://www.xiaowoc.cn"; //http://localhost:50078
        config.withCredentials = true;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      }
    );
    // 拦截器，对响应的内容做处理
    axios.interceptors.response.use(
      response => {
        //自定义错误代码不为空
        if (response.data.code != undefined || response.data.code != null) {
          //获取到后台自定义错误代码，401为未登录
          if (response.data.code === 401) {
            router.push({
              path: "/Login",
              query: { redirect: router.history.current.fullPath }
            });
            //如果需要可以在这里将 vuex 里的 user 改为空对象
            store.commit("SetUserId", "");
            //显示错误信息
            return Promise.reject(response.data);
          }
        }
        return response;
      },
      error => {
        //显示错误信息;
        return Promise.reject(error);
      }
    );
  }

  get(url) {
    return axios.get(url);
  }

  post(url) {
    return axios.post(url);
  }

  post(url, data) {
    return axios.post(url, data);
  }

  post(url, data, config) {
    return axios.post(url, data, config);
  }
}
