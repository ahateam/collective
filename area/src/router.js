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
const childAdmin = ()=>import('./views/area/mech/childAdmin')
const childInfo = ()=>import('./views/area/mech/childInfo')
const addChild = ()=>import('./views/area/mech/addChild')
const memberImportInfo = ()=>import('./views/area/mech/memberImportInfo')
const memberImport = ()=>import('./views/area/mech/memberImport')
const memberImportRes = ()=>import('./views/area/mech/memberImportRes')
const memberErrorData= ()=>import('./views/area/mech/memberErrorData')
const assetImport = ()=>import('./views/area/mech/assetImport')
const assetImportInfo = ()=>import('./views/area/mech/assetImportInfo')
const assetImportRes = ()=>import('./views/area/mech/assetImportRes')
const assetErrorData = ()=>import('./views/area/mech/assetErrorData')

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

const areaExamine =()=>import('./views/area/examine/examine')
const areaExamineInfo =()=>import('./views/area/examine/examineInfo')
const areaExamineShare =()=>import('./views/area/examine/examineShare')

const areaPrintBook =()=>import('./views/area/print/printBook')
const areaPrintInfo =()=>import('./views/area/print/printInfo')
const areaPrintTemplate =()=>import('./views/area/print/printTemplate')
const areaPrintTemplate1 =()=>import('./views/area/print/printTemplate1')
const areaPrintTemplate2 =()=>import('./views/area/print/printTemplate2')
const areaPrintTemplate3 =()=>import('./views/area/print/printTemplate3')
const areaPrintTemplate4 =()=>import('./views/area/print/printTemplate4')

const areaPrintView =()=>import('./views/area/print/printView')
const areaFamilyList = ()=>import('./views/area/user/familyList')
const areaPrintViewInfo = ()=>import('./views/area/print/printPage/printViewInfo')
const areaPrintViewInfo1 = ()=>import('./views/area/print/printPage/printViewInfo1')
const areaPrintViewInfo2 = ()=>import('./views/area/print/printPage/printViewInfo2')
const areaPrintViewInfo3 = ()=>import('./views/area/print/printPage/printViewInfo3')
const areaPrintViewInfo4 = ()=>import('./views/area/print/printPage/printViewInfo4')

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
                path: '/childAdmin',
                name: 'childAdmin',
                component: childAdmin
            },
            {
                path: '/childInfo',
                name: 'childInfo',
                component: childInfo
            },
            {
                path: '/addChild',
                name: 'addChild',
                component: addChild
            },
            {
                path:'/areaAddMech',
                name:'areaAddMech',
                component:areaAddMech
            },//memberImportInfo
            {
                path:'/memberImportInfo',
                name:'memberImportInfo',
                component:memberImportInfo
            },
            {
                path:'/memberImport',
                name:'memberImport',
                component:memberImport
            },
            {
                path:'/memberImportRes',
                name:'memberImportRes',
                component:memberImportRes
            },
            {
                path:'/memberErrorData',
                name:'memberErrorData',
                component:memberErrorData
            },
            {
                path:'/assetImport',
                name:'assetImport',
                component:assetImport
            },
            {
                path:'/assetImportInfo',
                name:'assetImportInfo',
                component:assetImportInfo
            },
            {
                path:'/assetImportRes',
                name:'assetImportRes',
                component:assetImportRes
            },
            {
                path:'/assetErrorData',
                name:'assetErrorData',
                component:assetErrorData
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
            },
            {
                path:'/areaExamine',
                name:'areaExamine',
                component:areaExamine
            },
            {
                path:'/areaExamineInfo',
                name:'areaExamineInfo',
                component:areaExamineInfo
            },
            {
                path:'/areaExamineShare',
                name:'areaExamineShare',
                component:areaExamineShare
            },
            {
                path:'/areaPrintBook',
                name:'areaPrintBook',
                component:areaPrintBook
            },
            {
                path:'/areaPrintInfo',
                name:'areaPrintInfo',
                component:areaPrintInfo
            },
            {
                path:'/areaPrintTemplate',
                name:'areaPrintTemplate',
                component:areaPrintTemplate
            },
            {
                path:'/areaPrintTemplate1',
                name:'areaPrintTemplate1',
                component:areaPrintTemplate1
            },
            {
                path:'/areaPrintTemplate2',
                name:'areaPrintTemplate2',
                component:areaPrintTemplate2
            },
            {
                path:'/areaPrintTemplate3',
                name:'areaPrintTemplate3',
                component:areaPrintTemplate3
            },
            {
                path:'/areaPrintTemplate4',
                name:'areaPrintTemplate4',
                component:areaPrintTemplate4
            },
            {
                path:'/areaPrintView',
                name:'areaPrintView',
                component:areaPrintView
            },
            {
                path:'/areaFamilyList',
                name:'areaFamilyList',
                component:areaFamilyList
            },
            {
                path:'/areaPrintViewInfo',
                name:'areaPrintViewInfo',
                component:areaPrintViewInfo
            },
            {
                path:'/areaPrintViewInfo1',
                name:'areaPrintViewInfo1',
                component:areaPrintViewInfo1
            },
            {
                path:'/areaPrintViewInfo2',
                name:'areaPrintViewInfo2',
                component:areaPrintViewInfo2
            },
            {
                path:'/areaPrintViewInfo3',
                name:'areaPrintViewInfo3',
                component:areaPrintViewInfo3
            },
            {
                path:'/areaPrintViewInfo4',
                name:'areaPrintViewInfo4',
                component:areaPrintViewInfo4
            }
        ]
    },
  ]
})
