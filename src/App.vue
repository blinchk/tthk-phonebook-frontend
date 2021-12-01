<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerOpen"
      app
      clipped
    >
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, key) in nav"
            :key="key"
            :to="item.to"
            exact
          >
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen" />
      <v-app-bar-title>
        Phonebook
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
      <alert-notification />
    </v-main>
  </v-app>
</template>

<script>
import AlertNotification from "./components/AlertNotification";
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'App',
  components: {
    AlertNotification
  },

  data: () => ({
    drawerOpen: false,

  }),
  computed: {
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
    nav: (this.accessToken()) ? [
      {
        title: 'Home',
        to: '/',
        icon: 'mdi-home'
      },
      {
        title: 'Contacts',
        to: '/contacts',
        icon: 'mdi-contacts'
      },
      {
        title: 'Add contact',
        to: '/contacts/add',
        icon: 'mdi-plus'
      }
    ] : [{
      title: 'Register',
      to: '/register',
      icon: 'mdi-account-plus'
    },
      {
        title: 'Log in',
        to: '/login',
        icon: 'mdi-login'
      }],
  },
  created() {
    if (!this.accessToken) {
      this.getAccessToken();
    }
  },
  methods: {
    ...mapMutations('user', ['getAccessToken'])
  },
};
</script>
