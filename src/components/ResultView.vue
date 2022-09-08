<template>
  <div>
    <h3>{{ fullName }}</h3>
    <p>Testing</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ResultView",

  setup() {
    const store = useStore();
    let fullName = computed(function () {
      return store.state.fullName;
    });

    return {
      fullName,
    };
  },
};
</script>

<style scoped></style>
