import Vue from "vue";
import App from "./App.vue";
import store from "./store/";
import vuetify from "./plugins/vuetify";
// import { ipcMain } from "electron";

Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$state", {
  get(this: Vue) {
    return this.$store.state;
  },
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
