import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created() {
    if(!this.$store.state.token) {
      this.$store.dispatch('setToken'); // вызов экшена регистрации
    }
  }
}).$mount('#app')
