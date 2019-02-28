import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home'
import login from './views/login/login'
import tellLogin from './views/login/tellLogin'
import test from './views/test/test'
import page from './views/home/page'
import register from './views/login/register'
import registerSuccess from './views/login/registerSuccess'
import voteMeet from './views/vote/voteMeet'
import voteInfo from './views/vote/voteInfo'
import waitVote from './views/vote/waitVote'
import failVote from './views/vote/failVote'
import overVote from './views/vote/overVote'
import voteElectionRes from './views/vote/voteElectionRes'

import voteWait from './views/vote/voteWait'
import voteList from './views/vote/voteList'
import voteRes from './views/vote/voteRes'
import user from './views/user/user'
import userUpdate from './views/user/userUpdate'


import meet from './views/meet/meet'
import meetAdd from './views/meet/meetAdd'
import meetUser from './views/meet/meetUser'
import meetChoose from './views/meet/meetChoose'
import meetAloneVoteAdd from './views/meet/meetAloneVoteAdd'
import meetMoreVoteAdd from './views/meet/meetMoreVoteAdd'
import meetVoteOptionAdd from './views/meet/meetVoteOptionAdd'
import meetInfo from './views/meet/meetInfo'
import meetVoteInfo from './views/meet/meetVoteInfo'
import meetAloneVoteEdit from './views/meet/meetAloneVoteEdit'
import meetVoteAdd from './views/meet/meetVoteAdd'
import voteOptionPick from './views/meet/voteOptionPick'

import choose from './views/home/choose'

import position from './views/position/position'
import positionSet from './views/position/positionSet'

import file from './views/file/file'
import userFile from './views/file/userFile'
import formFile from './views/file/formFile'
import bonusFile from './views/file/bonusFile'
import article from './views/article/article'
import articleInfo from './views/article/articleInfo'

import mechMoney from './views/mech/mechMoney'

//集体经济资产/分红展示
import list from './views/list/list'
import listBonus from './views/list/listBonus'
import listInfo from './views/list/listInfo'
import bonusInfo from './views/list/bonusInfo'
//我的机构
import mech from './views/mech/mech'
import mechInfo from './views/mech/mechInfo'

//我的投票
import  poll from './views/poll/poll'
import pollInfo from './views/poll/pollInfo'
import pollElectionRes from './views/poll/pollElectionRes'
import pollRes from './views/poll/pollRes'


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
            path:'/tellLogin',
            name:'tellLogin',
            component:tellLogin
        },
        {
            path: '/page',
            name: 'page',
            component: page
        },
        {
            path: '/test',
            name: 'test',
            component: test
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
            path: '/voteMeet',
            name: 'voteMeet',
            component: voteMeet
        },
        {
            path: '/voteInfo',
            name: 'voteInfo',
            component: voteInfo
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
            path:'/waitVote',
            name:'waitVote',
            component:waitVote
        },
        {
            path:'/failVote',
            name:'failVote',
            component:failVote
        },
        {
            path:'/overVote',
            name:'overVote',
            component:overVote
        },
        {
            path: '/voteWait',
            name: 'voteWait',
            component: voteWait
        },
        {
            path:'/voteList',
            name:'voteList',
            component:voteList
        },
        {
            path:'/voteRes',
            name:'voteRes',
            component:voteRes
        },
        {
            path:'/voteElectionRes',
            name:'voteElectionRes',
            component:voteElectionRes
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
        {
            path: '/meetInfo',
            name: 'meetInfo',
            component: meetInfo
        },
        {
            path: '/meetVoteInfo',
            name: 'meetVoteInfo',
            component: meetVoteInfo
        },
        {
            path: '/meetAloneVoteEdit',
            name: 'meetAloneVoteEdit',
            component: meetAloneVoteEdit
        },
        {
            path:'/meetVoteAdd',
            name:'meetVoteAdd',
            component:meetVoteAdd
        },
        {
            path:'/voteOptionPick',
            name:'voteOptionPick',
            component:voteOptionPick
        },
        {
            path:'/position',
            name:'position',
            component:position
        },
        {
            path:'/positionSet',
            name:'positionSet',
            component:positionSet
        },
        {
            path:'/file',
            name:'file',
            component:file
        },
        {
            path:'/userFile',
            name:'userFile',
            component:userFile
        },
        {
            path:'/bonusFile',
            name:'bonusFile',
            component:bonusFile
        },
        {
            path:'/formFile',
            name:'formFile',
            component:formFile
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
            path:'/listInfo',
            name:'listInfo',
            component:listInfo
        },
        {
            path:'/bonusInfo',
            name:'bonusInfo',
            component:bonusInfo
        },
        //我的机构
        {
            path:'/mech',
            name:'mech',
            component:mech
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
        //通知公告
        {
            path:'/article',
            name:'article',
            component:article
        },
        {
            path:'/articleInfo',
            name:'articleInfo',
            component:articleInfo
        },
        //我的投票
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
            path:'/pollElectionRes',
            name:'pollElectionRes',
            component:pollElectionRes
        },
        {
            path:'/pollRes',
            name:'pollRes',
            component:pollRes
        }
    ]
})
