import {
  state, getters, mutations,
} from '@/store/modules/categories';

export default function storeConfig() {
  return {
    modules: {
      categories: {
        state,
        getters,
        mutations,
      },
    },
  };
}
