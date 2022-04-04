<template>
<v-app id="main">
    <TopBar></TopBar>
    <v-main>
  <div>
    <v-card elevation="1" outlined  class="mx-auto my-12" max-width="360">
      <LoginComponent v-if="isLogin"
        @loginStateChange="isLogin = !isLogin"
        @error="errorMessage = $event" />

      <RegisterComponent v-else
      @loginStateChange="isLogin = !isLogin"
      @error="errorMessage = $event" />

      <v-col v-if="errorMessage" class="mx-auto text-center">
        <v-divider class="mb-3"></v-divider>
        <span>{{ errorMessage }}</span>
      </v-col>

    </v-card>
  </div>
    </v-main>
</v-app>
</template>

<script>
import LoginComponent from '@/components/LoginComponent';
import RegisterComponent from '@/components/RegisterComponent';
import TopBar from '../components/TopBar';

// @ is an alias to /src

export default {

  name: 'Login',
  components: {
    LoginComponent,
    RegisterComponent,
    TopBar,
  },

  data: () => ({
    isLogin: true,
    errorMessage: null,
  }),

  computed: {
  },

  methods: {
  },

  created() {
  },
};
</script>

<style lang="scss">

</style>
