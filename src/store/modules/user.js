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
  }
};

const mutations = {
  setAccessToken(state, payload) {
    localStorage.setItem('accessToken', payload);
    state.accessToken = payload;
  },
  getAccessToken(state){
    state.accessToken = localStorage.getItem('accessToken');
  },
  setUser(state, payload) {
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
    state.user.email = localStorage.getItem('userData.email');
    state.user.username = localStorage.getItem('userData.username');
    state.user.firstName = localStorage.getItem('userData.firstName');
    state.user.lastName = localStorage.getItem('userData.lastName');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
