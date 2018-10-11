import Vue from 'vue'
import App from './App'
import store from './Store'

new Vue({
    el: document.querySelector('#app') as Element,
    components: {App},
    store: store,
    render(h) {
        return h('App', {attrs: {start: 100}})
    }
});