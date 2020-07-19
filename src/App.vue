<template>
  <div id="app">
    <header class="header">
      <a href="/" class="header__logo">Мои счета</a>
      <button type="button" class="btn btn-add" @click="createAccount"><span class="btn-text" title="Добавить счет">Добавить</span><img src="./assets/icons/add.png" alt=""></button>
    </header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5 col-12">
          <p class="p-3">Доступные счета</p>
          <ul class="list-group list-group-flush mb-4">
            <li class="list-group-item" v-for="account in paginationItems" :key="account.id" @click="showInfo(account)">
              <div class="account-header">
                <h5 class="m-0">Счет {{account.id}}</h5>
                <span>{{account.balance}}</span>
              </div>
            </li>
          </ul>
          <nav class="ml-3" aria-label="Page navigation example" v-if="accounts.length > perPage">
            <ul class="pagination">
              <li class="page-item" @click="paginate(currentPage-1)">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" v-for="count in countPages" :key="count" @click="paginate(count)"><a class="page-link" :class="currentPage == count ? 'pagi-active' : ''" href="#">{{count}}</a></li>
              <li class="page-item" @click="paginate(currentPage+1)">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div class="col-lg-7 col-12" v-if="activeAccount">
          <p class="p-3">{{activeAccount ? 'Информация о счете № ' + activeAccount.id : ''}}</p>
          <ul class="list-group list-group-flush list-group-info" v-if="allTransactions.length">
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
          </ul>
          <div class="btn-group">
            <button class="btn btn-success" type="button" title="Пополнить счет" @click="upAccountModal(activeAccount)">Пополнить</button>
            <button class="btn btn-info mx-3" type="button" title="Потратить средства" @click="purchaseAccountModal(activeAccount)">Потратить</button>
            <button class="btn btn-warning" type="button" title="Удалить счет" @click="deleteAccount(activeAccount)">Удалить</button>
          </div>
        </div>
      </div> 
    </div>

    <up-account-modal v-if="showModalUp" :account="activeAccount" @close="showModalUp = false" @updateinfo="showInfo(activeAccount)">
    </up-account-modal>
    <purchase-modal v-if="showModalPurchase" :account="activeAccount" @close="showModalPurchase = false" @updateinfo="showInfo(activeAccount)">
    </purchase-modal>

  </div>
</template>

<script>
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
      allTransactions: [],
      perPage: 10
    }
  },
  created() {
    if(this.$store.state.token) {
      this.$store.dispatch('getAccounts'); // получаем список всех счетов пользователя и записываем в store

      this.$store.dispatch('getAccountPayUp'); // получаем список всех пополнений пользователя и записываем в store

      this.$store.dispatch('getAccountTransactions'); // получаем список всех транзакций пользователя и записываем в store
    } 
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
    },
    paginationItems() {
      let accounts = [...this.accounts];

      return accounts.splice((this.currentPage - 1) * this.perPage, this.perPage);
    },
    countPages() {
      return Math.ceil(this.accounts.length / this.perPage);
    },
    currentPage() {
      return this.$store.state.currentPage;
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
      })
    }, // фильтруем все транзакции по нужному счету и выводим с сортировкой по дате
    createAccount() {
      this.$store.dispatch('createAccount');
    },
    deleteAccount(account) {
      this.$store.dispatch('deleteAccount', account);
      this.activeAccount = null;

      if(this.currentPage > 1) {
        this.$store.commit('setCurrentPage', this.currentPage - 1);
      }
    },
    paginate(page) {
      if(page == 0 || page > this.countPages) return; // для кнопок +/- в пагинации

      this.$store.commit('setCurrentPage', page);
      this.activeAccount = null;
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
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-group-item:hover {
  z-index: 2;
  background-color: #f8f9fa;
  cursor: pointer;
}
.account-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.btn-group {
  display: flex;
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
.account-header span {
  padding: 0 3px;
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
.pagi-active {
  z-index: 3;
  outline: 0;
  box-shadow: 0 0 0 .2rem rgba(0,123,255,.25);
}
@media (min-width:576px) {
  .modal-dialog {
    margin: 16.75rem auto;
  }
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
  .btn-group {
    flex-direction: column;
  }
  .btn-group .btn {
    margin: 0 15px 15px 15px !important;
  }
}
@media (max-width: 500px) {
  .header {
    padding: 15px;
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
@media (max-width: 400px) {
  .btn-text {
    display: none;
  }
}
</style>
