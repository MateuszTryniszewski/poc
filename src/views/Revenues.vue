<template>
<v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
        <v-col cols="12">
        <div>
          <h1>Koszty</h1>
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
import Api from '@/api';
import DataTable from '@/components/DataTable';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';

export default {
  name: 'about',
  components: {
    Navigation,
    TopBar,
    DataTable,
  },

  data: () => ({
    rows: [],
  }),

  computed: {
    currentUser() {
      return this.$store?.getters?.currentUser;
    },
  },

  methods: {
    async getData() {
      const items = new Api('expenses').getAll();
      items.then((result) => {
        result.forEach((doc) => {
          this.rows = doc.data();
        });
      }).catch((err) => {
        console.log('err', err);
      });
    },
  },

  created() {
    this.getData();
  },
};
</script>
