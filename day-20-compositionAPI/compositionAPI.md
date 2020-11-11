# Composition-API

## 为什么学习composition-API
首先Option API遇到的问题，需要在特定区域（data,methods,watch等）编写相同共功能的代码
```js
export default {
  data() {
    return {

    }
  },
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  },
}
```

## Vue3.x中的Compositions-API
经上所述可以有效的组织我们的代码，函数，让湘桂阿曼德功能的代码更加有序的组织在一起

```txt
1.首先Composition API是根据逻辑相关性组织代码的，这样可以提高代码的可读性和可维护性。

2.这种方式可以更好地重用逻辑代码。比如，在Vue2中如果想重用逻辑代码，可能会发生命名冲突，以及关系不清。

3.在Vue3中，Composition API是可选的，并不是一定要使用这种新方式，也就是说我们依然可以使用以前的结构和用法。

4.可以确定的是Vue3.0是兼容Vue2.x版本的，也就是说我们在日常工作中，可以是Vue3中使用Vue2x的相关语法但是当你真正开始使用Vue3写项目时，你会发现他比Vue2,x方便的多

```

## setup 及 概述
1. setup函数是Vue3中新增的函数,它是我们在编写的组件时,使用Compositions API(组合API)的入口
2. setup函数是处于生命周期函数beforeCreate和Created两个狗子函数之间的函数,也就是说在setup函数中是无法使用data和methods的数据和方法
3. 在setup函数中定义的变量和方法最后都要return出去,否则在模板中无法使用

```txt
1.setup函数是Composition API(组合API)的入口
2.将props作为第一个参数,而不是包含在上下文中
  2.1组件中使用props的场景更多,有时候甚至只是用props
  2.2将props独立出来为第一个参数,可以让typescript对props单独做类型推导,不会和上下文中的其他属性相混淆.这使得setup,render和其他使用了TSX的函数式组建的签名保持一致
3.将context作为第二个参数从原来2.x中this选择性的暴露了一些property
  3.1 attrs
  3.2 slots
  3.3 emit
```
`/components/vSetup`
```vue
<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: "vSetup",
  props: ["msg"],
  setup(props) {
    console.log(props.msg);

    // 传递给 setup 函数的第二个参数是 context。
    // context 是一个普通的 JavaScript 对象，它暴露三个组件的 property：
    // // Attribute (非响应式对象)
    // console.log(context.attrs);
    // // 插槽 (非响应式对象)
    // console.log(context.slots);
    // // 触发事件 (方法)
    // console.log(context.emit);
  }
};
</script>

<style>
</style>

```

### setup函数注意点
1. 由于我们不能在setup函数中使用data和methods,所以vue为了避免哦我们错误的使用,直接将setup函数的this修改成了undefined
2. setup函数只能同步不能异步

## 响应式系统API

### ref
接受一个参数值并返回一个响应式且可改变的ref对象。ref对象拥有一个指向内部值的单一属性.value.
此时需要注意的是，这个参数并不会返回一个值，而是一个响应式对象。而通过return返回的对象中的属性，就都可以在模板中使用了


`components/vRef.vue`
```vue
<template>
  <div @click="changeNum">{{ num }}</div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "vRef",
  // 相当于在data中写数据
  setup() {
    let num = ref(0);
    let str = ref("sdsdsds");
    let bool = ref("true");
    // 定义方法在页面点击触发方法
    function changeNum() {
      num.value = 12321321;
    }
    // 打印时必须使用num.value的形式
    // console.log(num.value);
    // console.log(ref);
    // 导出
    return {
      num,
      str,
      bool,
      changeNum
    };
  }
};
</script>

<style>
</style>
```
`书写时请注意ref的引入和格式`
`声明数据以 let 变量名 = ref(任何简单数据类型)`
`声明方法以 function changeNum(){} 可以使用触发事件的方式改变自己声明的值`
`导出数据以 return {num, str,方法名} 逗号分隔的方式`


### reactive
reactive 基本等价于2.x中的Vue.observable(),返回一个响应式对象，就像2.x中定义在data选项里的数据一样，最终都会被转化成响应式对象 `基于 ES2015的Proxy 实现`

此时需要注意的是买这个参数并不会返回一个值，而是一个响应式对象。通过return 返回的对象中的属性，就都可以在模板中使用了
`注意：reactive参数必须是对象，否则无法实现响应式`

`/components/vReactive.vue`
```vue
<template>
  <div @click="setName">{{ obj.name }}{{ arr[0] }}</div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    let obj = reactive({
      name: "康康"
    });
    let arr = reactive([1, 2, 3]);
    function setName() {
      obj.name = "我草你大爷的，你点谁呢";
      arr[0] = 2;
    }
    return {
      obj,
      arr,
      setName
    };
  }
};
</script>

<style></style>
```
`注意声明复杂数据类型——数组和对象的时候一定要使用reactive 声明 let obj = reactive({name: 'sdsds'}), 而且一定要导出`


## readonly 
`/components/vReadonly.vue`
```vue
<template>
  <div @click="editObj">{{original.name}}{{copy.name}}</div>
</template>

<script>
// 导入reactive, readonly, watchEffect 三种方法
import { reactive, readonly, watchEffect } from "vue";
export default {
  setup() {
    const original = reactive({ name: "康康" });
    const copy = readonly(original);
    // 在响应式变化的时候跟踪数据，并在数据变化的时候就运行一次
    watchEffect(() => {
      console.log(copy);
    });
    function editObj() {
      // original.name = 1
      copy.name = 1
    }
    return {
      original,
      copy,
      editObj
    };
  }
};
</script>

<style>
</style>
```
`只能读不能修改值但是会报错`

## computed
传入一个拥有get和set函数的对象，创建一个可手动修改的计算属性
`/components/vComputed.vue`
```txt
计算顺序 如果set中没有设置关于依赖属性的值 那么只会吧get中的值给计算，如果在set中也进行了运算那么会先把get中的运算完毕之后再运行set中的运算
```
`computed中的get必须给它return出来一个值` 
```vue
<template>
  <div>
    <p @click="changeNum">{{ newNum }}</p>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "vComputed",
  setup() {
    let num = ref(1);
    let newNum = computed({
      // 获取值
      get: () => {
        return num.value + 1;
      },
      // 设置值 只要newNum的值改变就会触发set中的值
      set: val => {
        num.value = val + 1;
        console.log(num.value);
      }
    });
    function changeNum() {
      newNum.value = 8;
    }

    return {
      newNum,
      changeNum
    };
  }
};
/*
  计算顺序 如果set中没有设置关于依赖属性的值 那么只会吧get中的值给计算，如果在set中也进行了运算那么会先把get中的运算完毕之后再运行set中的运算
*/
</script>

<style>
</style>



```

## watchEffect
`/components/vWatchEffect.vue`
`会在开始的时候执行一次，并在监听的值改变的时候再次执行`
```vue
<template>
  <div>
    <p>{{state.count}}</p>
    <button @click="stop">手动监听器</button>
  </div>
</template>

<script>
import { reactive, watchEffect } from "vue";
export default {
  name: "vWatchEffect",
  setup() {
    let state = reactive({
      count: 0
    });

    setInterval(() => {
        state.count++
    }, 500);

    // 1.setip只和组件有关系，组件销毁 watchEffect也销毁
    // 2.watchEffect也是一个方法 它有一个返回值是一个方法可以停止跟踪依赖的变化
    let stop = watchEffect(() => {console.log(`跟踪变化+${state.count}`);})
    return {
      state,
      stop
    }
  }
};
</script>

<style>
</style>
```

## watch

```txt
对比watchEffect，watch有以下优点：
1.懒加载监听属性，也就是说仅在侦听的源变更时才执行回调
2.访问侦听状态变化前后的值
```

```vue
<template>
  <div>
    <p>state.count</p>
  </div>
</template>

<script>
import { reactive, watch, watchEffect } from "vue";
export default {
  name: "vWatch",
  setup() {
    let state = reactive({
      count: 0
    });

    setInterval(() => {
      state.count++;
    }, 500);

    // watch(监听哪个属性，代码体) 只有当监听的值变化之后才能执行 它也会有一个返回值 用来停止监听 let stop = watch(...,...)
    // 只能监听state，因为它是对象，当内部改变也能检测得到
    watch(state, () => {
      console.log(state.count);
    });
    return {
      state
    };
  }
};
</script>

<style>
</style>
```

## vLifecycle 声明周期

```vue
<template>
  <div @click="handleNum">{{ num }}</div>
</template>

<script>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from "vue";
export default {
  name: "vLifecycle",
  setup() {
    let num = ref(0);
    let handleNum = function() {
      num.value = 5;
    };

    onBeforeMount(() => {
      console.log("我在挂载前");
    });

    onMounted(() => {
      console.log("我在挂载后");
    });

    // 数据更新前
    onBeforeUpdate(() => {
      console.log("更新前");
    });

    // 数据更新后
    onUpdated(() => {
      console.log("更新后");
    });

    return {
      num,
      handleNum
    };
  }
};
</script>

<style>
</style>
```