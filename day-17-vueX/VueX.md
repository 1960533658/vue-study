# Vue x 概述

## 为什么要学VueX
父传子：父元素零aind属性绑定数据，子元素通过使用props接受父元素传递的数据
子传父：父元素v-on事件绑定，子元素使用$emit并通过函数把值传递给父元素
兄弟传值： EventBus（mitt）

## VueX 简介
Vuex是实现组件全局状态（数据）管理的一种机制，可以方便实现组件之间的胡数据共享
好处：
  1.能够在Vuex中集中管理共享的数据，便于开发和后期进行维护
  2.能够高效的数显组件之间的数据共享，提高开发效率
  3.存储在Vuex中的数据是响应式的，但数据发生改变时，页面俺得数据也能会同步更新
`不是所有的数据中都应该放入Vuex中 只有当数据是共享的才应该放入 私有数据应该存储在data中`
## VueX的基本使用

### 安装
```shell
vue create vuex-simple
npm insatll vuex@next --save
```
`在src文件夹中新建文件夹store/indexjs`
```js
// 引入 vuex
import {createStore} from "vuex";

// 配置
let store = createStore({
  // 存数据的
  state() {
    return {

    }
  },
  // 存方法的（同步方法 与步方法）
  mutations: {},
  // 异步方法
  actions: {},
  // 存computed
  getters: {}
})
export default store;
```
`挂载创建好的vuex main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
createApp(App).use(store).mount("#app");
```

## vueX核心概念——state vue-state
`页面 HelloWorld.vue`
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>我你{{ name }}，今年{{ age }}岁了</p>
  </div>
</template>

<script>
// 如果想要直接获取state中的数据 不想使用this.state.state的方式获取数据 你们就是引入vuex {}中的参数是mapState 再下面中的computed中使用 ...mapState(["属性名","..."])的方式接受值
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    // name() {
    //   // 通过创建store实例可以使用$store获取到其中state中的共享数据
    //   return this.$store.state.name;
    // },
    // age() {
    //   return this.$store.state.age;
    // }
    ...mapState(["name","age"])
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

`index.js`
```js
import { createStore } from "vuex"
// 导出vuex实例
export default createStore({
  state() {
    return {
      "康哥",
      age: 20
    }
  },
  // mutations 用于修改state中的数据
  mutations:{},
  // actions 用户处理异步操作
  actions: {},
  // getters类似于 computed计算属性 畜栏里加工形成的新数据
  getters:{}
})
```
### 页面效果

![1603848343760](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603848343760.png)

## vueX核心概念-mutations
`vuex中的mutations主要的用途是修改state中的共享数据`

### vueX核心概念-mutations(不传参&不传参) vue-mutation
`store/index.js`
```js
import { createStore } from "vuex";
export default createStore({
  state() {
    return {
      name: "我是你爹"
    }
  },
  mutations: {
    changeName() {
      state.name = "我真的是你爹"
    }
  },
  actions: {},
  getters: {}
})
```

`helloWorld.vue`
```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ name }}</h2>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "helloWord",
  props: {
    msg: string
  },
  methods: {
    handleChange() {
      this.$store.commit(["changeName"])
    }
  },
  computed() {
    ...mapState(["name"])
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
`书写步骤`
```txt
1.下载并再store/index.js导入vuex组件
import { createStore } from "vuex"

2.创建create实例并导出
export default createStore({
  state() {
    retrun {
      name:"我是你爹"
    }
  },
  mutations:{
    changeName(state) {
      state.name = "我真是你爹"
    },
    changeName2(state, helloname) {
      state.name = helloname
    }
  },
  actions: {},
  getters: {}
})

3.在 main.js 中把vuex挂载到app中
import { creatApp } from "vue";
import app from "./App.vue";
<!-- 挂载vuex实例 -->
import store from "./route"
createApp(app).use(store).mount("#app")

4.在需要用到数据的组件 比如HelloWord.vue中设置点击事件方便观测到值的变化，在组件中的方法中的代码体中使用this.$store.commit("")的方式触发index.js的改变state数据的方法
<template>
  <div class="hello">
    <h1 @click="handleChange">{{ msg }}</h1>
    <h2 @click="handleName">{{ name }},</h2>
  </div>
</template>

<script>
import default {
  name: "HelloWorld",
  props: {
    msg: String,
    name: "自己的名字"
  },
  methods: {
    handleChange() {
      this.$store.commit("changeName")
    },
    handleName() {
      let mainname = this.name
      this.$store.commit("changeName2",mainname)
    }
  },
  computed: {
    ...mapState(["name"])
  }
}
</script>
<style scoped>
</style>

5.如果想要传参 就在组件中的方法中传递（依然还是通过方法参数传递）
组件内书写：
事件() {
  this.$store.commit("index中的方法名",要传递的参数)
}
index内书写
方法名(state,接收的参数的形参) {
  state.要修改的数据名 = "传递的参数"
}

6.上述的方式还是有些麻烦，让人想起了父子传参。那么我们可以使用更简单的方式进行数据之间的传递和值的共享
在组件中（依然使用上述的文件夹和文件）
<h3 @click="changeName">第三种改变的方法不传参</h3>
<h3 @click="changeNum(mine)">第三种改变的方法传参</h3>
写在组件方法中
methods:{
  // changeName是不传参 changeNum是传参
  ...mapmutations(["changeName","changeNum"])
}
```

## vuex核心概念-getters（计算属性）
`一定要在main.js中导入写好的store`

### HelloWord.vue
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="add">点击</button>
    <!-- <p>{{resultAdd}}</p> -->
    <p>{{ clickAdd1 }}</p>
  </div>
</template>

<script>
import { /*mapGetters, */ mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    ...mapMutations(["add"])
  },
  computed: {
    // ...mapGetters(["resultAdd"])
    clickAdd1() {
      return this.$store.getters.resultAdd;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```

### index.js
```js
import { createStore } from "vuex";
export default createStore({
  state() {
    return {
      num: 0
    }
  },
  mutations: {
    add(state) {
      console.log();
      state.num++;
    }
  },
  actions: {},
  // Getter 用于对Store中的数据进行加工处理形成新的数据类似于的计算属性
  getters: {
    resultAdd(state) {
      return state.num;
    }
  }
})
```
### 写法步骤
`实现效果：`
1. 把共享数据中的数据接收到HelloWorld.vue中
2. 实现每点击一次就实时更新共享数据中的值并显示
```txt
1.1下载创建导入导出vuex
npm insatll vuex@next
1.2在store/index.js文件中创建服务
import {createState} from "vuex";
export default createState({
  state() {
    return {
      num: 0;
    }
  },
  mutations: {},
  actions: {},
  getters: {}
})
1.3在main.js文件中配置导入
import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
createApp(App).use(store).mount('#app')
2.1把数据显示在组件中
2.1.1导出数据(在mutations中导出)
mutations：{
  add(state) {
    state.num++
  }
}
2.1.2接收数据
import {mapMutations} from "vuex";
methods:{
  ...mapmutations(["add"])
}
可以直接使用插值表达式{{num}}使用数据
2.2使用Getter监测数据
2.2.1监测数据
Getters: {
  resultAdd(state) {
    return state.num
  }
}
2.2.2接收显示数据
computed: {
  ...mapGetters(["resultAdd])
}
```
`在上述方法中使用map···的时候index.js中的方法名就是他们所代表的值，可以直接使用{{方法名的方式直接使用值}}`