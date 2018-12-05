import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import games from './modules/games';
import alert from './modules/alert';
import menu from './modules/menu';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        games,
        alert,
        menu,
        user
    },
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
})
