import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from "vuex-persist";
import auth from './auth.module'
import general from './general.module'
const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
});
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: auth,
        general: general,
    },
    plugins: [vuexLocal.plugin]
});
