import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  async created() {
    if(!this.$store.state.token) {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8000/rest-auth/registration/',
          data: {
            username: "Pryda111",
            email: "Pryda111@ya.ru",
            password1: "asd!321z",
            password2: "asd!321z"
          }
        });
        this.$store.commit('setToken', res.data.key);
      } catch(e) {
        console.error(e)
      }
      
    }
  }
}).$mount('#app')
