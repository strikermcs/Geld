<template>
   <w-card title="Курс валют" 
        bg-color="warning-dark1" 
        color="white"
        class="card_two"
        >
        <w-table
          :headers="table.headers"
          :items="getTableItems">
        </w-table>
    </w-card>
</template>


<script>
import { NormalizeDate } from '../plugins/date.plugin'

export default {
  props: ['rates', 'date'],
   data: () => ({
      table: {
        headers: [
          { label: 'Валюта', key: 'currency' },
          { label: 'Курс', key: 'kurs' },
          { label: 'Дата', key: 'date' }
        ],
      },
      currencies: ['UAH','USD','EUR']
  }),

  computed: {
    getTableItems(){
      const Items = []
      this.currencies.forEach(cur => {
         const item = {currency: cur, kurs: this.rates[cur],
           date: NormalizeDate(this.date, 'date')}
        Items.push(item)   
      })
      return Items
    }
  },


}
</script>