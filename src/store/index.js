import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    serverAddress: 'http://localhost:8080'
  }),
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
