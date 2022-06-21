import { defineStore } from "pinia";
import firebase from 'firebase/compat/app'
import { getUid } from "./common";
import { useErrorStore } from "./error";

export const useCategoryStore = defineStore('category', {
  actions: {
    async fetchCategories(){
      try {
        const uid = await getUid()
        const categories =  (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        return Object.keys(categories).map(key => ({...categories[key], id: key}))

      } catch (e) {

        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e
        
      }
    },

    async fetchCategoryById(id){
      try{
        const uid = await getUid()
         const category =  (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
         
        
         return {...category, id}


      }catch(e){
        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e
      }
   },

   async createCategory({title, limit}){
      try{
        const uid = await getUid()
        const category =  await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
          return {title, limit, id: category.key}

      }catch(e){
        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e
      }
    },

    async updateCategory({title, limit, id}){
      try{
          const uid = await getUid()
          await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      }catch(e){
        const errorStore = useErrorStore()
        errorStore.setError(e)
        throw e
      }
    }     
  }
})