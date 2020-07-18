<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header class="header">
      <a href="/" class="header__logo">Мои счета</a>
      <button type="button" class="btn btn-add" @click="createAccount"><span class="btn-text">Добавить</span><img src="./assets/icons/add.png" alt=""></button>
    </header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5 col-12">
          <p class="p-3">Доступные счета</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="account in accounts" :key="account.id">
              <div class="account-header" @click="showInfo(account)">
                <h5 class="m-0">Счет {{account.id}}</h5>
                <span>{{account.balance}}</span>
              </div>
              <div class="btn-group">
                <button class="btn" type="button" @click="upAccountModal(account)"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" @click="purchaseAccountModal(account)"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет" @click="deleteAccount(account)"></button>
              </div>
            </li>
            <!-- <li class="list-group-item">
              <div class="account-header" @click="showInfo(1)">
                <h5 class="m-0">Счет 1</h5>
                <span>5 000 000</span>
              </div>
              <div class="btn-group">
                <button class="btn" type="button" @click="upAccountModal"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" @click="purchaseAccountModal"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет"></button>
              </div>
            </li> -->
          </ul>
        </div>
        
        <div class="col-lg-7 col-12" v-if="activeAccount">
          <p class="p-3">{{activeAccount ? 'Информация о счете № ' + activeAccount.id : ''}}</p>
          <!-- <ul class="list-group list-group-flush">
            <li class="list-group-item alert-success" v-for="payUp in currentInfoPayUp" :key="payUp.id">
              <div class="account-header">
                <span>Пополнение</span>
                <span>{{payUp.date | datefilter}}</span>
                <span>{{payUp.amount}}</span>
              </div>
            </li>
            <li class="list-group-item alert-danger" v-for="transaction in currentInfoTansactions" :key="transaction.id">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>{{transaction.date | datefilter}}</span>
                  <span>{{transaction.merchant}}</span>
                  <span>{{transaction.amount}}</span>
                </div>
              </div>
            </li>
          </ul> -->
          <ul class="list-group list-group-flush list-group-info">
            <li class="list-group-item">
              <div class="account-header">
                <span>Тип операции</span>
                <span>Дата</span>
                <span>Наименование</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item" :class="!transaction.merchant ? 'alert-success' : 'alert-danger'" v-for="transaction in allTransactions" :key="transaction.id">
              <div class="account-header">
                <span>{{!transaction.merchant ? 'Пополнение' : 'Списание'}}</span>
                <span>{{transaction.date | datefilter}}</span>
                <span>{{transaction.merchant}}</span>
                <span>{{transaction.amount}}</span>
              </div>
            </li>
            <!-- <li class="list-group-item alert-danger" v-for="transaction in currentInfoTansactions" :key="transaction.id">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>{{transaction.date | datefilter}}</span>
                  <span>{{transaction.merchant}}</span>
                  <span>{{transaction.amount}}</span>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div> 
    </div>

    <!-- Modal -->
    <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Пополнить счет</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Сумма</span>
              </div>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
              <div class="input-group-append">
                <span class="input-group-text">руб.</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
            <button type="button" class="btn btn-primary">Пополнить</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Совершить покупку</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Название товара</span>
              </div>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Сумма</span>
              </div>
              <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
              <div class="input-group-append">
                <span class="input-group-text">руб.</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
            <button type="button" class="btn btn-primary">Оплатить</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Удалить счет?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Вы уверены что хотите удалить счет?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отменить</button>
            <button type="button" class="btn btn-primary">Удалить</button>
          </div>
        </div>
      </div>
    </div> -->
    <up-account-modal v-if="showModalUp" :account="activeAccount" @close="showModalUp = false" @updateinfo="showInfo(activeAccount)">
    </up-account-modal>
    <purchase-modal v-if="showModalPurchase" :account="activeAccount" @close="showModalPurchase = false" @updateinfo="showInfo(activeAccount)">
    </purchase-modal>

  </div>
</template>

<script>
import axios from "axios"
import UpAccountModal from './components/UpAccountModal'
import PurchaseModal from './components/PurchaseModal'

export default {
  name: 'App',
  components: {
    UpAccountModal,
    PurchaseModal
  },
  data() {
    return {
      showModalUp: false,
      showModalPurchase: false,
      activeAccount: null,
      currentInfoPayUp: [],
      currentInfoTansactions: [],
      allTransactions: []
    }
  },
  async created() {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:8000/api/bank/account/',
        headers: {
          Authorization: 'Token ' + this.$store.state.token
        },
      });
      console.log(res);
      this.$store.commit('setAccounts', res.data);
    } catch(e) {
      console.error(e);
    } // получаем список всех счетов пользователя и записываем в store

    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:8000/api/bank/action/',
        headers: {
          Authorization: 'Token ' + this.$store.state.token
        },
      });
      console.log(res);
      this.$store.commit('setAccountPayUp', res.data);
    } catch(e) {
      console.error(e);
    } // получаем список всех пополнений пользователя и записываем в store

    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:8000/api/bank/transaction/',
        headers: {
          Authorization: 'Token ' + this.$store.state.token
        },
      });
      console.log(res);
      this.$store.commit('setAccountTransactions', res.data);
    } catch(e) {
      console.error(e);
    } // получаем список всех транзакций пользователя и записываем в store


    console.log('this.activeAccount')
    console.log(this.activeAccount)
  },
  computed: {
    accounts() {
        return this.$store.state.bankAccounts;
    },
    payInfo() {
        return this.$store.state.accountPayUp;
    },
    transactionsInfo() {
      return this.$store.state.accountTransactions;
    }
  },
  filters: {
    datefilter(value) {
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
      }
      let date = new Date(value);
      return date.toLocaleString("ru", options);
    }
  },
  methods: {
    upAccountModal(account) {
      this.activeAccount = account;
      this.showModalUp = true;
    },
    purchaseAccountModal(account) {
      this.activeAccount = account;
      this.showModalPurchase = true;
    },
    showInfo(account) {
      // this.currentInfoPayUp = this.payInfo.filter(item => {
      //   return item.account == id;
      // });
      // this.currentInfoPayUp.sort((a, b) => {
      //   return (Date.parse(a.date )- Date.parse(b.date))
      // });
      // this.currentInfoTansactions = this.transactionsInfo.filter(item => {
      //   return item.account == id;
      // });
      // this.currentInfoTansactions.sort((a, b) => {
      //   return (Date.parse(a.date )- Date.parse(b.date))
      // })

      this.activeAccount = account;

      let arr1 = [];
      arr1 = this.payInfo.filter(item => {
        return item.account == account.id;
      });
      let arr2 = [];
      arr2 = this.transactionsInfo.filter(item => {
        return item.account == account.id;
      });
      arr2.forEach(item => arr1.push(item));
      this.allTransactions = arr1;

      this.allTransactions.sort((a, b) => {
        return (Date.parse(a.date )- Date.parse(b.date))
      }) // фильтруем все транзакции по нужному счету и выводим с сортировкой по дате
    },
    async createAccount() {
      try {
        const res = await axios({
          method: 'post',
          url: 'http://localhost:8000/api/bank/account/',
          headers: {
            Authorization: 'Token ' + this.$store.state.token
          },
        });
        this.$store.commit('addAccount', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async deleteAccount(account) {
      try {
        await axios({
          method: 'delete',
          url: 'http://localhost:8000/api/bank/account/' + account.id + '/',
          headers: {
            Authorization: 'Token ' + this.$store.state.token
          },
          // body: {}
        });
        this.$store.commit('deleteAccount', account);
      } catch(e) {
        console.error(e);
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
a:hover {
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #2c3e50;
}
.header__logo {
  color: #fff;
  font-size: 24px;
}
.header__logo:hover {
  color: #fff;
}
/* .btn {
  display: flex;
  background: none;
  border: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
} */
.btn:hover {
  cursor: pointer;
}
.btn-add {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 16px;
  background: none;
  border: 0;
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  border-radius: 5px;
}
.btn-add:hover {
  background-color: #e2e6ea;
  border-color: #dae0e5;
}
.main {
  display: flex;
  flex-wrap: wrap;
  padding: 50px 30px;
  margin: 0 -15px;
  width: 100%;
}
@media (max-width: 500px) {
  .header {
    padding: 15px;
  }
}
@media (max-width: 400px) {
  .btn-text {
    display: none;
  }
}


.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-group-item:hover {
  z-index: 2;
  background-color: #f8f9fa;
}
.account-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.account-header:hover {
  cursor: pointer;
}
.btn-group {
  display: flex;
  margin-left: 15px;
}
@media (min-width:576px) {
  .modal-dialog {
    margin: 16.75rem auto;
  }
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.account-header span:nth-child(1) {
  width: 25%;
}
.account-header span:nth-child(2) {
  width: 30%;
}
.account-header span:nth-child(3) {
  width: 30%;
}
.account-header span:nth-child(4) {
  width: 15%;
}
@media (max-width:700px) {
  .list-group-info {
    font-size: 12px;
  }
}
@media (max-width: 550px) {
  .container-fluid {
    padding: 0;
  }
}
@media (max-width: 450px) {
  .container-fluid {
    padding: 0;
  }
  .account-header span:nth-child(1) {
    display: none;
  }
  .account-header span:nth-child(2) {
    width: 40%;
  }
  .account-header span:nth-child(3) {
    width: 40%;
  }
  .account-header span:nth-child(4) {
    width: 20%;
  }
}
</style>
