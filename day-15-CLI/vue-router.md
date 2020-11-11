# vue-touter
`下载vue-router`
```shell
npm install vue-router
```
## 重定向（redirect）

如果路由是某一个路由，那么就不让他进入他想进的路由，让他进入其他路由
`routes/index.js`
```js
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home";
import About from "../components/About";
// 让页面刚进入默认进入首页路由
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  { path: "/about", component: About }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;

```

`main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";
// 导入路由
import routes from "./routes";
const app = createApp(App);

app.use(routes);
app.mount("#app");

```
`App.vue`
```vue
<template>
  <div class="route">
    <router-link to="./">首页</router-link>
    <router-link to="./about">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

`Home.vue About.vue`
```vue
<template>
  <div><h2>我是home/about组件</h2></div>
</template>

<script>
export default {};
</script>

<style></style>

```

## 嵌套路由
`在已有的路由中显示的东西内部再加路由`
`App.vue Home.vue不变 添加同级的org.vue connect.vue用于写关于的模板 让他可以显示出别的东西`

`Org.vue Connect.vue`
```vue
<template>
  <div><h2>公司介绍/关于我们</h2></div>
</template>

<script>
export default {};
</script>

<style>
</style>
```
`About.vue`
```vue
<template>
  <div>
    <h2>我是about组件</h2>
    <router-link to="/org">公司介绍</router-link>
    <router-link to="/connect">联系我们</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
```
`index.js`
```js
// 引入vue-router包
import {createRouter, createWebHashHistory} from "vue-router"
// 引入所需组件 注意组件的文件名大小写要一致
import Home from "../components/Home";
import About from "../components/About";
import Org from "../components/Org";
import Connect from "../components/Connect"

// 设置路由规则并创建路由实例
const routes = [
  { path: "/", componnet: Home },
  // 写入嵌套路由
  { path: "/about", component: About, children: [
    { path: "/org", component: Org },
    { path: "/connect", component: Connect}
  ]}
]

const router = createRouter({
  history: createWebHashHistory
  routes;
})

// 导出路由
export default router;
```

## 动态路由的匹配（传值） vue-dunamci
`通过点击router-link中的标签 然后通过vue中的to属性（/users/123546）之后再通过 嵌套路由中的children属性指向内部组件`

```js
import { createRouter, createWebHasHistoru } from "vue-router"

import Home from "../components/Home";
import About from "../components/About"
const toutes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home},
  { 
    path: "/about:id",
    component: About, 
    props: router => ({id:router.params.id,name: "张三"})
  }
]
```

`对应的组件文件`
```vue
<template>
  <div>
    
  </div>
  <script>
  export default {
    props: ["id","name"]
  }
  </script>
</template>
<template>
  <div class="route">
    <h1>我的id是: {{id}},名字是{{name}}</h1>
  </div>
</template>

<script>
export default {
  name: "App"
  props:["id","name"]
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```vue
