<template>
<v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
        <v-col cols="12">
        <div>
          <h1>Przychody</h1>
          <DataTable></DataTable>
        </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-app>
</template>
<script>
// @ is an alias to /src
import Navigation from '../components/Navigation'
import TopBar from '../components/TopBar'
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'about',
  components: {
    Navigation,
    TopBar,
    DataTable
  }
}
</script>
