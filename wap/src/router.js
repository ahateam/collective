import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./views/home/home')

const login = () => import('./views/login/login')
const tellLogin  = () => import('./views/login/tellLogin')
const  test = () => import('./views/test/test')
const page  = () => import('./views/home/page')
const register  = () => import('./views/login/register')
const registerSuccess  = () => import('./views/login/registerSuccess')
const voteMeet  = () => import('./views/vote/voteMeet')
const voteInfo  = () => import('./views/vote/voteInfo')
const waitVote  = () => import('./views/vote/waitVote')
const failVote  = () => import('./views/vote/failVote')

const  overVote = () => import('./views/vote/overVote')
const  voteElectionRes = () => import('./views/vote/voteElectionRes')
const  voteWait = () => import('./views/vote/voteWait')
const  voteList = () => import('./views/vote/voteList')
const  voteRes = () => import('./views/vote/voteRes')
const  user = () => import('./views/user/user')
const  userUpdate = () => import('./views/user/userUpdate')

const  meet = () => import('./views/meet/meet')
const  meetAdd = () => import('./views/meet/meetAdd')
const  meetUser = () => import('./views/meet/meetUser')
const meetChoose  = () => import('./views/meet/meetChoose')
const  meetAloneVoteAdd = () => import('./views/meet/meetAloneVoteAdd')
const  meetMoreVoteAdd = () => import('./views/meet/meetMoreVoteAdd')
const meetVoteOptionAdd  = () => import('./views/meet/meetVoteOptionAdd')
const  meetInfo = () => import('./views/meet/meetInfo')
const  meetVoteInfo = () => import('./views/meet/meetVoteInfo')
const meetAloneVoteEdit  = () => import('./views/meet/meetAloneVoteEdit')
const  meetVoteAdd = () => import('./views/meet/meetVoteAdd')
const  voteOptionPick = () => import('./views/meet/voteOptionPick')
const  choose = () => import('./views/home/choose')
const position  = () => import('./views/position/position')
const positionSet  = () => import( './views/position/positionSet')
const file  = () => import('./views/file/file')
const userFile  = () => import( './views/file/userFile')
const formFile  = () => import('./views/file/formFile')
const bonusFile  = () => import('./views/file/bonusFile')
const article  = () => import('./views/article/article')
const  articleInfo = () => import('./views/article/articleInfo')

const  mechMoney = () => import('./views/mech/mechMoney')
//集体经济资产/分红展示
const  list = () => import('./views/list/list')
const  listBonus = () => import('./views/list/listBonus')
const  listInfo= () => import('./views/list/listInfo')
const  bonusInfo = () => import('./views/list/bonusInfo')
//我的机构
const  mech = () => import('./views/mech/mech')
const  mechInfo = () => import('./views/mech/mechInfo')
//我的投票
const  poll = () => import('./views/poll/poll')
const pollInfo  = () => import( './views/poll/pollInfo')
const  pollElectionRes = () => import( './views/poll/pollElectionRes')
const  pollRes = () => import('./views/poll/pollRes')

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
