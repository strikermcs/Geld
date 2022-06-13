import { defineStore } from 'pinia'


export const useCurrencyStore = defineStore('currency', {
  
  state: () => ({
    currency: null
  }),

  actions: {
    async fetchCurrency(){
      const key = import.meta.env.VITE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=UAH,USD,EUR`)
      return await res.json()
    }
  }
})