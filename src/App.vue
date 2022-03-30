<template>
  <v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col cols="12">
          <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'
import TopBar from './components/TopBar'

export default {

  components: {
    Navigation,
    TopBar
  },

  data: () => ({
    cards: ['Today', 'Yesterday']
  })
}
</script>
