import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./views/personal/home/home')

const login = () => import('./views/personal/login/login')
const tellLogin  = () => import('./views/personal/login/tellLogin')
const  test = () => import('./views/personal/test/test')
const page  = () => import('./views/personal/home/page')
const register  = () => import('./views/personal/login/register')
const registerSuccess  = () => import('./views/personal/login/registerSuccess')
const voteMeet  = () => import('./views/personal/vote/voteMeet')
const voteInfo  = () => import('./views/personal/vote/voteInfo')
const waitVote  = () => import('./views/personal/vote/waitVote')
const failVote  = () => import('./views/personal/vote/failVote')

const  overVote = () => import('./views/personal/vote/overVote')
const  voteElectionRes = () => import('./views/personal/vote/voteElectionRes')
const  voteWait = () => import('./views/personal/vote/voteWait')
const  voteList = () => import('./views/personal/vote/voteList')
const  voteRes = () => import('./views/personal/vote/voteRes')
const  user = () => import('./views/personal/user/user')
const  userUpdate = () => import('./views/personal/user/userUpdate')
const userWX =()=> import('./views/personal/user/userWX' )

const  meet = () => import('./views/personal/meet/meet')
const  meetAdd = () => import('./views/personal/meet/meetAdd')
const  meetUser = () => import('./views/personal/meet/meetUser')
const meetChoose  = () => import('./views/personal/meet/meetChoose')
const  meetAloneVoteAdd = () => import('./views/personal/meet/meetAloneVoteAdd')
const  meetMoreVoteAdd = () => import('./views/personal/meet/meetMoreVoteAdd')
const meetVoteOptionAdd  = () => import('./views/personal/meet/meetVoteOptionAdd')
const  meetInfo = () => import('./views/personal/meet/meetInfo')
const  meetVoteInfo = () => import('./views/personal/meet/meetVoteInfo')
const meetAloneVoteEdit  = () => import('./views/personal/meet/meetAloneVoteEdit')
const  meetVoteAdd = () => import('./views/personal/meet/meetVoteAdd')
const  voteOptionPick = () => import('./views/personal/meet/voteOptionPick')
const  choose = () => import('./views/personal/home/choose')
const position  = () => import('./views/personal/position/position')
const positionSet  = () => import( './views/personal/position/positionSet')
const file  = () => import('./views/personal/file/file')
const userFile  = () => import( './views/personal/file/userFile')
const formFile  = () => import('./views/personal/file/formFile')
const bonusFile  = () => import('./views/personal/file/bonusFile')
const article  = () => import('./views/personal/article/article')
const  articleInfo = () => import('./views/personal/article/articleInfo')

const  mechMoney = () => import('./views/personal/mech/mechMoney')
//集体经济资产/分红展示
const  list = () => import('./views/personal/list/list')
const  listBonus = () => import('./views/personal/list/listBonus')
const  listInfo= () => import('./views/personal/list/listInfo')
const  bonusInfo = () => import('./views/personal/list/bonusInfo')
//我的机构
const  mech = () => import('./views/personal/mech/mech')
const  mechInfo = () => import('./views/personal/mech/mechInfo')
//我的投票
const  poll = () => import('./views/personal/poll/poll')
const pollInfo  = () => import( './views/personal/poll/pollInfo')
const  pollElectionRes = () => import( './views/personal/poll/pollElectionRes')
const  pollRes = () => import('./views/personal/poll/pollRes')

//发起投票
const voteManage = ()=>import('./views/personal/voteManage/voteManage')
const createVote = ()=>import('./views/personal/voteManage/createVote')
const createVoteChoose = ()=>import('./views/personal/voteManage/createVoteChoose')
const editVote = ()=>import('./views/personal/voteManage/editVote')
const createVoteOptionWork = ()=>import('./views/personal/voteManage/createVoteOptionWork')
const createVoteOptionPeople = ()=>import('./views/personal/voteManage/createVoteOptionPeople')

//公告列表
const noticeList = ()=>import('./views/personal/notice/noticeList')
const noticeInfo =()=>import('./views/personal/notice/noticeInfo')
//我的审批
const examine=()=>import('./views/personal/examine/examine')

//我的消息
const news = ()=>import('./views/personal/news/news')
const newsInfo = ()=>import('./views/personal/news/newsInfo')

//银行版
const bankLogin =()=> import('./views/bank/login/login')
const bankTellLogin =()=>import('./views/bank/login/tellLogin')
const bankChoose =()=> import('./views/bank/home/choose')
const bankHome =()=> import('./views/bank/home/home')
const bankVote =()=> import('./views/bank/vote/vote')
const bankVoteList =()=> import('./views/bank/vote/voteList')
const bankVoteRes = ()=>import('./views/bank/vote/voteRes')



Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        //集体经济组织成员
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
            path:'/userWX',
            name:'userWX',
            component:userWX
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
        },
        //发起投票管理
        {
            path:'/voteManage',
            name:'voteManage',
            component:voteManage
        },
        {
            path:'/createVote',
            name:'createVote',
            component:createVote
        },
        {
            path:'/createVoteChoose',
            name:'createVoteChoose',
            component:createVoteChoose
        },
        {
            path:'/editVote',
            name:'editVote',
            component:editVote
        },
        {
            path:'/createVoteOptionWork',
            name:'createVoteOptionWork',
            component:createVoteOptionWork
        },
        {
            path:'/createVoteOptionPeople',
            name:'createVoteOptionPeople',
            component:createVoteOptionPeople
        },
        {
            path:'/noticeList',
            name:'noticeList',
            component:noticeList
        },
        {
            path:'/noticeInfo',
            name:'noticeInfo',
            component:noticeInfo
        },
        //我的审批
        {
            path:'/examine',
            name:'examine',
            component:examine
        },
        //我的消息
        {
            path:'/news',
            name:'news',
            component:news
        },
        {
            path:'/newsInfo',
            name:'newsInfo',
            component:newsInfo
        },



        //银行版
        {
            path:'/bankLogin',
            name:'bankLogin',
            component:bankLogin
        },
        {
            path:'/bankTellLogin',
            name:'bankTellLogin',
            component:bankTellLogin

        },
        {
            path:'/bankChoose',
            name:'bankChoose',
            component:bankChoose
        },
        {
            path:'/bankHome',
            name:'bankHome',
            component:bankHome
        },
        {
            path:'/bankVote',
            name:'bankVote',
            component:bankVote
        },
        {
            path:'/bankVoteList',
            name:'bankVoteList',
            component:bankVoteList
        },
        {
            path:'/bankVoteRes',
            name:'bankVoteRes',
            component:bankVoteRes
        }

    ]
})
