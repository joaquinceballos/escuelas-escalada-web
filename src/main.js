import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const base = axios.create({
    baseURL: "http://localhost:8080" // replace on production env
});

import store from "./store/index";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert);

Vue.prototype.$http = base;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");