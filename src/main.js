import { createApp } from "vue"
import App from "./App.vue"
import ElementUI from "element-plus"
import Vuex from "vuex"
import "element-plus/dist/index.css"
import "./assets/css/global.css"
import router from "./router/router.js"
import store from "./store"

createApp(App).use(ElementUI).use(Vuex).use(router).use(store).mount("#app")
