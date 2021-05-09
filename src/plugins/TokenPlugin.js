import VueJwtDecode from "vue-jwt-decode";

let rolAdmin = (roles) => {
    return roles &&
        roles.length > 0 &&
        roles.includes("ROLE_ADMIN")
}

let rolUser = (roles) => {
    return roles &&
        roles.length > 0 &&
        roles.includes("ROLE_USER")
}

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

        Vue.getRoles = function() {
            let token = Vue.getToken();
            if (token == null) {
                return [];
            }
            let decodificado = VueJwtDecode.decode(token)
            return decodificado.roles;
        }

        Vue.rolInvitado = function() {
            let roles = Vue.getRoles();
            return !rolAdmin(roles) && !rolUser(roles);
        }

        Vue.rolAdmin = function() {
            return rolAdmin(Vue.getRoles());
        }

    }

}

export default TokenPlugin;