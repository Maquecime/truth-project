import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App).use(store);

app.use(router);
app.use(Antd);

app.mount("#app");
