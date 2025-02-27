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
import HeadersPlugin from "./plugins/HeadersPlugin.js";

const customAxios = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
});

customAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status == 404) {
            console.log('No encontrado!!', error.response.status);
            router.push({ name: "noEncontrado" });
        } else if (error.response.status === 403) {
            // vamos a logearnos con el usuario invitado web
            let user = {
                username: process.env.VUE_APP_API_GENERIC_USER,
                password: process.env.VUE_APP_API_GENERIC_PASSWORD,
            };
            customAxios.post('/login', user).then((response) => {
                Vue.guardaToken(response.data.data.token);
                router.push({ name: "home", query: { t: new Date().getTime() }, params: { tokenCaducado: true, homeKey: new Date().getTime() } });
            }).catch((error) => { console.log(error); });

        } else if (error.response.status === 500) {
            router.push({ name: "error", params: { error: error.response.data.message } });
        }
        return Promise.reject(error);
    }
);

Vue.prototype.$http = customAxios;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueSimpleAlert);

Vue.use(TokenPlugin);

Vue.use(x5GMaps, 'AIzaSyD60DFgSQ0wPBr78Jp3wtcWGBEiDQNZoME')

Vue.use(PerfectScrollbar);

Vue.use(PaisesPlugin);

Vue.use(IconsPlugin);

Vue.use(HeadersPlugin);

library.add(faSpinner, faMountain, faSearch, faUser, faLanguage, faInfo, faChevronDown, faExclamationCircle, faGlobeEurope);
Vue.component('icons', FontAwesomeIcon);

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount("#app");