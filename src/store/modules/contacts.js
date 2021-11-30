import axios from 'axios';

const state = () => ({
  contact: null
});

const actions = {
  getContacts({rootState, rootGetters, commit}) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/contact', {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        commit('setContacts', response.data);
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addContact({rootState, rootGetters}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/contact', {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
      }, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        },
      }).then((response) => {
        if (response.status === 200) {
          resolve();
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
};

const mutations = {
  setContacts(state, payload) {
    state.contact = payload.contact;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
