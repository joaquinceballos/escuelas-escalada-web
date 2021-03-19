import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMountain, faSpinner, faSearch, faUser, faLanguage } from '@fortawesome/free-solid-svg-icons';
import TokenPlugin from "./plugins/TokenPlugin.js";

const base = axios.create({
    baseURL: "https://api-escuelas.ddns.net" // replace on production env
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert);

Vue.prototype.$http = base;

Vue.use(TokenPlugin);

library.add(faSpinner, faMountain, faSearch, faUser, faLanguage);
Vue.component('icons', FontAwesomeIcon);

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount("#app");