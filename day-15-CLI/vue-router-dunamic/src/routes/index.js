import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../components/Home";
import About from "../components/About";
// 引入嵌套路由的模板
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
  {
    // 根据不同的id 显示不同的内容 你可以在组件中通过props属性获取id的值
    path: "/about/:id",
    component: About,
    props: router => ({ id: router.params.id, name: "张三" })
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
