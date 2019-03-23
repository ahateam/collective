import Vue from 'vue'
import Router from 'vue-router'
import asset from './views/asset/asset'
import assetList from './views/asset/assetList'
import assetInfo from './views/asset/assetInfo'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
        {
          path: '/',
          name: 'asset',
          component: asset
        },
        {
          path: '/asset',
          name: 'asset',
          component: asset
        },
      {
          path:'/assetList',
          name:'assetList',
          component:assetList
      },
      {
          path:'/assetInfo',
          name:'assetInfo',
          component:assetInfo
      }
  ]
})
