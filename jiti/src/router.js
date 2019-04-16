import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login'
import page from  './views/login'

//演示系统
const demoHome = ()=>import('./views/demo/home/demoHome')
const demoDashboard = ()=> import( './views/demo/home/dashboard')
const demoAsset = ()=> import( './views/demo/asset/asset')
const demoAssetList= ()=> import( './views/demo/asset/assetList')
const demoAssetInfo = ()=> import('./views/demo/asset/assetInfo')
const demoVote =()=> import( './views/demo/vote/vote')


//银行查询系统
const bankHome = ()=>import('./views/bank/home/bankHome')
const bankDashboard = ()=>import('./views/bank/home/dashboard')
const bankAsset = ()=>import('./views/bank/asset/asset')
const bankAssetsInfo = ()=>import('./views/bank/asset/assetsInfo')
const bankVote = ()=>import('./views/bank/vote/vote')
const bankVoteInfo = ()=>import('./views/bank/vote/voteInfo')
const bankVoteUser = ()=>import('./views/bank/vote/voteUser')




//区级管理平台
const areaHome = ()=>import('./views/area/home/areaHome')
const areaDashboard = ()=>import('./views/area/home/dashboard')
const areaMech = ()=>import('./views/area/mech/mech')
const areaAsset = ()=>import('./views/area/asset/asset')
const areaAssetsInfo = ()=>import('./views/area/asset/assetsInfo')
const areaVote = ()=>import('./views/area/vote/vote')
const areaVoteInfo = ()=>import('./views/area/vote/voteInfo')
const areaVoteUser = ()=>import('./views/area/vote/voteUser')









Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'login',
          component: login,
      },
      {
          path:'/login',
          name:'login',
          component:login
      },
      {
          path:'/page',
          name:'page',
          component:page,
      },


    //演示平台
    {
        path:'/demoHome',
        name:'demoHome',
        component:demoHome,
        children:[
            {
                path:'/demoDashboard',
                name:'demoDashboard',
                component:demoDashboard
            },
            {
                path: '/demoAsset',
                name: 'demoAsset',
                component: demoAsset
            },
            {
                path:'/demoAssetList',
                name:'demoAssetList',
                component:demoAssetList
            },
            {
                path:'/demoAssetInfo',
                name:'demoAssetInfo',
                component:demoAssetInfo
            },
            {
                path:'/demoVote',
                name:'demoVote',
                component:demoVote
            },
        ]
    },

    //银行平台
    {
        path:'/bankHome',
        name:'bankHome',
        component:bankHome,
        children: [
            {
                path:'/bankDashboard',
                name:'bankDashboard',
                component:bankDashboard
            },
            {
                path:'/bankAsset',
                name:'bankAsset',
                component:bankAsset
            },
            {
                path:'/bankAssetsInfo',
                name:'bankAssetsInfo',
                component:bankAssetsInfo
            },
            {
                path:'/bankVote',
                name:'bankVote',
                component:bankVote
            },
            {
                path:'/bankVoteInfo',
                name:'bankVoteInfo',
                component:bankVoteInfo
            },
            {
                path:'/bankVoteUser',
                name:'bankVoteUser',
                component:bankVoteUser
            },

        ]
    },



    //区级平台
    {
        path: '/areaHome',
        name: 'areaHome',
        component: areaHome,
        children:[
            {
                path:'/areaDashboard',
                name:'areaDashboard',
                component:areaDashboard
            },
            {
                path: '/areaMech',
                name: 'areaMech',
                component: areaMech
            },
            {
                path: '/areaAsset',
                name: 'areaAsset',
                component: areaAsset
            },
            {
                path: '/areaAssetsInfo',
                name: 'areaAssetsInfo',
                component: areaAssetsInfo
            },
            {
                path: '/areaVote',
                name: 'areaVote',
                component: areaVote
            },
            {
                path: '/areaVoteInfo',
                name: 'areaVoteInfo',
                component: areaVoteInfo
            },
            {
                path: '/areaVoteUser',
                name: 'areaVoteUser',
                component: areaVoteUser
            },
        ]
    },
  ]
})
