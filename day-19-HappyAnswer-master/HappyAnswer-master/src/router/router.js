import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";

// 引入组件
import home from "../components/Home/index.vue";
import item from "../components/Item/index.vue";
import score from '../components/score/index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    component: App,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '',
        component: home
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/item',
        component: item
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/score',
        component: score
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router;