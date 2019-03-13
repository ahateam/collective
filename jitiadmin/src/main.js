import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import VDistpicker from 'v-distpicker'
import constData from './assets/api/util/constData'
import axios from 'axios'
import util from 'ahaapi'
import api from './assets/api/util/utils'

Vue.use(VDistpicker)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$util = util

Vue.prototype.$api = api
Vue.prototype.$constData = constData



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
