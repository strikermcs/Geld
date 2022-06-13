import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
  
  state:() => ({
    error: null
  }),

  actions: {
    setError(error){
      this.error = error
    }
  }
})