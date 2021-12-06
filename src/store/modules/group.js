import axios from 'axios';

const state = () => ({
  groups: []
});

const actions = {
  getGroup({rootState, rootGetters, dispatch}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/group/' + payload.id, {
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
  getGroups({rootState, rootGetters, commit, dispatch}) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/group', {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('setGroups', response.data);
          resolve(response);
        }
      }).catch((error) => {
        dispatch('user/catchExpiredSessionError', error, {root: true});
        reject(error);
      });
    });
  },
  addGroup({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/group', {
        title: payload.title
      }, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'New group added!'
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
  deleteGroup({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(rootState.serverAddress + '/group/' + payload.id, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'Group deleted successfully!'
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
  editGroup({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/group', {
        id: payload.id,
        title: payload.title
      }, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'Group edited successfully!'
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
  copyGroup({rootState, rootGetters, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/group/share/' + payload.id, {
        title: payload.title
      }, {
        headers: {
          Authorization: rootGetters["user/accessTokenHeaderValue"]
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: `Group with ID ${payload.id} successfully copied.`
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
};

const mutations = {
  setGroups(state, payload) {
    state.groups = payload;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
