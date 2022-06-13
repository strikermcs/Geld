import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import datePlugin from './plugins/date.plugin'
import { createPinia } from 'pinia'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

new WaveUI(app, {
 
}) 

firebase.initializeApp({
  apiKey: "AIzaSyAmyYdv5cc1ZUUta1ydp4sHLI9BYc5_OJ4",
  authDomain: "ncrisisl.firebaseapp.com",
  databaseURL: "https://ncrisisl.firebaseio.com",
  projectId: "ncrisisl",
  storageBucket: "ncrisisl.appspot.com",
  messagingSenderId: "661600256027",
  appId: "1:661600256027:web:b5e905e65291204bc338be",
  measurementId: "G-4MB05L8Y3V"
});


app.use(router)
app.use(createPinia())
app.use(datePlugin)

firebase.auth().onAuthStateChanged(() => {
  app.mount('#app')
})


