<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Пополнить счет</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-default">Сумма</span>
                            </div>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="amount">
                            <div class="input-group-append">
                                <span class="input-group-text">руб.</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">Отменить</button>
                        <button type="button" class="btn btn-primary" @click="sendSuccess">Пополнить</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'UpAccountModal',
    props: ['account'],
    data() {
        return {
            amount: null
        }
    },
    methods: {
        async sendSuccess() {
            let payload = {...this.account};
            payload.amount = this.amount;

            try {
                await this.$store.dispatch('upAccount', payload);
            } catch(e) {
                console.error(e);
                return;
            }
            
            let balance = String((+this.account.balance + +this.amount).toFixed(2));
            let obj = {
                id: this.account.id,
                balance: balance
            }
            this.$store.commit('upBalance', obj);

            await this.$store.dispatch('getAccountPayUp');

            this.$emit('updateinfo');
            this.$emit('close');
        }
    }
}
</script>