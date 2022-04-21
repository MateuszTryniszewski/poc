import { onSnapshot } from 'firebase/firestore';
import { Api } from '../../App';

export const getters = {
  expensesCategories(state) {
    return state.categories.filter((category) => category.expenses === true);
  },
  revenuesCategories(state) {
    return state.categories.filter((category) => category.revenues === true);
  },
};

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};
const actions = {
  async getCategories({ commit }) {
    const cat = [];
    const fetch = await new Api('categories').getCategories();
    onSnapshot(fetch, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          cat.push({ id: change.doc.id, ...change.doc.data() });
        }
        if (change.type === 'modified') {
          const rowIndex = cat.findIndex((el) => el.id === change.doc.id);
          cat.splice(rowIndex, 1, { id: change.doc.id, ...change.doc.data() });
        }
        if (change.type === 'removed') {
          cat.filter((item) => item.id !== change.doc.id);
        }
      });
    });
    commit('SET_CATEGORIES', cat);
  },

  deleteRow(state, row) {
    const del = new Api('categories', row.id).delete2();
    del.then(() => {
      this.message = 'Usunięto wpis';
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.message = null, 3000);
    }).catch((err) => {
      console.log('err', err);
    });
  },
  addRow(state, row) {
    const add = new Api('categories', null, row).createDoc2();
    add.then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  },
  updateRow(state, row) {
    const add = new Api('categories', row.id, row).updateDoc2();
    add.then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  },
};

export const state = {
  categories: [],
  test: [],
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
