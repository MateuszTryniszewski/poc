export const getters = {
  currentUser(state) {
    return state.user;
  },
};

const mutations = {
  toogleDrawer(state) {
    state.drawer = !state.drawer;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = null;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  logout({ commit }) {
    commit('LOGOUT');
  },
};

const state = {
  drawer: true,
  user: null,
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
