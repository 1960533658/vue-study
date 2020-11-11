<template>
  <div>
    <h2>我是about组件</h2>
    <p>获取带的ID：{{ id }},我的名字叫{{ name }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["id", "name"]
};
</script>

<style></style>
