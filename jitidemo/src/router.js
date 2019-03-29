import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home'
import asset from './views/asset/asset'
import assetList from './views/asset/assetList'
import assetInfo from './views/asset/assetInfo'
import vote from './views/vote/vote'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
        path:'/',
          name:'home',
          component:home
      },
        {
          path: '/home',
          name: 'home',
          component: home
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
      },
      {
          path:'/vote',
          name:'vote',
          component:vote
      }
  ]
})
