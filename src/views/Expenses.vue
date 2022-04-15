<template>
<v-app id="main">
    <TopBar></TopBar>
    <Navigation></Navigation>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12" class="py-0">
          <h2>Koszty</h2>
          </v-col>
        </v-row>
        <v-row>
        <v-col cols="8">
          <DataTable
            :rows="rows"
            :headers="expensesTableHeaders"
            :categories="categories"
            @deleteItem="deleteRow($event)"
            @addItem="addRow($event)"
            @updateItem="updateRow($event)"
            class="rounded elevation-3" />
        </v-col>
         <v-col cols="4">
        <Doughnut :chart-data="data"
          :key="reRenderChart"
          style="border: 1px solid #ccc;"
          class="rounded pa-4 elevation-3" />
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
import { Doughnut } from 'vue-chartjs/legacy';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement,
} from 'chart.js';
import { onSnapshot } from 'firebase/firestore';
import DataTable from '@/components/DataTable';
import { mapActions, mapGetters } from 'vuex';
import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default {
  name: 'Expenses',
  components: {
    Navigation,
    TopBar,
    DataTable,
    Doughnut,
  },

  data: () => ({
    rows: [],
    message: null,
    reRenderChart: 0,
    expensesTableHeaders: [
      {
        text: 'Nazwa',
        value: 'title',
        align: 'start',
        sortable: false,
        type: 'text',
      },
      {
        text: 'Kategoria',
        value: 'category',
        type: 'object',
        inputType: 'options',
      },
      { text: 'Data', value: 'date', type: 'date' },
      { text: 'Kwota', value: 'amount', type: 'number' },
      { text: 'Akcje', value: 'actions', sortable: false },
    ],
  }),

  watch: {
    'data.datasets': {
      deep: true,
      handler() {
        // eslint-disable-next-line no-plusplus
        this.reRenderChart++;
      },
    },
  },

  computed: {
    ...mapGetters({
      categories: 'categories/expensesCategories',
    }),

    chartLabels() {
      return (Object.keys(this.categoriesSum || 0));
    },

    chartValues() {
      return Object.values(this.categoriesSum || 0);
    },
    chartColors() {
      const arr = [];
      this.chartLabels.forEach((label) => {
        const index = this.categories.findIndex((category) => category.text === label);
        arr.push(this.categories[index].color);
      });
      return arr;
    },

    data() {
      const obj = {
        labels: this.chartLabels || [],
        datasets: [{
          data: this.chartValues || [],
          backgroundColor: this.chartColors || [],
          hoverOffset: 10,
        }],
      };
      return obj;
    },

    currentUser() {
      return this.$store?.getters?.currentUser;
    },

    categoriesSum() {
      const summs = this.rows.reduce((a, b) => {
        if (a[b.category.text] === undefined) {
          a[b.category.text] = b.amount;
        } else {
          a[b.category.text] += b.amount;
        }
        return a;
      }, {});
      return summs;
    },
  },

  methods: {
    getData() {
      const items = new Api('expenses').getCollection();
      onSnapshot(items, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.rows.push({ id: change.doc.id, ...change.doc.data() });
          }
          if (change.type === 'modified') {
            const rowIndex = this.rows.findIndex((el) => el.id === change.doc.id);
            this.rows.splice(rowIndex, 1, { id: change.doc.id, ...change.doc.data() });
          }
          if (change.type === 'removed') {
            this.rows = this.rows.filter((item) => item.id !== change.doc.id);
          }
        });
      });
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
    this.getData();
    this.getCategories();
  },
};
</script>
