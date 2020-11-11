# router项目

## 准备项目所需
`正常下载项目 主要足以在第三次选择时要选中router项 只有要输入小写的y`
```shell
vue create router-itcast
```
## 项目分析
分为三个模块 `头部模块`  `内容模块` `底部模块`
其中`头部模块`   `底部模块` 是不变的， `内容模块`又分为左和右两部分

## 基础配置
`配置style和头部 App.vue`
```js
<template>
  <div>
    <!-- 头部 -->
    <header class="header">后台管理系统</header>
    <!-- 内容 -->
    <main class="main">
      <aside class="content left">
        <ul>
          <li><router-link to="/users">用户管理</router-link></li>
          <li><router-link>权限管理</router-link></li>
          <li><router-link>商品管理</router-link></li>
          <li><router-link>订单管理</router-link></li>
          <li><router-link>系统设置</router-link></li>
        </ul>
      </aside>
      <article class="content right">
        <div>
          <h3>用户管理</h3>
        </div>
      </article>
    </main>
    <!-- 底部 -->
    <footer class="footer">版权信息</footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  margin: 0;
  padding: 0px;
  height: 100%;
}
.header {
  height: 50px;
  background-color: #545c64;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: #fff;
}
.footer {
  height: 40px;
  line-height: 40px;
  background-color: #888;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
}
.main {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 40px;
  width: 100%;
}
.content {
  flex: 1;
  text-align: center;
  height: 100%;
}
.left {
  flex: 0 0 20%;
  background-color: #545c64;
}
.left a {
  display: block;
  height: 100%;
  color: white;
  text-decoration: none;
}
.right {
  margin: 5px;
}
.btns {
  width: 100%;
  height: 35px;
  line-height: 35px;
  background-color: #f5f5f5;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}
button {
  height: 30px;
  background-color: #ecf5ff;
  border: 1px solid lightskyblue;
  font-size: 12px;
  padding: 0 20px;
}
.main-content {
  margin-top: 10px;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul li {
  height: 45px;
  line-height: 45px;
  background-color: #a0a0a0;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #eee;
  line-height: 35px;
  font-size: 12px;
}

th {
  background-color: #ddd;
}
</style>

```

## 显示组件基本内容
`app.vue aside标签和article`
```js
<main class="main">
 <aside class="content left">
   <ul>
    //  写入对应的目录
     <li><router-link to="/users">用户管理</router-link></li>
     <li><router-link to="/rights">权限管理</router-link></li>
     <li><router-link to="/goods">商品管理</router-link></li>
     <li><router-link to="/orders">订单管理</router-link></li>
     <li><router-link to="/settings">系统设置</router-link></li>
   </ul>
 </aside>
 <article class="content right">
   // 让右侧显示相应的内容
   <router-view></router-view>
 </article>
</main>
```
`App.vue 导入所需组件`
```js
import { createRouter, createWebHashHistory } from "vue-router";
import Users from "../components/Users";
const routes = [
  // 重定向
  { path: "/", redirect: "/users" },
  // 懒加载，当鼠标点击之后才会加载相应的模块
  // component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  { path: "/users", component: Users },
  { path: "/rights", component: () => import("../components/Rights.vue") },
  { path: "/goods", component: () => import("../components/Goods.vue") },
  { path: "/orders", component: () => import("../components/Orders.vue") },
  { path: "/settings", component: () => import("../components/Settings.vue") }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
```

`所需要的 对应显示的五个组件`
```js
// 五个组件所需要的内容几乎一致 只有h3标签的文字不太一样
<template>
  <h3>权限管理页面</h3>
</template>

<script>
export default {};
</script>

<style></style>
```

## 显示Users组件的表格
`Users.vue`
```vue
<template>
  <div>
    <h3>用户管理页面</h3>
    <table>
      <thead>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>详情</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id" :data-index="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td><a href="" @click.prevent="handleLink(item.id)">详情</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "张三", age: 10 },
        { id: 2, name: "李四", age: 20 },
        { id: 3, name: "王五", age: 30 },
        { id: 4, name: "赵六", age: 40 }
      ]
    };
  },
  methods: {
    handleLink(id) {
      console.log(id);
      this.$router.push("/userInfo/"+id)
    }

  }
};
</script>

<style></style>
```

## 配置动态路由以显示详情
`index.js`
```js
import { createRouter, createWebHashHistory } from "vue-router";
import Users from "../components/Users";
const routes = [
  { path: "/", redirect: "/users" },
  { path: "/users", component: Users },
  // 制定动态路由匹配规则 并传参
  { path: "/userinfo/:id", component: ()=> import ("../components/UserInfo.vue"), props: true },
  { path: "/rights", component: () => import("../components/Rights.vue") },
  { path: "/goods", component: () => import("../components/Goods.vue") },
  { path: "/orders", component: () => import("../components/Orders.vue") },
  { path: "/settings", component: () => import("../components/Settings.vue") }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
```

`页面内接收传递的数据并将数据显示`
`UserInfo.vue`
```vue
<template>
  <h3>用户详情页面 用户ID是：{{id}}</h3>
</template>

<script>
export default {
  props:["id"]
};
</script>

<style></style>
```

## 回退
`UserInfo.vue`
```vue
<template>
  <div>
    <h3>用户详情页面 用户ID是：{{ id }}</h3>
    <button @click.prevent="handleBack">回退</button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods:{
    handleBack() {
      // back() 等同于 go(-1)
      this.$router.back();
    }
  }
};
</script>

<style></style>
```