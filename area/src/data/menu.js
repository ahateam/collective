/*左侧导航栏菜单生成的内容*/

//最低管理权限--只能创建机构
const  lowMenu=[
    {
        path:'/areaDashboard',
        title:'系统首页',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/',
        title:'机构管理',
        icon:'icon-bangong-jigou',
        child:[
            {
                path:'/areaManageApplyMech',
                title:'机构申请列表',
                icon:''
            },
        ]
    }
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
        child:[

            {
                path:'/areaChildMech',
                title:'下级机构管理'
            },
            {
                path:'/areaManageApplyMech',
                title:'我的申请'
            },
            {
                path:'/areaManageMech',
                title:' 我的机构'
            }
        ]
    },
    {
        path:'/areaUser',
        title:'管理员管理',
        icon:'icon-bangong-jigou',
        child:[
            {
                path:'/areaUser',
                title:'平台管理员'
            },
            {
                path:'/areaChildUser',
                title:'下级管理员'
            },

        ]
    },
    {
        path:'/areaBank',
        title:'银行金融',
        icon:'icon-zichan1',
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

//市级管理平台
const  cityMenu=[
    {
        path:'/areaHome',
        title:'市级管理',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/areaMech',
        title:'机构管理',
        icon:'icon-bangong-jigou',
        child:[

            {
                path:'/areaChildMech',
                title:'下级机构管理'
            },
            {
                path:'/areaManageApplyMech',
                title:'我的申请'
            },
            {
                path:'/areaManageMech',
                title:' 我的机构'
            }
        ]
    },
]

//省级管理平台
const  proMenu=[
    {
        path:'/areaHome',
        title:'省级管理',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/areaMech',
        title:'机构管理',
        icon:'icon-bangong-jigou',
        child:[
            {
                path:'/areaChildMech',
                title:'下级机构管理'
            },
            {
                path:'/areaManageApplyMech',
                title:'我的申请'
            },
            {
                path:'/areaManageMech',
                title:' 我的机构'
            }
        ]
    },
]


export default {
    lowMenu,
    bankMenu,
    areaMenu,
    cityMenu,
    proMenu
}
