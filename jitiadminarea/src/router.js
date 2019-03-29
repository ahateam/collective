import Vue from 'vue'
import Router from 'vue-router'

import login from './views/login/login'
import home from './views/home/home'
import dashboard from './views/home/dashboard'
import page from './views/home/page'
import mech from './views/mech/mech'
import asset from './views/asset/asset'

Vue.use(Router)

export default new Router({
    mode: 'history',
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
