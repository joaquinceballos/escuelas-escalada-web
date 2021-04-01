import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Register from "../views/register.vue";
import Perfil from "../views/perfil.vue"
import Busqueda from "../views/busqueda.vue"
import DetalleEscuela from "../views/DetalleEscuela.vue"
import DetalleSector from "../views/DetalleSector.vue"

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
        path: "/register",
        name: "register",
        component: Register
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
        path: "/escuela/:id",
        name: "escuela",
        component: DetalleEscuela,
        meta: {
            requiresAuth: true
        },
        props: true
    },
    {
        path: "/escuela/:idEscuela/sector/:idSector",
        name: "sector",
        component: DetalleSector,
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
            axios.post('https://api-escuelas.ddns.net/login', {
                username: "web_guest",
                password: "12345",
            }).then((response) => {
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