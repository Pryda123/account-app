import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" // плагин для сохранения стейта в localstorage

Vue.use(Vuex)

import axios from "axios"

export default new Vuex.Store({
  state: {
    bankAccounts: [],
    token: null,
    accountPayUp: [],
    accountTransactions: [],
    currentPage: 1
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAccounts(state, accounts) {
      state.bankAccounts = accounts;
    },
    addAccount(state, account) {
      state.bankAccounts.push(account);
    },
    upBalance(state, accountInfo) {
      state.bankAccounts.forEach(item => {
        if(item.id == accountInfo.id) {
          item.balance = accountInfo.balance;
        }
      });
    },
    setAccountPayUp(state, payUpInfo) {
      state.accountPayUp = payUpInfo;
    },
    setAccountTransactions(state, transactionsInfo) {
      state.accountTransactions = transactionsInfo;
    },
    deleteAccount(state, account) {
      state.bankAccounts.forEach((item, index) => {
        if(item.id == account.id) {
          state.bankAccounts.splice(index, 1);
        }
      });
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    }
  },
  actions: {
    async setToken(context) {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8000/rest-auth/registration/',
          data: {
            username: "Pryda2234",
            email: "Pryda2234@ya.ru",
            password1: "asd!321z",
            password2: "asd!321z"
          }
        });
        context.commit('setToken', res.data.key);
      } catch(e) {
        console.error(e)
      }
    }, // РЕГИСТРАЦИЯ (отправка логина, пароля и получение токена)
    async getAccounts(context) {
      try {
        const res = await axios({
          method: 'get',
          url: 'http://localhost:8000/api/bank/account/',
          headers: {
            Authorization: 'Token ' + this.state.token
          },
        });
        context.commit('setAccounts', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async getAccountPayUp(context) {
      try {
        const res = await axios({
          method: 'get',
          url: 'http://localhost:8000/api/bank/action/',
          headers: {
            Authorization: 'Token ' + this.state.token
          },
        });
        context.commit('setAccountPayUp', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async getAccountTransactions(context) {
      try {
        const res = await axios({
          method: 'get',
          url: 'http://localhost:8000/api/bank/transaction/',
          headers: {
            Authorization: 'Token ' + this.state.token
          },
        });
        context.commit('setAccountTransactions', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async createAccount(context) {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8000/api/bank/account/',
          headers: {
            Authorization: 'Token ' + this.state.token
          },
        });
        context.commit('addAccount', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async deleteAccount(context, account) {
      try {
        await axios({
          method: 'delete',
          url: 'http://localhost:8000/api/bank/account/' + account.id + '/',
          headers: {
            Authorization: 'Token ' + this.state.token
          }
        });
        context.commit('deleteAccount', account);
      } catch(e) {
        console.error(e);
      }
    },
    async upAccount(context, payload) {
      await axios({
        method: 'post',
        url: 'http://localhost:8000/api/bank/action/',
        headers: {
            Authorization: 'Token ' + this.state.token
        },
        data: {
            account: payload.id,
            amount: payload.amount
        }
      });
    },
    async transactionAccount(context, payload) {
      await axios({
          method: 'post',
          url: 'http://localhost:8000/api/bank/transaction/',
          headers: {
              Authorization: 'Token ' + this.state.token
          },
          data: {
              account: payload.id,
              merchant: payload.merchant,
              amount: payload.amount
          }
      });
    }
  },
  plugins: [createPersistedState()]
})
