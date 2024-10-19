import "@/styles/common.scss";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "@/directives";
import { componentPlugin } from "@/components";

const app = createApp(App);
const pinia = createPinia();

// 确保这行在 app.use(pinia) 之前
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);

app.mount("#app");
