import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('./views/admin/home/home')
const login = () => import('./views/admin/login/login')
const dashboard  = ()=>import('./views/admin/home/dashboard')
const  newMech = ()=>import('./views/admin/login/newMech')
const  register = ()=>import('./views/admin/login/register')
const  memberList = ()=>import('./views/admin/member/memberList')
const  vote = ()=>import('./views/admin/vote/vote')
const  assets = ()=>import('./views/admin/assets/assets')
const  assetsInfo = ()=>import('./views/admin/assets/assetsInfo')
const  mechanism = ()=>import('./views/admin/mechanism/mechanism')
const  poll = ()=>import('./views/admin/poll/poll')
const  pollInfo = ()=>import( './views/admin/poll/pollInfo')
const  addMech = ()=>import('./views/admin/mechanism/addMech')
const  mechInfo = ()=>import('./views/admin/mechanism/mechInfo')
const  mechMoney = ()=>import('./views/admin/mechanism/mechMoney')
const  editMech = ()=>import('./views/admin/mechanism/editMech')
const  memberAdd = ()=>import('./views/admin/member/memberAdd')
const  memberEdit = ()=>import('./views/admin/member/memberEdit')
const  memberEditPost = ()=>import('./views/admin/member/memberEditPost')
const  memberGroup = ()=>import('./views/admin/member/memberGroup')
const  memberPost = ()=>import('./views/admin/member/memberPost')
const  memberMail = ()=>import('./views/admin/member/memberMail')
const  voteAdd = ()=>import('./views/admin/vote/voteAdd')
const  voteInfo = ()=>import('./views/admin/vote/voteInfo')
const  voteEdit = ()=>import('./views/admin/vote/voteEdit')
const  page = ()=>import('./views/admin/page/page')
const  bonus = ()=>import('./views/admin/bonus/bonus')
const  article = ()=>import('./views/admin/article/artice')
const  tagList  = ()=>import('./views/admin/article/tagList')
const  articleAdd = ()=>import('./views/admin/article/articleAdd')
const  asset = ()=>import('./views/admin/assets/asset')
const applyMech  = ()=>import('./views/admin/mechanism/applyMech')

//演示系统
const demoDashboard = ()=> import( './views/demo/home/dashboard')
const demoAsset = ()=> import( './views/demo/asset/asset')
const demoAssetList= ()=> import( './views/demo/asset/assetList')
const demoAssetInfo = ()=> import('./views/demo/asset/assetInfo')
const demoVote =()=> import( './views/demo/vote/vote')


Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
            name: 'home',
            component: home,
            children:[
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: dashboard
                },
                {
                    path:'/page',
                    name:'page',
                    component:page
                },
                {
                    path:'/mechanism',
                    name:'mechanism',
                    component:mechanism,
                },

                {
                    path:'/poll',
                    name:'poll',
                    component:poll
                },
                {
                    path:'/pollInfo',
                    name:'pollInfo',
                    component:pollInfo
                },


                {
                    path: '/vote',
                    name: 'vote',
                    component: vote
                },
                {
                    path: '/assets',
                    name: 'assets',
                    component: assets
                },
                {
                    path:'/assetsInfo',
                    name:'assetsInfo',
                    component:assetsInfo
                },
                {
                    path: '/bonus',
                    name: 'bonus',
                    component: bonus
                },
                {
                    path:'/addMech',
                    name:'addMech',
                    component:addMech
                },
                {
                    path:'/mechInfo',
                    name:'mechInfo',
                    component:mechInfo
                },
                {
                    path:'/mechMoney',
                    name:'mechMoney',
                    component:mechMoney
                },
                {
                    path:'/applyMech',
                    name:'applyMech',
                    component:applyMech
                },
                {
                    path:'/editMech',
                    name:'editMech',
                    component:editMech
                },
                {
                    path:'/memberMail',
                    name:'memberMail',
                    component:memberMail
                },
                {
                    path:'/memberList',
                    name:'memberList',
                    component:memberList
                },
                {
                    path:'/memberAdd',
                    name:'memberAdd',
                    component:memberAdd
                },
                {
                    path:'/memberEdit',
                    name:'memberEdit',
                    component:memberEdit
                },
                {
                    path:'/memberGroup',
                    name:'memberGroup',
                    component:memberGroup
                },
                {
                    path:'/memberPost',
                    name:'memberPost',
                    component:memberPost
                },
                {
                    path:'/voteAdd',
                    name:'voteAdd',
                    component:voteAdd
                },
                {
                    path:'/voteInfo',
                    name:'voteInfo',
                    component:voteInfo
                },
                {
                    path:'/memberEditPost',
                    name:'memberEditPost',
                    component:memberEditPost
                },
                {
                    path:'/voteEdit',
                    name:'voteEdit',
                    component:voteEdit
                },
                {
                    path:'/voteInfo',
                    name:'voteInfo',
                    component:voteInfo
                },
                {
                    path:'/bonus',
                    name:'bonus',
                    component:bonus
                },
                {
                    path:'/article',
                    name:'article',
                    component:article
                },
                {
                    path:'/tagList',
                    name:'tagList',
                    component:tagList
                },
                {
                    path:'/articleAdd',
                    name:'articleAdd',
                    component:articleAdd
                },
                {
                    path:'/asset',
                    name:'asset',
                    component:asset
                },

                //演示系统
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
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path:'/register',
            name:'register',
            component:register
        },
        {
            path:'/newMech',
            name:'newMech',
            component:newMech
        }

    ]
})
