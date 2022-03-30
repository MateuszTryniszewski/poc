<template>
 <v-app-bar app>
       <v-app-bar-nav-icon @click.stop="onChangeDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-icon @click="darkMode">{{ this.$vuetify.theme.dark ? 'mdi-weather-sunset-up' : 'mdi-weather-night' }}</v-icon>
    </v-app-bar>
</template>

<script>
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
    }
  }
}
</script>
