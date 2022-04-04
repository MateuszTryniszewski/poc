import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    user: null,
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    toogleDrawer(state) {
      state.drawer = !state.drawer;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  modules: {
  },
});
