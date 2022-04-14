<template>
  <div class="rounded">
    <v-data-table :headers="headers"
      :items="rows"
      :items-per-page="-1"
      :sortDesc="true"
      sort-by="date"
      class="rounded">
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
      <template v-slot:item.color="{ item }">
        <v-chip :color="item.color">
          {{ item.color }}
        </v-chip>
      </template>
      <template v-slot:item.icon="{ item }">
          <v-icon dense class="mr-2">
          {{ item.icon }}
          </v-icon>
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
            <v-row no-gutters>
              <v-col v-for="(header, index) in headers" :key="index" cols="12">
                <v-text-field v-if="header.type === 'text'"
                  v-model="currentItem[header.value]"
                  :label="header.text"
                  outlined
                  />
                <v-select v-if="header.inputType === 'options'"
                  v-model="currentItem.category.text"
                  :items="categories"
                  :label="header.text"
                  outlined
                  />
                <v-menu v-if="header.type === 'date'"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  outlined
                  min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="currentItem[header.value]"
                      :label="header.text"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on" />
                  </template>
                <v-date-picker v-model="currentItem[header.value]"
                  @input="menu = false"
                  no-title
                  scrollable >
                </v-date-picker>
                </v-menu>
                <v-text-field v-if="header.type === 'number'"
                  v-model.number="currentItem[header.value]"
                  :label="header.text"
                  type="number"
                  outlined>
                </v-text-field>
                <v-switch v-if="header.type === 'boolean'"
                  v-model="currentItem[header.value]"
                  :label="header.text" />
                <div v-if="header.type === 'colors'">
                  <label>{{ header.text }}</label>
                  <v-color-picker v-model="currentItem[header.value]"
                    :swatches="swatches"
                    show-swatches
                    hide-canvas
                    hide-inputs
                    hide-mode-switch
                    hide-sliders
                    width="auto" />
                </div>
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
    categories: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    swatches: [
      ['#2196f3'], ['#4caf50'], ['#ff9800'], ['#9c27b0'], ['#673ab7'], ['#f44336'], ['#009688'],
    ],
    menu: false,
    dialog: false,
    dialogDelete: false,
    currentItem: {},
    defaultItem: {},
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
      if (this.currentItem.category) {
        this.currentItem.category = this.categories
          .find((cat) => cat.text === this.currentItem.category.text);
      }
      // eslint-disable-next-line no-unused-expressions
      this.currentItem.id
        ? this.$emit('updateItem', this.currentItem)
        : this.$emit('addItem', this.currentItem);
      this.close();
    },
    makeInitialObject() {
      const initObject = {};
      this.headers.forEach((element) => {
        if (element.type === 'date') {
          initObject[element.value] = (new Date(Date.now() - (new Date())
            .getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        }

        if (element.type === 'text' || element.type === 'number' || element.type === 'colors') {
          initObject[element.value] = null;
        }

        if (element.type === 'boolean') {
          initObject[element.value] = false;
        }

        if (element.type === 'object') {
          initObject[element.value] = { value: null };
        }
      });
      this.defaultItem = initObject;
      this.currentItem = initObject;
    },
  },
  created() {
    this.makeInitialObject();
  },
};
</script>
