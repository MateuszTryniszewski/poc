<template>
<v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" class="py-0">
          <h2>Przychody</h2>
          </v-col>
        </v-row>
        <v-row>
        <v-col cols="8">
          <DataTable
            :rows="categories"
            :headers="headers"
            @deleteItem="deleteRow($event)"
            @addItem="addRow($event)"
            @updateItem="updateRow($event)"
            class="rounded elevation-3" />
        </v-col>
         <v-col cols="4">
        </v-col>
      </v-row>
        <v-snackbar v-if="message"
          :timeout="2000"
          :value="true"
          absolute
          bottom
          right
          elevation="24"
          color="primary"
        >
        {{ message }}
      </v-snackbar>
    </v-container>
  </v-main>
</v-app>
</template>
<script>
/* eslint-disable no-param-reassign */
// @ is an alias to /src
import Api from '@/api';
// import { onSnapshot } from 'firebase/firestore';
import DataTable from '@/components/DataTable';
import { mapActions } from 'vuex';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';

export default {
  name: 'Settings',
  components: {
    Navigation,
    TopBar,
    DataTable,
  },

  data: () => ({
    rows: [],
    message: null,
    headers: [
      {
        text: 'Nazwa',
        value: 'text',
        align: 'start',
        sortable: false,
      },
      { text: 'Kolor', value: 'color' },
      { text: 'Ikona', value: 'icon' },
      { text: 'Przychód', value: 'revenues' },
      { text: 'Koszt', value: 'expenses' },
      { text: 'Akcje', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    currentUser() {
      return this.$store?.getters?.currentUser;
    },
    categories() {
      return this.$store?.state?.categories?.categories;
    },
  },

  methods: {
    getData() {
      // const items = new Api('expenses').getCollection();
      // onSnapshot(items, (querySnapshot) => {
      //   querySnapshot.docChanges().forEach((change) => {
      //     if (change.type === 'added') {
      //       this.rows.push({ id: change.doc.id, ...change.doc.data() });
      //     }
      //     if (change.type === 'modified') {
      //       const rowIndex = this.rows.findIndex((el) => el.id === change.doc.id);
      //       this.rows.splice(rowIndex, 1, { id: change.doc.id, ...change.doc.data() });
      //     }
      //     if (change.type === 'removed') {
      //       this.rows = this.rows.filter((item) => item.id !== change.doc.id);
      //     }
      //   });
      // });
    },

    deleteRow(row) {
      const del = new Api('expenses', row.id).delete();
      del.then(() => {
        this.message = 'Usunięto wpis';
        // eslint-disable-next-line no-return-assign
        setTimeout(() => this.message = null, 3000);
      }).catch((err) => {
        console.log('err', err);
      });
    },
    addRow(row) {
      const add = new Api('expenses', null, row).createDoc();
      add.then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    updateRow(row) {
      const add = new Api('expenses', row.id, row).updateDoc();
      add.then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    ...mapActions({
      getCategories: 'categories/getCategories',
    }),
  },

  created() {
    console.log('this.$soter', this.$store);
    this.getCategories();
  },
};
</script>
