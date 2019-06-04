import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        meetInfo:'',
        meetKey:'',
        wxInfo:{
            // APPID:'wx45c8f4bda5af8953',
            // SECRET:'a50bde97bf25f32bdcdc30e20b9741ba',
            // REDIRECT_URI:'jiti.test.3ch.org.cn/wap/index.html#/userWX'
            //农企助手
            APPID:'wx547972e25ec85006',
            SECRET:'0406d93e33c3400e3b4b673ea86a2679',
            REDIRECT_URI:'http://jiti.test.3ch.org.cn/wap/index.html'
        },

    },
    mutations: {

    },
    actions: {

    }
})
