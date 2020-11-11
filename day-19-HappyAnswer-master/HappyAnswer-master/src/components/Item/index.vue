<template>
    <div class="home_container">
      <itemContainer father-component="item"></itemContainer>
    </div>
</template>
<script>
import itemContainer from "../itemContainer/item.vue";
export default {
  name: "item",
  components: {
    itemContainer
  },
  created() {}
};
</script>

