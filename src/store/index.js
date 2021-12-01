import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import contacts from './modules/contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    serverAddress: 'https://phonebook-api.laus.me',
    alertNotification: {
      status: false,
      color: 'error',
      text: 'Unhandled error.'
    }
  }),
  getters: {
    alertNotification(state) {
      return state.alertNotification;
    },
  },
  mutations: {
    createNewAlert(state, payload) {
      state.alertNotification.text = payload.text;
      state.alertNotification.color = payload.color;
      state.alertNotification.status = true;
    },
    setAlertStatus(state, payload) {
      state.alertNotification.status = payload;
    }
  },
  actions: {
  },
  modules: {
    user,
    contacts
  }
});
