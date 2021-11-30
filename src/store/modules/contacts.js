import axios from 'axios';

const state = () => ({
  contact: []
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
  addContact({rootState, rootGetters, commit}, payload) {
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
          commit('createNewAlert', {
            color: 'success',
            text: 'Contact added!'
          }, {root: true});
          resolve();
        }
      }).catch((error) => {
        if (error.response.status === 500) {
          commit('createNewAlert', {
            color: 'error',
            text: 'Something went wrong'
          }, {root: true});
        }
        reject(error);
      });
    });
  }
};

const mutations = {
  setContacts(state, payload) {
    state.contact = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
