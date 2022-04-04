<template>
  <router-view></router-view>
</template>

<script>
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default {

  data: () => ({
  }),

  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        this.$store.dispatch('setUser', { email, uid });
      }
    });
  },
};
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
