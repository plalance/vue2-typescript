import {Vue} from 'vue-property-decorator'
import 'es6-promise/auto';
import { RouterOptions, Location, RouteConfig, Route } from "vue-router";
import VueRouter from "vue-router";
declare var require: any;

import M from './Libraries/materialize.js';
(<any>window).M = M;

import App from './App.vue'
import store from './Store'
import router from "./Router";


Vue.config.devtools = true; //enable debug for build

new Vue({
    el: document.querySelector('#app') as Element,
    store,
    router: router,
    components: {App},
    render(h) {
        return h('App', {attrs: {start: 100}})
    }
});