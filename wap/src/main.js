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



Vue.use(Vant)

Vue.config.productionTip = false
axios.defaults.baseURL='http://47.99.212.32/api/jiti'
Vue.prototype.$http = axios
Vue.prototype.$util = util
Vue.prototype.$constData = constData


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
