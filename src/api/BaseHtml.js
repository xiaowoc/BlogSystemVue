import axios from "axios";
export default class BaseHtml {
  constructor() {
    // 拦截器，对提交的请求添加请求头
    axios.interceptors.request.use(
      function(config) {
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        };
        // 配置连接的获取的api地址
        config.baseURL = "http://localhost:50078";
        config.withCredentials = true;
        return config;
      },
      function(error) {
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
