<template>
  <!-- setup -->
  <!-- <vSetup msg="你好"></vSetup> -->

  <!-- ref -->
  <!-- <vRef></vRef> -->

  <!-- reactive -->
  <!-- <vReactive></vReactive> -->

  <!-- computed -->
  <vComputed></vComputed>

  <!-- readonly -->
  <!-- <vReadonly></vReadonly> -->

  <!-- watch -->
  <!-- <vWatch></vWatch> -->
</template>

<script>
// setup函数
// import vSetup from "@/components/vSetup.vue";

// ref函数
// import vRef from "@/components/vRef.vue";

// reactive函数
// import vReactive from "@/components/vReactive.vue";

// computed函数
import vComputed from "@/components/vComputed.vue";

// readonly函数
// import vReadonly from "@/components/vReadonly.vue";

// watchEffect函数
// import vWatchEffect from "@/components/vWatchEffect.vue";

// watch函数
// import vWatch from "@/components/vWatch.vue";
export default {
  name: "App",
  components: {
    // vSetup,
    // vRef
    // vReactive
    vComputed
    // vReadonly,
    // vWatchEffect,
    // vWatch
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
</style>
