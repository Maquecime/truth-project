<template>
<div>
  <h3 >{{userName}}</h3>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ResultView",

  setup() {
    const store = useStore();
    let userName = computed(function () {
      return store.state.userName;
    });

    return {
      userName,
    };
  },
};
</script>

<style scoped>
</style>
