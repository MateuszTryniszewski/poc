<template>
  <v-data-table
    :headers="headers"
    :items="rows"
    sort-by="calories"
    class="elevation-1"
    :items-per-page="-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on"> Dodaj </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="item.id" label="Nazwa" outlined hidden />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="item.title" label="Nazwa" outlined />
                  </v-col>
                  <v-col cols="12">
                    <v-select v-model="item.category"
                      outlined :items="categories" label="Kategoria" />
                  </v-col>
                  <v-col cols="12">
                    <v-menu v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      outlined
                      min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.date" label="Data"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on" />
                      </template>
                    <v-date-picker v-model="item.date" no-title scrollable @input="menu = false">
                    </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                  <v-text-field v-model.number="item.amount" type="number" label="Kwota" outlined>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" text @click="close">Zamknij</v-btn>
              <v-btn color="blue darken-1" @click="save"> Zapisz </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Czy na pewno chcesz usunąć?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Anuluj</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Usuń</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.category="{ item }">
        <v-icon>{{ item.category.icon ? item.category.icon : 'mdi-car ' }}</v-icon>
        {{ item.category.name ? item.category.name : item.category.text }}
    </template>
     <template v-slot:item.amount="{ item }">
      <v-chip
        color="primary"
        dark
      >
        {{ item.amount }} PLN
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',

  props: {
    rows: {
      type: Array,
    },
  },

  data: () => ({
    categories: [
      {
        text: 'Mieszkanie',
        value: 1,
        icon: '',
        color: 'primary',
      },
      {
        text: 'Samochód',
        value: 2,
        icon: '',
        color: 'error',
      },
      {
        text: 'Jedzenie',
        value: 3,
        icon: '',
        color: 'success',
      },
      {
        text: 'Rozrywka',
        value: 4,
        icon: '',
        color: 'warning',
      },
    ],
    menu: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nazwa',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'Kategoria', value: 'category' },
      { text: 'Data', value: 'date' },
      { text: 'Kwota', value: 'amount' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    item: {
      id: null,
      title: null,
      category: {
        id: null,
      },
      date: (new Date(Date.now() - (new Date())
        .getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      amount: null,
    },
    defaultItem: {
      title: '',
      category: {
        id: null,
      },
      date: (new Date(Date.now() - (new Date())
        .getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      amount: null,
    },
  }),

  computed: {
    formTitle() {
      return this.item?.name ? 'Edycja' : 'Dodaj';
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {

    },

    editItem(item) {
      console.log('item', item);
      this.item = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.$emit('deleteItem', item);
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.item = { ...this.defaultItem };
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.item = { ...this.defaultItem };
      });
    },

    save() {
      this.item.category = this.categories.find(({ value }) => value === this.item.category);
      this.$emit('addItem', this.item);
      this.close();
    },
  },
};
</script>
