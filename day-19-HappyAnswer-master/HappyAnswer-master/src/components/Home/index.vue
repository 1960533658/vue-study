<template>
    <div class="home_container">
      <itemContainer father-component="home"></itemContainer>
    </div>
</template>
<script>
import itemContainer from "../itemContainer/item.vue";
    export default {
       name: 'home',
       components: {
         itemContainer
       },
      created() {

      }
    }
</script>

