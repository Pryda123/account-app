<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <header class="header">
      <a href="/" class="header__logo">Мои счета</a>
      <button type="button" class="btn btn-add" data-toggle="modal" data-target="#exampleModal"><span class="btn-text">Добавить</span><img src="./assets/icons/add.png" alt=""></button>
    </header>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5 col-12">
          <p class="p-3">Доступные счета</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="account-header" @click="showInfo(1)">
                <h5 class="m-0">Счет 1</h5>
                <span>5 000 000</span>
              </div>
              <div class="btn-group">
                <!-- <button class="btn" type="button" @click="upAccountModal(2)"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button> -->
                <button class="btn" type="button" @click="upAccountModal"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" @click="purchaseAccountModal"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет"></button>
              </div>
            </li>
            <li class="list-group-item">
              <div class="account-header" @click="showInfo(2)">
                <h5 class="m-0">Счет 2</h5>
                <span>5 000 000</span>
              </div>
              <div class="btn-group">
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal2"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет"></button>
              </div>
            </li>
            <li class="list-group-item">
              <div class="account-header" @click="showInfo(3)">
                <h5 class="m-0">Счет 3</h5>
                <span>5 000 000</span>
              </div>
              <div class="btn-group">
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal2"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет"></button>
              </div>
            </li>
            <li class="list-group-item">
              <div class="account-header" @click="showInfo(4)">
                <h5 class="m-0">Счет 4</h5>
                <span>5 000 000</span>
              </div>
              <div class="btn-group">
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal"><img src="./assets/icons/add.png" alt="" title="Пополнить счет"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal2"><img src="./assets/icons/checked.png" alt="" title="Потратить средства"></button>
                <button class="btn" type="button" data-toggle="modal" data-target="#exampleModal3"><img src="./assets/icons/delete.png" alt="" title="Удалить счет"></button>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="col-lg-7 col-12">
          <p class="p-3">Информация о счете</p>
          <ul class="list-group list-group-flush" v-if="indexOfAccount==1">
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item alert-danger">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>Товар</span>
                  <span>Сумма</span>
                </div>
              </div>
            </li>
          </ul>
          <ul class="list-group list-group-flush" v-if="indexOfAccount==2">
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item alert-danger">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>Товар</span>
                  <span>Сумма</span>
                </div>
              </div>
            </li>
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
          </ul>
          <ul class="list-group list-group-flush" v-if="indexOfAccount==3">
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item alert-danger">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>Товар</span>
                  <span>Сумма</span>
                </div>
              </div>
            </li>
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item alert-danger">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>Товар</span>
                  <span>Сумма</span>
                </div>
              </div>
            </li>
          </ul>
          <ul class="list-group list-group-flush" v-if="indexOfAccount==4">
            <li class="list-group-item alert-success">
              <div class="account-header">
                <span>Пополнение</span>
                <span>Сумма</span>
              </div>
            </li>
            <li class="list-group-item alert-danger">
              <div class="account-header">
                <span>Списание</span>
                <div>
                  <span>Товар</span>
                  <span>Сумма</span>
                </div>
              </div>
            </li>
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
    <up-account-modal v-if="showModalUp" @close="showModalUp = false">
    </up-account-modal>
    <purchase-modal v-if="showModalPurchase" @close="showModalPurchase = false">
    </purchase-modal>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import axios from "axios"
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
      indexOfAccount: null
    }
  },
  created() {

    console.log('1321231321231')
  },
  methods: {
    upAccountModal() {
      this.showModalUp = true;
    },
    purchaseAccountModal() {
      this.showModalPurchase = true;
    },
    showInfo(index) {
      this.indexOfAccount = index;
      console.log('admdsmdslak')
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
</style>
