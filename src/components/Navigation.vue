<template>
  <v-navigation-drawer :value.sync="drawerState" app>
      <v-list>
        <v-list-item v-for="link in links" :key="link.id" :to="link.url" link >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navigation',

  data: () => ({
    links: [
      {
        id: 1,
        icon: 'mdi-wallet-outline',
        title: 'Przychody',
        url: '/revenues',
      },
      {
        id: 2,
        icon: 'mdi-cart-outline',
        title: 'Koszty',
        url: '/expenses',
      },
      {
        id: 3,
        icon: 'mdi-credit-card-outline',
        title: 'Płatności cykliczne',
        url: '/homeView',
      },
      {
        id: 4,
        icon: 'mdi-piggy-bank-outline',
        title: 'Skarbonka',
        url: '/gain',
      },
      {
        id: 5,
        icon: 'fa-solid fa-gears',
        title: 'Ustawienia',
        url: '/settings',
      },
    ],
  }),

  computed: {
    drawerState() {
      return this.$store?.state?.drawer;
    },
  },
};
</script>
