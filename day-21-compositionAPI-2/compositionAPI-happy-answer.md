# compositionAPI——happy——answer

## 关于compositionAPI与vuex共同使用须知
1. 想要从vuex中获取数据一定要使用 `import {useStore} from "vuex` 的方式通过创建实例对象的方式获取数据而且要使用变量接收之后使用`let store = useStore()`且一定要有`()` 因为`useStore`是一个方法，此时再使用`store.state.XXX` 、`store.commit("XXX",-XXX-)`、 `store.dispatch("XXX",-XXX-)`方式获取数据以及修改vuex的数据 
2. 如果是在页面中使用已得到的值，那么在导出后可以直接使用，但是如果是要修改自己设置的变量的值的话（`重新赋值时`） 必须使用`value`进行赋值，只是读取自己的数据可以直接使用`无需value`。 但是使用store获取的数据必须使用`value`读写

## 代码
`App.vue`
```vue
<template>
  <div class="todo">
    <!-- 输入框及搜索按钮 -->
    <div class="todo-header">
      <!-- 输入框-->
      <input type="text" placeholder="请输入任务" v-model="task" />
      <!-- 按钮 -->
      <button @click="addTask">添加事项</button>
    </div>
    <!-- 列表 -->
    <ul class="todo-main">
      <li
        v-for="(item, index) in filterList"
        :key="item.id"
        :data-index="index"
      >
        <input
          type="checkbox"
          @change="chengTask(item.id, $event)"
          :checked="item.done"
        />
        <span>{{ item.info }}</span>
        <a href="" @click.prevent="delTask(item.id)">删除</a>
      </li>
    </ul>
    <!-- 底部菜单 -->
    <div class="todo-footer">
      <p>{{ count }}条剩余</p>
      <div class="todo-footer-button">
        <button
          @click="handleTask('all')"
          :class="viewKey == 'all' ? 'primary' : ''"
        >
          全&nbsp;&nbsp;部
        </button>
        <button
          @click="handleTask('undone')"
          :class="viewKey == 'undone' ? 'primary' : ''"
        >
          未完成
        </button>
        <button
          @click="handleTask('done')"
          :class="viewKey == 'done' ? 'primary' : ''"
        >
          已完成
        </button>
      </div>
      <a href="" @click.prevent="cleanTask">清除已完成</a>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    // 获取页面中的提交内容
    let task = ref("");

    // #region  初始化获取数据
    let store = useStore();
    store.dispatch("getData");
    let filterList = computed(() => store.getters.filterList);
    // #endRegion

    // 获取viewKey的值
    let viewKey = store.state.viewKey;

    // #region  未完成的个数
    let count = computed(() => store.getters.count);
    // #endRegion

    // #region  添加数据
    function addTask() {
      // 注意使用value，如果不使用value的话之前所有提交过的任务都会和你现在正在输入的内容一样
      store.commit("addData", task.value);
    }
    // #endRegion

    // #region  删除数据
    function delTask(id) {
      store.commit("delData", id);
    }
    // #endRegion

    // #region  选中设定任务是否完成
    function chengTask(id, event) {
      store.commit("chengData", {
        id: id,
        done: event.target.checked
      });
    }
    // #endRegion

    // #region  清除所选任务
    function cleanTask() {
      store.commit("cleanData");
    }
    // #endRegion

    // #region  点击查看任务完成进度
    function handleTask(type) {
      console.log(type);
      store.commit("handleData", type);
    }
    // #endRegion

    return {
      filterList,
      task,
      count,
      addTask,
      delTask,
      chengTask,
      cleanTask,
      handleTask,
      viewKey
    };
  }
};
</script>
```

`store/index.js`
```js
import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      list: [],
      viewKey: "all"
    };
  },
  mutations: {
    // #region  更改list的数据让lsit可以实时改变
    initData(state, payload) {
      state.list = payload.data;
    },
    // #endRegion

    // #region  添加一项数据给数据的末尾
    addData(state, payload) {
      state.list.push({
        id: new Date().valueOf,
        info: payload,
        done: false
      });
    },
    // #endRegion

    // #region  删除对应的一项数据
    delData(state, payload) {
      state.list.splice(
        state.list.findIndex(item => item.id == payload),
        1
      );
    },
    // #endRegion

    // #region  改变数据中done的布尔值 用于之后筛选显示和任务区分
    chengData(state, payload) {
      state.list[state.list.findIndex(item => item.id == payload.id)].done =
        payload.done;
      console.log(state.list);
    },
    // #endRegion

    // #region  清除所有勾选的任务
    cleanData(state) {
      state.list = state.list.filter(item => item.done == false);
    },
    // #endRegion

    // #region  设定viewKey的三种值以通过不同的值分类筛选出不同的任务完成度
    handleData(state, payload) {
      state.viewKey = payload;
    }
    // #endRegion
  },
  actions: {
    // #region  初始化数据并触发mutations中的方法更改list的初始值
    async getData(context) {
      let res = await axios.get("./list.json");
      context.commit("initData", res);
    }
    // #endRegion
  },
  getters: {
    count(state) {
      let data = state.list.filter(item => item.done == false);
      console.log(data);
      return data.length;
    },
    // #region  通过不同的值返回不同的数据用以渲染
    filterList(state) {
      if (state.viewKey == "all") {
        return state.list;
      }
      if (state.viewKey == "undone") {
        return state.list.filter(item => item.done == false);
      }
      if (state.viewKey == "done") {
        return state.list.filter(item => item.done == true);
      }
    }
  }
  // #endRegion
});
```
`本文档由康春龙独家赞助`