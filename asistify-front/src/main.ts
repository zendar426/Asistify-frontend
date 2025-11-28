import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import './styles.css'

import App from './App.vue'
import router from './router'

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

library.add(fas, far, fab)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(VueApexCharts)
app.mount('#app')
