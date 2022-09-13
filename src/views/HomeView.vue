<script setup>
import ResultView from "../components/ResultView.vue";
import ActionsView from "../components/ActionsView.vue";
</script>

<template>
  <a-layout id="main-layout">
    <a-layout-header></a-layout-header>
    <a-layout>
      <a-layout-sider light>
        <ActionsView />
      </a-layout-sider>
      <a-layout-content>
        <ResultView/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#main-layout .ant-layout-header, .ant-layout-sider, .ant-layout-footer {
  background: white !important;
  height: 100%;
}

.ant-layout {
  background: white;
}

#main-layout .ant-layout-footer {
  line-height: 1.5;
}

#main-layout > .code-box-demo > .ant-layout + .ant-layout {
  margin-top: 48px;
}
</style>