import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import './mock/index'
import constData from './assets/api/util/constData'
import util from './assets/api/util/util'


Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$util = util
Vue.prototype.$constData = constData
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
