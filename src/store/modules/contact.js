import axios from 'axios';

const state = () => ({
  contacts: []
});

const actions = {
  getContact({rootState, rootGetters, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/contact/' + payload.id, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        dispatch('user/catchExpiredSessionError', error, {root: true});
        reject(error);
      });
    });
  },
  getContacts({rootState, rootGetters, commit, dispatch}) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/contact', {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        commit('setContacts', response.data);
        resolve(response);
      }).catch((error) => {
        dispatch('user/catchExpiredSessionError', error, {root: true});
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
        group: payload.group ? {
          id: payload.group
        } : null
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
          commit('createNewAlert', {
            color: 'error',
            text: error.response.data
          }, {root: true});
        reject(error);
      });
    });
  },
  deleteContact({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(rootState.serverAddress + '/contact/' + payload.id, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'Contact deleted successfully!'
          }, {root: true});
          resolve();
        }
      }).catch((error) => {
        if (error.response.data.status === 500) {
          commit('createNewAlert', {
            color: 'error',
            text: 'Internal server error'
          }, {root: true});
        } else {
          commit('createNewAlert', {
            color: 'error',
            text: error.response.data.status
          }, {root: true});
        }
        reject();
      });
    });
  },
  editContact({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/contact', {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        group: payload.group ? {
          id: payload.group
        } : null
      }, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'Contact has been changed'
          }, {root: true});
          resolve();
        }
      }).catch((error) => {
        if (error.response.data.status === 500) {
          commit('createNewAlert', {
            color: 'error',
            text: "Internal server error"
          }, {root: true});
        } else {
          commit('createNewAlert', {
            color: 'error',
            text: error.response.data
          }, {root: true});
        }
        reject();
      });
    });
  }
};

const mutations = {
  setContacts(state, payload) {
    state.contacts = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
