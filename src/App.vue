<template>
  <router-view></router-view>
</template>

<script>
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { mapActions } from 'vuex';
// eslint-disable-next-line import/no-cycle
import Api from './api';

export default {

  data: () => ({
  }),

  methods: {
    ...mapActions({
      setUser: 'user/setUser',
    }),
  },

  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        this.setUser({ email, uid });
      }
    });
  },
};

export { Api };
</script>

<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
