<template>
  <v-app>
  <v-app-bar app>
    <v-toolbar-title>terstr</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="error">ss</v-btn>
  </v-app-bar>
  <v-content>
    <v-container>
      <v-card width="300" class="mx-auto pa-4">
        <v-text-field label="test"></v-text-field>
        <v-btn color="info">test</v-btn>
      </v-card>
      <v-main>
        <router-view/>
      </v-main>
    </v-container>
  </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
