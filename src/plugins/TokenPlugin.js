import VueJwtDecode from "vue-jwt-decode";

const TokenPlugin = {

    install(Vue) {

        Vue.borraToken = function() {
            localStorage.removeItem("web-escuelas-user-token");
        }

        Vue.guardaToken = function(token) {
            localStorage.setItem("web-escuelas-user-token", token);
        }

        Vue.getToken = function() {
            return localStorage.getItem("web-escuelas-user-token");
        }

        Vue.tokenValido = function() {
            let token = Vue.getToken();
            if (token == null) {
                return false;
            }
            let decodificado = VueJwtDecode.decode(token);
            return new Date() < new Date(decodificado.exp * 1000);
        }

    }

}

export default TokenPlugin;