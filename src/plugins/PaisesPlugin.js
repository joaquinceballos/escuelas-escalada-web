import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));

const PaisesPlugin = {

    install(Vue) {

        Vue.getComboPaises = function(idioma) {
            let paises = [];

            let nombres = countries.getNames(idioma, { select: "official", });
            paises.push({ value: null, text: "" });
            Object.keys(nombres).forEach((n) => {
                paises.push({ value: n, text: nombres[n] });
            });

            return paises.sort((a, b) => a.text.localeCompare(b.text));
        }

    }

}

export default PaisesPlugin;