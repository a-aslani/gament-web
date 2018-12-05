let alertTimeout = '';

const state = {
    alert: false,
    alertType: 'primary',
    alertTitle: null,
    alertMessage: null,
};
const getters = {
    alertSate: state => state.alert,
    alertType: state => state.alertType,
    alertTitle: state => state.alertTitle,
    alertMessage: state => state.alertMessage
};
const mutations = {
    changeAlertToHidden(state){
        state.alert = false
    },
    setAlert(state, alert) {
        const timeout = alert.timeout ? alert.timeout : 15000;
        state.alertType = alert.type;
        state.alertTitle = alert.title;
        state.alertMessage = alert.message;
        state.alert = true;
        clearTimeout(alertTimeout);
        alertTimeout = setTimeout(() => {
            state.alert = false
        }, timeout);
    }
};
const actions = {
    hiddenAlert({commit}) {
        commit('changeAlertToHidden')
    },
    setAlert({commit}, alert) {
        commit('setAlert', alert)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}