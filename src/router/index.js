import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Perfil from "../views/perfil.vue"
import Busqueda from "../views/busqueda.vue"
import DetalleEscuela from "../views/detalleEscuela.vue"

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
        path: "/login",
        name: "login",
        component: Login
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
        if (Vue.getToken() == null) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;