import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home'
import login from './views/login/login'
import dashboard from './views/home/dashboard'
import shareHolder from './views/member/shareHolder'
import memberAll from './views/member/memberAll'
import memberList from './views/member/memberList'
import vote from './views/vote/vote'
import assets from './views/assets/assets'
import assetsInfo from './views/assets/assetsInfo'
import register from './views/login/register'
import mechanism from './views/mechanism/mechanism'
import director from './views/member/director'
import addMech from './views/mechanism/addMech'
import mechInfo from './views/mechanism/mechInfo'
import mechMoney from './views/mechanism/mechMoney'

import editMech from './views/mechanism/editMech'
import memberAdd from './views/member/memberAdd'
import memberEdit from './views/member/memberEdit'
import memberEditPost from './views/member/memberEditPost'

import voteAdd from './views/vote/voteAdd'
import voteInfo from './views/vote/voteInfo'
import voteEdit from './views/vote/voteEdit'
import visor from './views/member/visor'
import page from './views/page/page'


import bonus from './views/bonus/bonus'
import article from './views/article/artice'
import tagList from './views/article/tagList'
import articleAdd from './views/article/articleAdd'

//一版静态数据展示页面
import jiti from './views/assets/asstesImage/jiti'
import jiti1 from './views/assets/asstesImage/jiti1'
import jiti2 from './views/assets/asstesImage/jiti2'
import jiti3 from './views/assets/asstesImage/jiti3'
import jiti4 from './views/assets/asstesImage/jiti4'
import jiti5 from './views/assets/asstesImage/jiti5'


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
                    path:'/director',
                    name:'director',
                    component:director
                },
                {
                  path:'/memberAll',
                  name:'memberAll',
                  component:memberAll
                },
                {
                    path: '/shareHolder',
                    name: 'shareHolder',
                    component: shareHolder
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
                    path:'/visor',
                    name:'visor',
                    component:visor
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


                //一版展示页面
                {
                    path:'/jiti',
                    name:'jiti',
                    component:jiti
                },
                {
                    path:'/jiti1',
                    name:'jiti1',
                    component:jiti1
                },
                {
                    path:'/jiti2',
                    name:'jiti2',
                    component:jiti2
                },
                {
                    path:'/jiti3',
                    name:'jiti3',
                    component:jiti3
                },
                {
                    path:'/jiti4',
                    name:'jiti4',
                    component:jiti4
                },
                {
                    path:'/jiti5',
                    name:'jiti5',
                    component:jiti5
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
        }

    ]
})
