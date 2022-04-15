<template>
<v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" class="py-0">
          <h2>Ustawienia</h2>
          </v-col>
        </v-row>
        <v-row>
        <v-col cols="6">
          <DataTable
            :rows="categories"
            :headers="categoriesTableHeaders"
            @deleteItem="del($event)"
            @addItem="add($event)"
            @updateItem="update($event)"
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
    categoriesTableHeaders: [
      {
        text: 'Nazwa',
        value: 'text',
        align: 'start',
        sortable: false,
        type: 'text',
      },
      { text: 'Ikona', value: 'icon', type: 'text' },
      { text: 'Kolor', value: 'color', type: 'colors' },
      { text: 'Przychód', value: 'revenues', type: 'boolean' },
      { text: 'Koszt', value: 'expenses', type: 'boolean' },
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
    ...mapActions('categories', ['deleteRow', 'addRow', 'updateRow', 'getCategories']),

    del(row) {
      this.deleteRow(row);
    },
    add(row) {
      this.addRow(row);
    },
    update(row) {
      this.updateRow(row);
    },
  },

  created() {
    this.getCategories();
  },
};
</script>
