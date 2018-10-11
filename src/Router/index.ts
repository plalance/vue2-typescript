import {Component, Vue} from "vue-property-decorator"
import {RouterOptions, Location, RouteConfig, Route} from 'vue-router'
import VueRouter from 'vue-router'
declare var require: any;

//var separatets = require( '../Views/separatets.vue').default
import Home from '../Pages/home.vue'
import Villes from '../Pages/Villes.vue'
import Contact from '../Pages/Contact.vue'
import ErrorPage from '../Pages/Errors/ErrorPage.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash', base: '', //subdomain
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                title: "Accueil",
                admin: false,
                visible: true,
                accessible: true,
                icon: "dashboard",
                requireAuth: false
            },
            component: Home
        },
        {
            path: "/contact",
            name: "contact",
            meta: {
                title: "Contact",
                admin: false,
                visible: true,
                accessible: true,
                icon: "dashboard",
                requireAuth: false
            },
            component: Contact
        },
        {
            path: "/cities",
            name: "cities",
            meta: {
                title: "Villes",
                admin: false,
                visible: true,
                accessible: true,
                icon: "dashboard",
                requireAuth: false
            },
            component: Villes
        },
        {
            path: "*",
            name: "not_found",
            meta: {
                title: "Page non trouvée",
                admin: false,
                visible: false,
                accessible: true,
                icon: null,
                requireAuth: false
            },
            component: ErrorPage
        }
    ]
});
export default router