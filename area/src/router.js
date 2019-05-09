import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login'
import page from  './views/page'
import register from './views/register'

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
const areaChildMech = ()=>import('./views/area/mech/childMech')
const areaAddMech = ()=>import('./views/area/mech/addMech')
const areaManageApplyMech = ()=>import('./views/area/mech/manageApplyMech')
const areaManageMech = ()=>import('./views/area/mech/manageMech')
const areaMechInfo = ()=>import('./views/area/mech/mechInfo')
const areaEditMech = ()=>import('./views/area/mech/editMech')

const areaAsset = ()=>import('./views/area/asset/asset')
const areaAssetsInfo = ()=>import('./views/area/asset/assetsInfo')
const areaVote = ()=>import('./views/area/vote/vote')
const areaVoteInfo = ()=>import('./views/area/vote/voteInfo')
const areaVoteUser = ()=>import('./views/area/vote/voteUser')
const areaBank = ()=>import('./views/area/bank/bank')
const areaAddBank = ()=>import('./views/area/bank/addBank')
const areaSetAdminBank = ()=>import('./views/area/bank/setAdminBank')
const  areaSetChildUser = ()=>import('./views/area/user/setChildUser')

const areaUser = ()=>import('./views/area/user/user')
const areaChildUser =()=>import('./views/area/user/childUser')



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
          path: '/register',
          name: 'register',
          component: register,
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
                path: '/areaChildMech',
                name: 'areaChildMech',
                component: areaChildMech
            },
            {
                path:'/areaAddMech',
                name:'areaAddMech',
                component:areaAddMech
            },
            {
                path:'/areaManageApplyMech',
                name:'areaManageApplyMech',
                component:areaManageApplyMech
            },
            {
                path:'/areaManageMech',
                name:'areaManageMech',
                component:areaManageMech
            },
            {
                path:'/areaMechInfo',
                name:'areaMechInfo',
                component:areaMechInfo
            },
            {
                path:'/areaEditMech',
                name:'areaEditMech',
                component:areaEditMech
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
            {
                path:'/areaBank',
                name:'areaBank',
                component:areaBank
            },
            {
                path:'/areaAddBank',
                name:'areaAddBank',
                component:areaAddBank
            },
            {
                path:'/areaSetAdminBank',
                name:'areaSetAdminBank',
                component:areaSetAdminBank
            },
            {
                path:'/areaUser',
                name:'areaUser',
                component:areaUser
            },
            {
                path:'/areaChildUser',
                name:'areaChildUser',
                component:areaChildUser
            },
            {
                path:'/areaSetChildUser',
                name:'areaSetChildUser',
                component:areaSetChildUser
            }
        ]
    },
  ]
})
