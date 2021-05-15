import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Perfil from "../views/perfil.vue"
import Busqueda from "../views/busqueda.vue"
import DetalleEscuela from "../views/DetalleEscuela.vue"
import DetalleSector from "../views/DetalleSector.vue"
import VistaZonas from "../views/VistaZonas.vue"
import VistaDetalleZona from "../views/VistaDetalleZona.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/perfil/:usuario",
        name: "perfil",
        component: Perfil,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/busqueda/",
        name: "busqueda",
        component: Busqueda,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuelas/:id",
        name: "escuela",
        component: DetalleEscuela,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuelas/:idEscuela/sectores/:idSector",
        name: "sector",
        component: DetalleSector,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuelas/:idEscuela/sectores/:idSector/vias/:idVia",
        redirect: to => {
            return { path: '/escuelas/:idEscuela/sectores/:idSector', query: { idVia: to.params.idVia } }
        }
    },
    {
        path: "/escuelas/:idEscuela/sectores/:idSector/croquis/:idCroquis",
        redirect: to => {
            return { path: '/escuelas/:idEscuela/sectores/:idSector', query: { idCroquis: to.params.idCroquis } }
        }
    },
    {
        path: "/escuelas/:idEscuela/sectores/:idSector/croquis/:idCroquis/via/:idVia",
        redirect: to => {
            return { path: '/escuelas/:idEscuela/sectores/:idSector', query: { idCroquis: to.params.idCroquis } }
        }
    },
    {
        path: "/zonas/",
        name: "zona",
        component: VistaZonas,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/zonas/:id",
        name: "detalleZona",
        component: VistaDetalleZona,
        meta: {
            requiresAuth: true
        },
        props: true
    },
];

const router = new VueRouter({
    mode: "history",
    //base: process.env.VUE_APP_API_ROOT,
    routes
});

const axios = require('axios');

router.beforeEach((to, from, next) => {
    if (to.name === from.name) {
        return next();
    }
    next();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.tokenValido()) {
            // Si no hay un token válido nos logeamos con el usuario genérico
            let baseUrl = process.env.VUE_APP_API_BASE_URL;
            let user = {
                username: process.env.VUE_APP_API_GENERIC_USER,
                password: process.env.VUE_APP_API_GENERIC_PASSWORD,
            };
            console.log(user);
            axios.post(baseUrl + '/login', user).then((response) => {
                Vue.guardaToken(response.data.data.token);
                next({
                    path: "/"
                });
            }).catch((error) => { console.log(error); });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;