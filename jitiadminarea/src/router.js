import Vue from 'vue'
import Router from 'vue-router'

import login from './views/login/login'
import home from './views/home/home'
import dashboard from './views/home/dashboard'
import page from './views/home/page'
import mech from './views/mech/mech'
import asset from './views/asset/asset'
import assetsInfo from './views/asset/assetsInfo'
import vote from './views/vote/vote'
import voteInfo from './views/vote/voteInfo'
import voteUser from './views/vote/voteUser'



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
                    path:'/mech',
                    name:'mech',
                    component:mech
                },
                {
                    path:'/asset',
                    name:'asset',
                    component:asset
                },
                {
                    path:'/assetsInfo',
                    name:'assetsInfo',
                    component:assetsInfo
                },
                {
                    path:'/vote',
                    name:'vote',
                    component:vote
                },
                {
                    path:'/voteInfo',
                    name:'voteInfo',
                    component:voteInfo
                },
                {
                    path:'/voteUser',
                    name:'voteUser',
                    component:voteUser
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

    ]
})
