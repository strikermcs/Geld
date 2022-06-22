import { defineStore } from 'pinia'


export const useCurrencyStore = defineStore('currency', {
  
  state: () => ({
    currency: null
  }),

  actions: {
    async fetchCurrency(){
      const key = import.meta.env.VITE_APP_FIXER
      const res = await fetch("https://api.apilayer.com/fixer/latest?symbols=UAH,USD,EUR&base=UAH", requestOptions)
      return await res.json()
    }
  }
})


const myHeaders = new Headers();
myHeaders.append("apikey", import.meta.env.VITE_APP_FIXER);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

