import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import constData from './assets/api/util/constData'
import commen from './assets/api/commen/commen'
import util from 'ahaapi'
import api from './assets/api/util/utils'
import bank from './assets/api/util/bank'



Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$util = util
Vue.prototype.$constData = constData
Vue.prototype.$api = api
Vue.prototype.$bank = bank
Vue.prototype.$commen = commen

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
