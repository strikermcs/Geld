import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'
import datePlugin from './plugins/date.plugin'
import { createPinia } from 'pinia'

import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

new WaveUI(app, {
 
}) 


app.use(router)
app.use(createPinia())
app.use(datePlugin)

app.mount('#app')
