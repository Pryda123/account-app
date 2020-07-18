<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Совершить покупку</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="$emit('close')">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Название товара</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="merchant">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Сумма</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="amount">
                            <div class="input-group-append">
                                <span class="input-group-text">руб.</span>
                            </div>
                        </div>
                        <p v-if="warningMessage" class="alert alert-danger" role="alert">Недостаточно средств</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="$emit('close')">Отменить</button>
                        <button type="button" class="btn btn-primary" @click="sendSuccess">Оплатить</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from "axios"

export default {
    name: 'PurchaseModal',
    props: ['account'],
    data() {
        return {
            merchant: null,
            amount: null,
            warningMessage: false
        }
    },
    methods: {
        async sendSuccess() {
            try {
                await axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/bank/transaction/',
                    headers: {
                        Authorization: 'Token ' + this.$store.state.token
                    },
                    data: {
                        account: this.account.id,
                        merchant: this.merchant,
                        amount: this.amount
                    }
                });
                
                let balance = String((+this.account.balance - +this.amount).toFixed(2));
                let obj = {
                    id: this.account.id,
                    balance: balance
                }
                this.$store.commit('upBalance', obj);

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
                    this.$emit('updateinfo');
                } catch(e) {
                    console.error(e);
                } // получаем список всех транзакций пользователя и записываем в store

                this.$emit('close')
            } catch(e) {
                this.warningMessage = true;
                console.error(e)
            }
        }
    }
}
</script>