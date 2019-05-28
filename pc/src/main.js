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
import demo from './assets/api/util/demo'
import vueConfig from '../vue.config.js'


Vue.use(VDistpicker)
Vue.use(ElementUI)
Vue.prototype.$baseURL = vueConfig.baseUrl

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$util = util

Vue.prototype.$api = api
Vue.prototype.$demo = demo
Vue.prototype.$constData = constData


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')