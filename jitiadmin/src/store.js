import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      navDefaultActive : '0',
      groupKeyword:'sys_content_tag',
      memberActive:'groups',            //成员管理-通讯录的tab默认选中
  },
  mutations: {

  },
  actions: {

  }
})
