import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import constData from './assets/api/util/constData'
import util from 'ahaapi'
import api from './assets/api/util/utils'


Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$util = util
Vue.prototype.$constData = constData
Vue.prototype.$api = api



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
