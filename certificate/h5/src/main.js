import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import api from './commen/api'
import util from 'ahaapi'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$util = util
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
