/*左侧导航栏菜单生成的内容*/

//最低管理权限--只能创建机构
const  lowMenu=[
    {
        path:'/dashboard',
        title:'系统首页',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/mechanism',
        title:'机构管理',
        icon:'icon-bangong-jigou',
        child:[
            {
                path:'/applyMech',
                title:'机构申请列表',
                icon:''
            },
        ]
    }
]


//演示版系统
const  demoMenu =[
    {
        path:'/demoDashboard',
        title:'演示系统',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/demoAsset',
        title:'组织资产',
        icon:'icon-caiwuguanli',
        child:[]
    },
    {
        path:'/demoVote',
        title:'组织表决',
        icon:'icon-toupiao1',
        child:[]
    },
]
//银行查询系统
const bankMenu = [
    {
        path:'/bankDashboard',
        title:'银行首页',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/bankAsset',
        title:'资产统计',
        icon:'icon-caiwuguanli',
        child:[]
    },
    {
        path:'/bankVote',
        title:'投票统计',
        icon:'icon-toupiao1',
        child:[
            {
                path:'/bankVote',
                title:'投票统计',
            },
            {
                path:'/bankVoteUser',
                title:'用户投票'
            }
        ]
    }

]
//区级管理平台
const  areaMenu=[
    {
        path:'/areaHome',
        title:'区级管理',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/areaMech',
        title:'机构管理',
        icon:'icon-bangong-jigou',
        child:[]
    },
    {
        path:'/areaAsset',
        title:'资产统计',
        icon:'icon-caiwuguanli',
        child:[]
    },
    {
        path:'/areaVote',
        title:'投票管理',
        icon:'icon-toupiao1',
        child:[
            {
                path:'/areaVote',
                title:'投票统计',
            },
            {
                path:'/areaVoteUser',
                title:'用户投票'
            }
        ]
    }
]



export default {
    lowMenu,
    demoMenu,
    bankMenu,
    areaMenu,

}
