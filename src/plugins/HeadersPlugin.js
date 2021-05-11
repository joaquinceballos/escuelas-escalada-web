const HeadersPlugin = {

    install(Vue) {

        Vue.getHeaders = function(idioma) {
            return {
                Authorization: "Bearer " + Vue.getToken(),
                "Accept-Language": idioma
            };
        }

    }

}

export default HeadersPlugin;