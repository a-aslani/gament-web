import axios from '../api';
import router from '../../router';
import {
    SUCCESS,
    ERROR,
    LOGIN_SUCCESSFULLY_TITLE,
    LOGIN_SUCCESSFULLY_MESSAGE,
    REGISTER_SUCCESSFULLY_TITLE,
    REGISTER_SUCCESSFULLY_MESSAGE,
    REGISTER_ERROR,
    LOG_OUT_SUCCESSFULLY_TITLE,
    LOG_OUT_SUCCESSFULLY_MESSAGE
} from '../../constants/alert-messages';

const state = {
    isActiveLoginSidebar: false,
    phoneKey: null,
    token: localStorage.getItem('token') || '',
    registerToken: ''
};

const getters = {
    loginSidebarState: state => state.isActiveLoginSidebar,
    phoneKey: state => state.phoneKey,
    isLoggedIn: state => !!state.token,
};

const mutations = {
    closeLoginSidebar(state) {
        state.stickyHeader = true;
        state.isActiveLoginSidebar = false;
    },
    showLoginSidebar(state) {
        state.isActiveLoginSidebar = true
    },
    setPhoneKey(state, phoneKey) {
        state.phoneKey = phoneKey
    },
    setToken(state, token) {
        state.token = token;
    },
    setRegisterToken(state, token) {
        state.registerToken = token
    },
    logout(state) {
        localStorage.removeItem('token');
        state.token = ''
    }
};
const actions = {
    closeLoginSidebar({ commit }) {
        document.body.classList.remove('slide-show');
        commit('closeLoginSidebar')
    },
    showLoginSidebar({ commit, getters }) {
        if(!getters.isLoggedIn) {
            document.body.classList.add('slide-show');
            commit('showLoginSidebar')
        }
    },
    fetchPhoneKey({ commit }, phoneNumber) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('phone', phoneNumber);
            axios.post('/v1/phone', formData).then(res => {
                if(res.status === 200 && res.data.state) {
                    commit('setPhoneKey', res.data.data.phone_key);
                    resolve()
                }
            }).catch(err => {
                console.log(err.response);
                reject(err.response)
            })
        })
    },
    sendActiveCode({ commit, state, dispatch }, activeCode) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('code', activeCode);
            axios.post(`/v1/code/${state.phoneKey}`, formData).then(res => {
                if(res.status === 200 && res.data.state) {
                    const token = res.data.data.token;
                    const isNewUser = res.data.data.is_new_user;
                    if(isNewUser) {
                        commit('setRegisterToken', token);
                        resolve(isNewUser)
                    }else {
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('setToken', token);
                        dispatch('setAlert', {
                            type: SUCCESS,
                            title: LOGIN_SUCCESSFULLY_TITLE,
                            message: LOGIN_SUCCESSFULLY_MESSAGE
                        });
                        resolve(isNewUser)
                    }
                }
            }).catch(err => {
                localStorage.removeItem('token');
                reject(err.response)
            })
        })
    },
    insertNewUser({ commit, state, dispatch }, user) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('username', user.username);
            formData.append('name', user.name);
            formData.append('family', user.family);
            formData.append('image', user.image);
            const options = {
                method: 'POST',
                headers: { 'Register': state.registerToken },
                data: formData,
                url: '/v1/users',
            };
            axios(options).then(res => {
                localStorage.setItem('token', res.data.data.token);
                axios.defaults.headers.common['Authorization'] = res.data.data.token;
                commit('setToken', res.data.data.token);
                dispatch('setAlert', {
                    type: SUCCESS,
                    title: REGISTER_SUCCESSFULLY_TITLE,
                    message: REGISTER_SUCCESSFULLY_MESSAGE
                });
                resolve()
            }).catch(err => {
                localStorage.removeItem('token');
                dispatch('setAlert', {
                    type: ERROR,
                    title: REGISTER_ERROR,
                    message: err.response.data.data.error
                });
                reject(err.response)
            })
        })
    },
    logout({ commit, dispatch }) {
        return new Promise(resolve => {
            dispatch('closeMenu');
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            dispatch('setAlert', {
                type: SUCCESS,
                title: LOG_OUT_SUCCESSFULLY_TITLE,
                message: LOG_OUT_SUCCESSFULLY_MESSAGE
            });
            router.push('/');
            resolve()
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}