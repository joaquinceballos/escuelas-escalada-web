const HeadersPlugin = {

    install(Vue) {

        Vue.getHeaders = function(token, idioma) {
            return {
                Authorization: "Bearer " + token,
                "Accept-Language": idioma
            };
        }

    }

}

export default HeadersPlugin;