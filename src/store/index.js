import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bankAccounts: [],
    token: null,
    accountPayUp: [],
    accountTransactions: []
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
          state.bankAccounts.slice(index, 1);
          console.log(state.bankAccounts)
        }
      })
      // console.log(state.bankAccounts)
    },
    // currentAccountPayUp(state, payload) {
    //   state.accountPayUp = 
    // }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
