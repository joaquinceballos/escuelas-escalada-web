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

    }

}

export default TokenPlugin;