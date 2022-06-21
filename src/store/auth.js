import { defineStore } from 'pinia'
import firebase from 'firebase/compat/app'
import { useErrorStore } from './error'
import { useInfoStore } from './info'
import { getUid } from './common'


export const useAuthStore = defineStore('Auth', {
    actions: {
      
      async login(email, password){
        try {

          await firebase.auth().signInWithEmailAndPassword(email, password)         
        
        } catch (e) {
          const errorStore = useErrorStore()
          errorStore.setError(e)
          throw e
        }
      },

      async register(email, password, name){
        
        try { 
          await firebase.auth().createUserWithEmailAndPassword(email, password)
          const uid = await getUid()
          await firebase.database().ref(`/users/${uid}/info`).set({
            bill: 0,
            name: name
          })
        } catch (e) {
          const errorStore = useErrorStore()
          errorStore.setError(e)
          throw e
        }
      },
      
      async logout(){
        await firebase.auth().signOut()
        const info = useInfoStore()
        info.clearInfo()
      }
    }
})

