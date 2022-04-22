<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="currentUser" @click.stop="onChangeDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-icon @click="darkMode">
      {{ this.$vuetify.theme.dark ? 'mdi-weather-sunset-up' : 'mdi-weather-night' }}
    </v-icon>
    <v-btn v-if="currentUser" class="mx-3" color="secondary" @click="logout">Wyloguj</v-btn>
  </v-app-bar>
</template>

<script>
import { signOut } from 'firebase/auth';
import { mapGetters } from 'vuex';
import { auth } from '../firebase';

export default {
  name: 'TopBar',

  data: () => ({

  }),

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  methods: {
    onChangeDrawer() {
      this.$store.commit('TOOGLE_DRAWER');
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logout() {
      signOut(auth).then(() => {
        this.$store.dispatch('logoutUser');
        this.$router.push('/login');
      }).catch((err) => {
        console.log('wyloguj', err);
      });
    },
  },
};
</script>
