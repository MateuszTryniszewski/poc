import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Navigation from '@/components/Navigation';

const localVue = createLocalVue();

describe('Navigation', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountFunction = (options) => mount(Navigation, {
    localVue,
    vuetify,
    stubs: ['router-link'],
    data() {
      return {
        drawerSwitcher: false,
      };
    },
    computed: {
      drawerState: {
        get() {
          return this.drawerSwitcher;
        },
        set(val) {
          this.drawerSwitcher = val;
        },
      },
    },
    ...options,
  });

  test('if drawerState is false, dont show main menu bar', async () => {
    const wrapper = mountFunction();
    wrapper.setData({ drawerState: false });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes('v-navigation-drawer--open')).toBe(false);
  });

  it('if drawerState is ture, show main menu bar', async () => {
    const wrapper = mountFunction();
    wrapper.vm.drawerState = true;

    await wrapper.vm.$nextTick();
    expect(wrapper.classes('v-navigation-drawer--open')).toBe(true);
  });
});
