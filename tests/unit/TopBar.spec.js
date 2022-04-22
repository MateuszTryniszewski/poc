import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { getters, actions, mutations } from '@/store/modules/user';
import TopBar from '@/components/TopBar';

const mockDataStore = {
  user: {
    email: 'trynio',
    uid: '0kIHjLvabIHjLvEVQZE26H',
  },
};
const userCheckState = {
  email: 'trynio',
  uid: '0kIHjLvabIHjLvEVQZE26H',
};
const userModule = {
  user: {
    actions,
    state: mockDataStore,
    getters,
    mutations,
    namespaced: true,
  },
};

describe('TopBar component tests', () => {
  let store;
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('Check computed current user', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({ modules: userModule });

    const wrapper = mount(TopBar, {
      store, localVue, vuetify,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentUser).toEqual(userCheckState);
  });

  test('Getter logged user and next dispatch logout user', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store({ modules: userModule });

    expect(store.getters['user/currentUser']).toEqual(userCheckState);
    store.dispatch('user/logoutUser');
    expect(store.getters['user/currentUser']).toBe(null);
  });
});
