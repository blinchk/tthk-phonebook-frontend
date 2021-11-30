import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import contacts from './modules/contacts';
Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    serverAddress: 'https://phonebook-api.laus.me'
  }),
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    contacts
  }
});
