<template>
  <div>
    <!-- title -->
    <div class="title">{{ uname }}的商品</div>
    <!-- 列表 -->
    <div>
      <div class="item" v-for="item in list" :key="item.id">
        <img v-bind:src="item.img" />
        <div class="name">{{ item.name }}</div>
        <div class="change">
          <a href="">－</a>
          <input type="text" class="num" />
          <a href="">＋</a>
        </div>
        <div class="del">×</div>
      </div>
    </div>
    <!-- 总价 -->
    <div class="total">
      <span>总价：{{ money }}</span>
      <button>结算</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    // #region  获取初始化数据
    let money = ref(0);
    let store = useStore();
    store.dispatch("getData");

    let list = computed(() => {
      return store.state.list;
    });
    getTotal();

    // 名字
    let uname = computed(() => store.state.uname);

    // #endRegion
    // #region  计算价格

    function getTotal() {
      list.value.forEach(item => {
        console.log(item);
        money.value += item.price * item.num;
        console.log(money.value);
      });
    }

    watch(list, () => {
      getTotal();
    });

    // #endRegion
    getTotal();
    return {
      uname,
      list,
      money
    };
  }
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
.cart {
  width: 300px;
  /*background-color: lightgreen;*/
  margin: auto;
}

.title {
  background-color: lightblue;
  height: 40px;
  line-height: 40px;
  text-align: center;
  /*color: #fff;*/
}

.total {
  background-color: #ffce46;
  height: 50px;
  line-height: 50px;
  text-align: right;
}

.total button {
  margin: 0 10px;
  background-color: #dc4c40;
  height: 35px;
  width: 80px;
  border: 0;
}

.total span {
  color: red;
  font-weight: bold;
}

.item {
  height: 55px;
  line-height: 55px;
  position: relative;
  border-top: 1px solid #add8e6;
}

.item img {
  width: 45px;
  height: 45px;
  margin: 5px;
}

.item .name {
  position: absolute;
  width: 90px;
  top: 0;
  left: 55px;
  font-size: 16px;
}

.item .change {
  width: 100px;
  position: absolute;
  top: 0;
  right: 50px;
}
.item .change a {
  font-size: 20px;
  width: 30px;
  text-decoration: none;
  background-color: lightgray;
  vertical-align: middle;
}

.item .change .num {
  width: 40px;
  height: 25px;
}

.item .del {
  position: absolute;
  top: 0;
  right: 0px;
  width: 40px;
  text-align: center;
  font-size: 40px;
  cursor: pointer;
  color: red;
}

.item .del:hover {
  background-color: orange;
}
</style>
