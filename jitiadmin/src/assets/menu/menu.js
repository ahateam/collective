
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
        icon:'icon-bangong-jigou',
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
        path:'/memberList',
        title:'成员管理',
        icon:'icon-yonghu',
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
        ]
    },
    {
        path:'/poll',
        title:'投票管理',
        icon:'icon-toupiao1',
        child:[]
    },

    {
        path:'/asset',
        title:'集体资产',
        icon:'icon-tongyongzichan',
        child:[]
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

export default {
    menu,
    lowMenu,
    demoMenu
}
