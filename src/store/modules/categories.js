// eslint-disable-next-line import/no-cycle
import Api from '../../api';

export default {
  namespaced: true,

  state: {
    categories: [],
    expensesCategories: [],
    revenuesCategories: [],
  },
  getters: {
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
      categories.forEach((item) => {
        if (item.expenses) state.expensesCategories.push(item);
        if (item.revenues) state.revenuesCategories.push(item);
      });
    },
  },
  actions: {
    async getCategories({ commit }) {
      const cat = [];
      // const fetch = new Api('categories').getCategories();
      const fetch = await new Api('categories').getCategories();
      fetch.forEach((item) => {
        cat.push(item.data());
      });
      commit('SET_CATEGORIES', cat);
    },
  },
};
