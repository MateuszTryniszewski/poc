// eslint-disable-next-line import/no-cycle
import Api from '../../api';

export default {
  namespaced: true,

  state: {
    categories: [],
  },
  getters: {
  },
  mutations: {
    SET_CATEGORIES(state) {
      state.categories = !state.drawer;
    },
  },
  actions: {
    getCategories({ commit }) {
      const cat = [];
      // const fetch = new Api('categories').getCategories();
      const fetch = new Api('categories').getCollection();
      console.log('getCategories', cat, fetch);
      commit('SET_CATEGORIES', cat);
    },
  },
};
