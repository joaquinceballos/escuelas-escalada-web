import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSimpleAlert from "vue-simple-alert";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMountain, faSpinner, faSearch, faUser, faLanguage, faInfo, faChevronDown, faExclamationCircle, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import TokenPlugin from "./plugins/TokenPlugin.js";
import x5GMaps from 'x5-gmaps';
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
import PaisesPlugin from "./plugins/PaisesPlugin.js";

const base = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert);

Vue.prototype.$http = base;

Vue.use(TokenPlugin);

Vue.use(x5GMaps, 'AIzaSyD60DFgSQ0wPBr78Jp3wtcWGBEiDQNZoME')

Vue.use(PerfectScrollbar);

Vue.use(PaisesPlugin);

Vue.use(IconsPlugin);

library.add(faSpinner, faMountain, faSearch, faUser, faLanguage, faInfo, faChevronDown, faExclamationCircle, faGlobeEurope);
Vue.component('icons', FontAwesomeIcon);

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount("#app");