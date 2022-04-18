import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
// import DataTable from '@/components/DataTable';
// import categories from '../../src/store/modules/categories';
import store from '@/store';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DataTable.Vue', () => {
  // eslint-disable-next-line no-shadow
  let state;

  beforeEach(() => {
    state = {
      user: 'test',
    };

    // store = new Vuex.Store({
    //   state,
    //   // modules: {
    //   //   categories: {
    //   //     state: categories.state,
    //   //     getters: categories.getters,
    //   //     namespaced: true,
    //   //   },
    //   // },
    // });
  });

  test('user exists', () => {
    const wrapper = mount(localVue);
    expect(wrapper.getters.currentUser(state)).toEqual('test');
  });
});
