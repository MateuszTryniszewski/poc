export const getters = {
  currentUser(state) {
    return state.user;
  },
  userId(state) {
    return state.user.uid;
  },
};

export const mutations = {
  TOOGLE_DRAWER(state) {
    state.drawer = !state.drawer;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.user = null;
  },
};

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  logoutUser({ commit }) {
    commit('LOGOUT');
  },
};

export const state = {
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
