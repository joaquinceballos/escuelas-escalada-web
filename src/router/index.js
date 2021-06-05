import Vue from "vue";
import VueRouter from "vue-router";
import ViewHome from "../views/ViewHome.vue";
import ViewPerfil from "../views/ViewPerfil.vue"
import ViewBusqueda from "../views/ViewBusqueda.vue"
import ViewDetalleEscuela from "../views/ViewDetalleEscuela.vue"
import ViewDetalleSector from "../views/ViewDetalleSector.vue"
import ViewZonas from "../views/ViewZonas.vue"
import ViewDetalleZona from "../views/ViewDetalleZona.vue";
import ViewNoEncontrado from "../views/ViewNoEncontrado";
import ViewError from "../views/ViewError"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: ViewHome,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/perfil/:usuario",
        name: "perfil",
        component: ViewPerfil,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/busqueda/",
        name: "busqueda",
        component: ViewBusqueda,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuelas/:id",
        name: "escuela",
        component: ViewDetalleEscuela,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuelas/:idEscuela/sectores/:idSector",
        name: "sector",
        component: ViewDetalleSector,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        name: "via",
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
        component: ViewZonas,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/zonas/:id",
        name: "detalleZona",
        component: ViewDetalleZona,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: '/error',
        name: 'error',
        component: ViewError,
        props: true
    },
    {
        path: '*',
        name: "noEncontrado",
        component: ViewNoEncontrado
    }
];

const router = new VueRouter({
    mode: "history",
    //base: process.env.VUE_APP_API_ROOT,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === from.name) {
        return next();
    }
    next();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!Vue.tokenValido()) {
            // Si no hay un token válido nos logeamos con el usuario genérico
            Vue.borraToken();
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;