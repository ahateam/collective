
//最高权限--所有管理页面
const  menu =[
    {
        path:'/dashboard',
        title:'系统首页',
        icon:'icon-shouye',
        child:[]
    },
    {
        path:'/mechanism',
        title:'机构管理',
        icon:'icon-jigou',
        child:[
            {
                path:'/applyMech',
                title:'机构申请列表',
                icon:''
            },
            {
                path:'/mechanism',
                title:'机构管理',
                icon:'',
            }
        ]
    },
    {
        path:'/permission',
        title:'权限管理',
        icon:'icon-quanxian',
        child:[]
    },
    {
        path:'/memberList',
        title:'成员管理',
        icon:'icon-nav_user',
        child:[

            {
                path:'/memberGroup',
                title:'分组管理',
                icon:'',
            },

            {
                path:'/memberPost',
                title:'职务管理',
                icon:'',
            },
            {
                path:'/memberImport',
                title:'导入成员',
                icon:'',
            }
        ]
    },
    {
        path:'/leaveFamily',
        title:'分户管理',
        icon:'icon-zhuzhaifenhuyanshouxxhdpi',
        child:[
            {
                path:'/leaveFamily',
                title:'成员分户',
                icon:''
            },
            {
                path:'/moveFamily',
                title:'成员移户',
                icon:''
            },
            {
                path:'/createFamily',
                title:'创建家庭户',
                icon:''
            },
            {
                path:'/addFamily',
                title:'户成员新增',
                icon:''
            },
            {
                path:'/deleteFamily',
                title:'户成员移除',
                icon:''
            },
        ]
    },
    {
        path:'/share',
        title:'股权变更',
        icon:'icon-xinxibiangeng',
        child:[]
    },
    {
        path:'/poll',
        title:'投票管理',
        icon:'icon-toupiao1',
        child:[]
    },
    {
        path:'/noticeList',
        title:'公告管理',
        icon:'icon-gonggao1',
        child:[
            {
                path:'/noticeList',
                title:'公告列表'
            }
        ]
    },
    {
        path:'/examine',
        title:'审批管理',
        icon:'icon-shenpi',
        child:[
            {
                path:'/examine',
                title:'审批记录'
            },
        ]
    },

    {
        path:'/asset',
        title:'集体资产',
        icon:'icon-tongyongzichan',
        child:[
            {
                path:'/asset',
                title:'资产列表',
            },
            {
                path:'/assetImport',
                title:'资产导入'
            }
        ]
    },

]

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
        icon:'icon-jigou',
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

export default {
    menu,
    lowMenu,
    demoMenu
}
