import axios from '../api';

const state = {
    topGames: []
};
const getters = {
    topGames: state => state.topGames,
};
const mutations = {
    setTopGames(state, games) {
        state.topGames = games
    }
};
const actions = {
    fetchTopGames({ commit }) {
        return new Promise((resolve, reject) => {

            axios.get('/v1/games?page=1').then(res => {

                commit('setTopGames', res.data.data.documents);

                resolve()

            }).catch(err => reject(err))
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}