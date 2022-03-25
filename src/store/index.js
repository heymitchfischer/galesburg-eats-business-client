import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    user: {
      id: null,
      email: null
    }
  },

  getters: {
    isLoggedIn: state => {
      return state.auth !== null;
    },

    isLoggedOut: state => {
      return state.auth === null;
    },

    currentUser: state => {
      return state.user;
    }
  },

  mutations: {
    updateUser(state, payload) {
      state.user = {
        id: payload.id,
        email: payload.email
      }
    },

    setAuth(state, payload) {
      state.auth = payload.auth
    }
  },
  actions: {
    async signIn({ commit }, payload) {
      const response = await fetch('http://localhost:3000/business_users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'business_web_client'
        },
        body: JSON.stringify({ business_user: { email: payload.email, password: payload.password } })
      });

      const result = await response.json();

      if (response.ok) {
        const auth = response.headers.get('Authorization');
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
        localStorage.setItem('auth', auth);
      } else {
        throw result.error;
      }
    },

    async signUp({ commit }, payload) {
      const response = await fetch('http://localhost:3000/business_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Jwt-Auth': 'business_web_client'
        },
        body: JSON.stringify({
          business_user: {
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.passwordConfirmation
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        const auth = response.headers.get('Authorization');
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
        localStorage.setItem('auth', auth);
      } else {
        throw result.errors;
      }
    },

    async signOut({ commit, state }) {
      const response = await fetch('http://localhost:3000/business_users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.auth,
          'Jwt-Auth': 'business_web_client'
        }
      });

      if (await response.status === 204) {
        commit('updateUser', {});
        commit('setAuth', { auth: null });
        localStorage.removeItem('auth');
      }
    },

    async autoSignIn({ commit }) {
      const auth = localStorage.getItem('auth');
      const response = await fetch('http://localhost:3000/business_users/auto_sign_in', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
          'Jwt-Auth': 'business_web_client'
        }
      });

      const result = await response.json();

      if (response.ok) {
        commit('updateUser', result);
        commit('setAuth', { auth: auth });
      } else {
        localStorage.removeItem('auth');
      }
    },

    async createBusiness({ state }, payload) {
      const response = await fetch('http://localhost:3000/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.auth,
          'Jwt-Auth': 'business_web_client'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw result.error;
      }
    },
  },
  modules: {
  },
});
