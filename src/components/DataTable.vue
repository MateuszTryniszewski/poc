<template>
  <div class="rounded">
    <v-data-table :headers="headers"
      :items="rows"
      :items-per-page="-1"
      sort-by="date"
      :sortDesc="true" class="rounded">
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn color="primary" class="mb-2" @click="dialog = true"> Dodaj </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.category="{ item }">
          <v-icon :color="item.category.color" dense class="mr-2">
          {{ item.category.icon ? item.category.icon : 'fa-regular fa-folder-open' }}
          </v-icon>
          <span :class="`${item.color}--text`">{{ item.category.text }}</span>
      </template>
      <template v-slot:item.amount="{ item }">
        <!-- <v-chip color="primary" dark> -->
          {{ item.amount }} PLN
        <!-- </v-chip> -->
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete </v-icon>
      </template>
    </v-data-table>

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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="currentItem.title" label="Nazwa" outlined />
              </v-col>
              <v-col cols="12">
                <v-select v-model="currentItem.category.value"
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
                    <v-text-field v-model="currentItem.date" label="Data"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on" />
                  </template>
                <v-date-picker v-model="currentItem.date" no-title scrollable @input="menu = false">
                </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
              <v-text-field v-model.number="currentItem.amount"
                type="number" label="Kwota" outlined>
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
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'DataTable',

  props: {
    rows: {
      type: Array,
    },
    headers: {
      type: Array,
    },
  },

  data: () => ({
    categories: [
      {
        text: 'Mieszkanie',
        icon: 'fa-solid fa-house',
        color: 'primary',
      },
      {
        text: 'Samochód',
        icon: 'fa-solid fa-car',
        color: 'error',
      },
      {
        text: 'Jedzenie',
        icon: 'fa-solid fa-utensils',
        color: 'success',
      },
      {
        text: 'Rozrywka',
        icon: 'fa-solid fa-gamepad',
        color: 'warning',
      },
    ],
    menu: false,
    dialog: false,
    dialogDelete: false,
    currentItem: {
      title: null,
      category: {
        value: null,
      },
      date: (new Date(Date.now() - (new Date())
        .getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      amount: null,
    },
    defaultItem: {
      title: '',
      category: {
        value: null,
      },
      date: (new Date(Date.now() - (new Date())
        .getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      amount: null,
    },
  }),

  computed: {
    formTitle() {
      return this.currentItem?.title ? 'Edycja' : 'Dodaj';
    },
  },

  methods: {
    editItem(id) {
      let item = {};
      item = _cloneDeep(this.rows.find((doc) => doc.id === id));
      this.currentItem = item;
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.currentItem = item;
    },

    deleteItemConfirm() {
      this.$emit('deleteItem', this.currentItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.currentItem = { ...this.defaultItem };
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.currentItem = { ...this.defaultItem };
      });
    },

    save() {
      this.currentItem.category = this.categories
        .find((cat) => cat.text === this.currentItem.category.value);
      // eslint-disable-next-line no-unused-expressions
      this.currentItem.id
        ? this.$emit('updateItem', this.currentItem)
        : this.$emit('addItem', this.currentItem);
      this.close();
    },
  },
};
</script>
