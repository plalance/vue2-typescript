/** Vue + Vuex **/
import Vue from 'vue';
import Vuex, {Module} from 'vuex'

/** Modules **/
import counter from './modules/counter';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    modules: {
        counter
    }
});

export default store;