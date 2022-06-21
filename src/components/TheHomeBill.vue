<template>
   <w-card title="Счет в валюте"
         bg-color="blue" 
         color="white"
         class="card_one"
         >
          <div v-for="cur in currencies" :key="cur">
            <p class="title2 mt5">{{this.$currency(getCurrency(cur), cur)}}</p>
            <w-divider class="mt2" color="white"></w-divider>
          </div>      
    </w-card>
</template>


<script>
import { useInfoStore } from '../store/info'
import { mapState} from 'pinia'

export default {
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  computed:{
    ...mapState(useInfoStore, ['info']),

    base(){
      return this.info.bill / (this.rates['UAH'] / this.rates['EUR'])
    }
  },
  methods:{
    getCurrency(currency){
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>

