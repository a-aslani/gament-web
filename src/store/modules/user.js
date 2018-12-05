import axios from '../api';
import { ERROR, ERROR_TO_FETCH_DATA } from '../../constants/alert-messages';
const state = {
    user: {}
};
const getters = {
    user: state => state.user
};
const mutations = {
    setUser(state, user) {
        state.user = user
    }
};
const actions = {
    fetchUser({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            axios.get('/v1/users/info').then(res => {
                commit('setUser', res.data.data.document);
                resolve(res.data.data)
            }).catch(err => {
                dispatch('setAlert', {
                    type: ERROR,
                    title: ERROR_TO_FETCH_DATA,
                    message: err.response.data.data.error
                });
                reject(err.response)})
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}