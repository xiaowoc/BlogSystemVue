### 项目名称及简介
1. **项目名称：简易博客(Vue版)**

1. **技术类型：Vue.js、Vuex、Vue-Router、Axios、Element-UI**

1. **示例：[http://vue.xiaowoc.cn](http://vue.xiaowoc.cn "http://vue.xiaowoc.cn")**

1. **相关功能：注册、登陆、创建文章、编辑文章、个人文章列表、创建文章所属分类、个人文章分类列表、修改个人信息、修改密码、密码重置、文章点赞点踩、文章评论、用户关注、自定义错误页面、错误日志记录、搜索**

1. **该项目为前端的衍生版本，需要与[简易博客](https://github.com/xiaowoc/BlogSystem "简易博客")搭配使用。**

### 项目配置指南
**在`BlogSystemVue\src\store\index.js`中设置图片读取的地址**
```javascript
 state: {
    serverHost: "（地址）", //设置后台资源的地址
  }
```
**在`BlogSystemVue\src\api\BaseHtml.js`中配置发送请求的后端Api地址**
```javascript
// 拦截器，对提交的请求添加请求头
    axios.interceptors.request.use(
		...
        config.baseURL = "(地址)";
		...
    );
```
