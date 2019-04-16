import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import constData from './data/constData'
import util from 'ahaapi'
import VCharts from 'v-charts'
import area from './data/api/area'
import bank from './data/api/bank'
import demo from './data/api/demo'


Vue.use(ElementUI)
Vue.use(VCharts)

Vue.config.productionTip = false
Vue.prototype.$constData = constData
Vue.prototype.$util = util
Vue.prototype.$area = area
Vue.prototype.$bank = bank
Vue.prototype.$demo = demo



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
