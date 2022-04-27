import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { actions, getters, mutations } from '@/store/modules/categories';
import { getters as uGetters, actions as uActions, mutations as uMutations } from '@/store/modules/user';
import Expenses from '@/views/Expenses';
import Vuetify from 'vuetify';
import categoriesMock from './_mock_/categories.json';
import expensesMock from './_mock_/expenses.json';

const VuexModule = {
  categories: {
    actions,
    getters,
    mutations,
    state: {
      categories: categoriesMock,
    },
    namespaced: true,
  },
  user: {
    actions: uActions,
    state: {
      user: {
        email: 'trynio',
        uid: '0kIHjLvabIHjLvEVQZE26H',
      },
    },
    getters: uGetters,
    mutations: uMutations,
    namespaced: true,
  },
};

describe('Expenses Vue testing', () => {
  let vuetify;
  let store;
  const localVue = createLocalVue();
  localVue.use(Vuex);
  // eslint-disable-next-line prefer-const
  store = new Vuex.Store({ modules: VuexModule });

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => shallowMount(Expenses, {
    localVue,
    vuetify,
    store,
    stubs: ['router-link', 'ApiService', 'getData', 'getCategories'],
    ...options,
  });

  test('categoriesSum reduce funtion', () => {
    const wrapper = mountFunction({
      data: () => ({ rows: expensesMock }),
    });

    expect(wrapper.vm.categoriesSum).toEqual({
      Mieszkanie: 150,
      Jedzenie: 150,
      Rozrywka: 50,
      Samochód: 100,
      Elektronika: 50,
    });
  });

  test('chartLabels', () => {
    const wrapper = mountFunction({
      data: () => ({ rows: expensesMock }),
    });
    expect(wrapper.vm.chartLabels).toEqual([
      'Mieszkanie',
      'Jedzenie',
      'Rozrywka',
      'Samochód',
      'Elektronika',
    ]);
  });

  test('chartValues', () => {
    const wrapper = mountFunction({
      data: () => ({ rows: expensesMock }),
    });
    expect(wrapper.vm.chartValues).toEqual([150, 150, 50, 100, 50]);
  });

  test('currentUser', () => {
    const wrapper = mountFunction({
      data: () => ({ rows: expensesMock }),
    });
    expect(wrapper.vm.currentUser).toEqual({
      email: 'trynio',
      uid: '0kIHjLvabIHjLvEVQZE26H',
    });
  });

  test('chartColors', () => {
    const wrapper = mountFunction({
      data: () => ({ rows: expensesMock }),
    });
    expect(wrapper.vm.chartColors).toEqual([
      '#2196F3FF',
      '#009688FF',
      '#FF9800FF',
      '#F44336FF',
      '#9C27B0FF',
    ]);
  });
});
