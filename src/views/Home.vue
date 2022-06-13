<template>
  <div class="page_body">
    <div class="page_title w-flex justify-space-between">
      <h2>Счет</h2>
      <w-button class="pa4" @click="refreshHandle">
        <w-icon md>mdi mdi-refresh</w-icon>
      </w-button>
    </div>
    <w-divider class="my6 mx-3"></w-divider>
    <Loader v-if="loading"/>
    <w-flex gap="6" wrap class="cards" v-else>
       <TheHomeBill :rates="currency.rates"/>
       <TheHomeCurrency :rates="currency.rates" :date="currency.date"/>
    </w-flex>
  </div>
</template>


<script>
import TheHomeBill from '../components/TheHomeBill.vue'
import TheHomeCurrency from '../components/TheHomeCurrency.vue'
import Loader from '../components/app/Loader.vue'
import { mapActions } from 'pinia'
import { useCurrencyStore } from '../store/currency'

export default {
  data: () => ({
    loading: true,
    currency: null, 
  }),
  
  methods:{
    ...mapActions(useCurrencyStore, ['fetchCurrency']),

    async refreshHandle(){
      this.loading = true
      this.currency = await this.fetchCurrency()
      this.loading = false
    }
  },

  async mounted(){
    this.currency = await this.fetchCurrency()
    this.loading = false
  },
 
  components:{
    TheHomeBill,
    TheHomeCurrency,
    Loader
  }
  
}
</script>

<style scoped>
.cards {
  height: 310px;
}

.card_one {
  width: 40%;
}

.card_two {
  width: 56%;
}

@media screen and (max-width: 900px) {
  .card_one, .card_two {
    width: 100%;
  }

  .cards {
    height: 600px;
  }
}
</style>