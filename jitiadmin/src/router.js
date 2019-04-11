import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('./views/home/home')
const login = () => import('./views/login/login')
const dashboard  = ()=>import('./views/home/dashboard')
const  newMech = ()=>import('./views/login/newMech')
const  register = ()=>import('./views/login/register')
const  memberList = ()=>import('./views/member/memberList')
const  vote = ()=>import('./views/vote/vote')
const  assets = ()=>import('./views/assets/assets')
const  assetsInfo = ()=>import('./views/assets/assetsInfo')
const  mechanism = ()=>import('./views/mechanism/mechanism')
const  poll = ()=>import('./views/poll/poll')
const  pollInfo = ()=>import( './views/poll/pollInfo')
const  addMech = ()=>import('./views/mechanism/addMech')
const  mechInfo = ()=>import('./views/mechanism/mechInfo')
const  mechMoney = ()=>import('./views/mechanism/mechMoney')
const  editMech = ()=>import('./views/mechanism/editMech')
const  memberAdd = ()=>import('./views/member/memberAdd')
const  memberEdit = ()=>import('./views/member/memberEdit')
const  memberEditPost = ()=>import('./views/member/memberEditPost')
const  memberGroup = ()=>import('./views/member/memberGroup')
const  memberPost = ()=>import('./views/member/memberPost')
const  memberMail = ()=>import('./views/member/memberMail')
const  voteAdd = ()=>import('./views/vote/voteAdd')
const  voteInfo = ()=>import('./views/vote/voteInfo')
const  voteEdit = ()=>import('./views/vote/voteEdit')
const  page = ()=>import('./views/page/page')
const  bonus = ()=>import('./views/bonus/bonus')
const  article = ()=>import('./views/article/artice')
const  tagList  = ()=>import('./views/article/tagList')
const  articleAdd = ()=>import('./views/article/articleAdd')
const  asset = ()=>import('./views/assets/asset')
const applyMech  = ()=>import('./views/mechanism/applyMech')

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
                }
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
