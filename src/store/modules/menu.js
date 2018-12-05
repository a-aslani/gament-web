const state = {
    menu: false
};
const getters = {
    menuState: state => state.menu
};
const mutations = {
    changeMenuStateToShow(state) {
        state.menu = true
    },
    changeMenuStateToHidden(state) {
        state.menu = false
    }
};
const actions = {
    showMenu({commit}) {
        document.body.classList.add('slide-show');
        commit('changeMenuStateToShow')
    },
    closeMenu({commit}) {
        document.body.classList.remove('slide-show');
        commit('changeMenuStateToHidden')
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}