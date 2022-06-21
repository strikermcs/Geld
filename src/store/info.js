import firebase from 'firebase/compat/app'
import { defineStore } from 'pinia'
import { useErrorStore } from './error'
import { getUid } from './common'

export const useInfoStore = defineStore('info', {
  state: () => ({
    info: {}
  }),

  getters: {
    getUserName(state) {
      return state.info.name
    }
  },

  actions: {
    
    clearInfo(){
      this.info = {}
    },

    async updateInfo(toUpdate){
      try {
        const uid = await getUid()
        const updateData = {...this.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        this.info = updateData
      } catch (e) {
        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e 
      }
    },

    async fetchInfo(){
      try {
        const uid = await getUid()
        this.info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
      } catch (e) {
        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e 
      }
    }


  }
})


