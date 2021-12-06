import axios from 'axios';

const state = () => ({
  accessToken: null,
  user: {
    username: null,
    email: null,
    firstName: null,
    lastName: null
  }
});

const getters = {
  accessToken: (state) => state.accessToken,
  accessTokenHeaderValue: (state) => {return 'Bearer ' + state.accessToken;}
};

const actions = {
  logoutUser({commit}) {
    commit('setAccessToken', null);
    commit('setUser', null);
    commit('createNewAlert', {
      color: 'success',
      text: 'Successfully logged out!'
    }, {root: true});
  },
  authUser({rootState, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(rootState.serverAddress + '/auth/login', {
        auth: {
          username: payload.username,
          password: payload.password
        }
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'Successfully logged in!'
          }, {root: true});
          commit('setAccessToken', response.data.token);
          commit('setUser', response.data);
          resolve(response);
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
  createUser({rootState, commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(rootState.serverAddress + '/auth/register', {
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password
      }).then((response) => {
        if (response.status === 200) {
          commit('createNewAlert', {
            color: 'success',
            text: 'New account successfully created!'
          }, {root: true});
          resolve();
        }
      }).catch((error) => {
        commit('createNewAlert', {
          color: 'error',
          text: error.response.data
        });
        reject(error);
      });
    });
  },
  catchExpiredSessionError({ commit, dispatch }, error) {
    if (error.response.status === 401) {
      commit('createNewAlert', {
        color: 'error',
        text: 'Session expired'
      }, { root: true });
      dispatch('logoutUser');
    } else {
      commit('createNewAlert', {
        color: 'error',
        text: error.response.data
      }, { root: true });
    }
  }
};

const mutations = {
  setAccessToken(state, payload) {
    if (payload) {
      localStorage.setItem('accessToken', payload);
    } else {
      localStorage.removeItem('accessToken');
    }
    state.accessToken = payload;
  },
  getAccessToken(state){
    state.accessToken = localStorage.getItem('accessToken');
  },
  setUser(state, payload) {
    if (!payload) {
      localStorage.removeItem('userData');
      state.user = user;
      return;
    }
    const user = {
      username: payload.username,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName
    };
    localStorage.setItem('userData', JSON.stringify(user));
    state.user = user;
  },
  getUser(state){
    state.user = JSON.parse(localStorage.getItem('userData'));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
