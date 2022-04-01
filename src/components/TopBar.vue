<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="onChangeDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-icon @click="darkMode">{{ this.$vuetify.theme.dark ? 'mdi-weather-sunset-up' : 'mdi-weather-night' }}</v-icon>
    <v-btn class="mx-3" color="secondary" @click="logout">Wyloguj</v-btn>
  </v-app-bar>
</template>

<script>
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default {
  name: 'TopBar',

  data: () => ({

  }),

  methods: {
    onChangeDrawer () {
      this.$store.commit('toogleDrawer')
    },
    darkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout () {
      signOut(auth).then(() => {
        this.$router.push('/login')
      }).catch((err) => {
        console.log('wyloguj', err)
      })
    }
  }
}
</script>
