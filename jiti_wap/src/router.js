import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home'
import login from './views/login/login'
import test from './views/test/test'

import register from './views/login/register'
import registerSuccess from './views/login/registerSuccess'
import vote from './views/vote/vote'
import voteInfo from './views/vote/voteInfo'
import voteCreate from './views/vote/voteCreate'
import voteWait from './views/vote/voteWait'

import user from './views/user/user'
import userUpdate from './views/user/userUpdate'


import meet from './views/meet/meet'
import meetAdd from './views/meet/meetAdd'
import meetUser from './views/meet/meetUser'
import meetChoose from './views/meet/meetChoose'
import meetAloneVoteAdd from './views/meet/meetAloneVoteAdd'
import meetMoreVoteAdd from './views/meet/meetMoreVoteAdd'
import meetVoteOptionAdd from './views/meet/meetVoteOptionAdd'

import choose from './views/home/choose'
import page from './views/home/page'
//一版展示性数据
import list from './views/list/list'
import listBonus from './views/list/listBonus'
import jiti from './views/list/jiti/jiti'
import jiti1 from './views/list/jiti/jiti1'
import jiti2 from './views/list/jiti/jiti2'
import jiti3 from './views/list/jiti/jiti3'
import jiti4 from './views/list/jiti/jiti4'
import jiti5 from './views/list/jiti/jiti5'


Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
          path:'/page',
          nameL:'page',
          component:page
        },
        {
          path:'/test',
            name:'test',
            component:test
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/registerSuccess',
            name: 'registerSuccess',
            component: registerSuccess
        },
        {
            path: '/vote',
            name: 'vote',
            component: vote
        },
        {
            path: '/voteInfo',
            name: 'voteInfo',
            component: voteInfo
        },
        {
            path: '/voteCreate',
            name: 'voteCreate',
            component: voteCreate
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/userUpdate',
            name: 'userUpdate',
            component: userUpdate
        },

        {
            path: '/choose',
            name: 'choose',
            component: choose
        },
        {
            path: '/voteWait',
            name: 'voteWait',
            component: voteWait
        },
        {
            path: '/meet',
            name: 'meet',
            component: meet
        },
        {
            path: '/meetAdd',
            name: 'meetAdd',
            component: meetAdd
        },
        {
            path: '/meetUser',
            name: 'meetUser',
            component: meetUser
        },
        {
            path: '/meetAloneVoteAdd',
            name: 'meetAloneVoteAdd',
            component: meetAloneVoteAdd
        },
        {
            path: '/meetMoreVoteAdd',
            name: 'meetMoreVoteAdd',
            component: meetMoreVoteAdd
        },
        {
            path: '/meetVoteOptionAdd',
            name: 'meetVoteOptionAdd',
            component: meetVoteOptionAdd
        },
        {
            path: '/meetChoose',
            name: 'meetChoose',
            component: meetChoose
        },
        //一期展示性数据
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/listBonus',
            name: 'listBonus',
            component: listBonus
        },
        {
            path: '/jiti',
            name: 'jiti',
            component: jiti
        },
        {
            path: '/jiti1',
            name: 'jiti1',
            component: jiti1
        },
        {
            path: '/jiti2',
            name: 'jiti2',
            component: jiti2
        },
        {
            path: '/jiti3',
            name: 'jiti3',
            component: jiti3
        },
        {
            path: '/jiti4',
            name: 'jiti4',
            component: jiti4
        },
        {
            path: '/jiti5',
            name: 'jiti5',
            component: jiti5
        }
    ]
})
