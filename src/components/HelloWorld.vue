<template>
  <div class="greetings">
    <button type="button" @click="generate" class="btn btn-primary">
      Generate
    </button>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

function generate() {
  return store.dispatch("fetchUserName");
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
