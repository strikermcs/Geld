import firebase from 'firebase/compat/app'
import { defineStore } from 'pinia'
import { getUid } from './common'
import { useErrorStore } from './error'

export const useRecordStore = defineStore('record', {
  actions:{
    async createRecord(record){
      try{
          const uid =  await getUid()
          return await firebase.database().ref(`/users/${uid}/record`).push(record)
      }catch (e){
          const errorStore = useErrorStore()
          errorStore.setError(e)
          throw e
      }
    },

    async fetchRecords(){
        try{
            const uid = await getUid()
            const records =  (await firebase.database().ref(`/users/${uid}/record`).once('value')).val() || {}
    
            return Object.keys(records).map(key => ({...records[key], id: key}))      
        }catch (e){
          const errorStore = useErrorStore()
          errorStore.setError(e)
          throw e
        }
    },

    async fetchRecordById(id){
        try{
            const uid = await getUid()
            const record =  (await firebase.database().ref(`/users/${uid}/record`).child(id).once('value')).val() || {}
  
            return {...record, id: id}      

        }catch (e){
          const errorStore = useErrorStore()
          errorStore.setError(e)
          throw e
        }
    }
  }
})