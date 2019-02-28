import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home'
import login from './views/login/login'
import dashboard from './views/home/dashboard'
import newMech from './views/login/newMech'
import register from './views/login/register'

import memberList from './views/member/memberList'
import vote from './views/vote/vote'
import assets from './views/assets/assets'
import assetsInfo from './views/assets/assetsInfo'
import mechanism from './views/mechanism/mechanism'

import poll from './views/poll/poll'
import pollInfo from './views/poll/pollInfo'

import addMech from './views/mechanism/addMech'
import mechInfo from './views/mechanism/mechInfo'
import mechMoney from './views/mechanism/mechMoney'

import editMech from './views/mechanism/editMech'
import memberAdd from './views/member/memberAdd'
import memberEdit from './views/member/memberEdit'
import memberEditPost from './views/member/memberEditPost'
import memberGroup from './views/member/memberGroup'
import memberPost from './views/member/memberPost'
import memberMail from './views/member/memberMail'

import voteAdd from './views/vote/voteAdd'
import voteInfo from './views/vote/voteInfo'
import voteEdit from './views/vote/voteEdit'
import page from './views/page/page'


import bonus from './views/bonus/bonus'
import article from './views/article/artice'
import tagList from './views/article/tagList'
import articleAdd from './views/article/articleAdd'




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
