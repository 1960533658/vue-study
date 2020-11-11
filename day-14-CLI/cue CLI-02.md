# vue CLI 项目 路由(vue Router)

## 什么是Vue CLI 
```text
Vue CLI是一个基于Vue。js进行快速开发的完整系统，俗称Vue脚手架 是一套大众化的前端自动化解决方案，他的核心是webpack，框架是vue。还有相关辅助插件组成。不怕浪费时间自己也可以按照自己的习惯搭一套，如果你有丰富的前端经验，可以构建一条合理的解决方案，不然会疏忽很多细节。
vue-cli的目的不是为了帮你"安装"webpack，而是帮你"配置"好一套可用的webpack，让你不用胚子webpack，专心写业务
```

## 内容
* 路由的基本概念
* Vue Router的基本使用
* Vue Router嵌套路由
* Vue Router都太路由的匹配
* Vue Router编程式导航
* Vue Router命名路由

## 路由的基本概念
```
所谓的单页面应用（SPA）就是 single page application
优点：
  后端不在负责模板渲染、输出页面工作，后端API通用化，即同一套后端程序代码不用修改就可以用于Web界面、手机、平板等多种客户端
缺点：
  首屏加载慢
  不利于SEO
  不适合开发大型项目

后端路由性能行相对于前端路由来说较低，所以，我们接下主要学习的是前端路由
前端路由的基本概念：根据不同的时间老显示不同的页面内容。即时间与函数之间的对应关系
前端路由主要做的事情就是监听时间并分发执行事件处理函数

路由的本质就是一种对应关系，比如我们在url地址中输入我们要访问url地址之后，浏览器要去请求这个url地址对应的资源。那么url地址和真实的资源之间就有一种对应关系，这就是路由
```
## Vue Router的基本使用

### Vue Router介绍
它是一个Vue.js官方提供的路由器管理。是一个功能更加强大的前端路由，推荐使用
Vue Router和Vue.js非常契合，可以一起方便的实现SPA(single page web application,单页应用程序)应用程序的开发
Vue Router依赖于Vue，所以需要先引入Vue，再引入Vue Router
### Vue Router使用步骤
`1.下载`

```shell
npm insatll vue-router@next
```

`2.父组件 App.vue  `

```js
<div class="route">
    <!-- to属性相当于href链接 -->
    <router-link to="/">主页</router-link>
    <router-link to="/about">关于</router-link>
    <!-- 添加路由对应的视图 -->
    <router-view></router-view>
 </div>
```

`3.子组件 Home.vue About`

```js
 <template>
  <div><h2>我是home组件</h2></div>
</template>

<script>
export default {};
</script>

<style></style>

<template>
  <div><h2>我是about组件</h2></div>
</template>

<script>
export default {};
</script>

<style></style>

```

`4.导入、配置、创建、导出 router routes/index.js`

```js
// 导入vue-router
import {createRouter, createWebHashHistory} from "vue-router"
// 导入组件
import Home from "./components/Home";
import About from "./components/About";

// 配置路由规则并创建实例
const routes = [
    {path: "/",component: Home},
    {path: "/about", component: About}
]

// 创建路由
const router = createRouter({
    History: createWebHistory(),
    // 定义好的路由
    routes
})

// 导出路由
export default router
```

`5.将路由挂载到vue实例中 导入使用路由 data`

```js
import { createApp } from "vue";
import App from "./App.vue";

// 导入路由
import routes from "./routes"
const app = createApp(App)

app.use(routes)
app.mount("#app")
```



## Vue Router嵌套路由

## Router都太路由的匹配

## Vue Router编程式导航

## Vue Router命名路由
