
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
        child:[]
    },
    {
        path:'/memberList',
        title:'成员管理',
        icon:'icon-yonghu',
        child:[
            // {
            //     path:'/memberMail',
            //     title:'通讯录' ,
            //     icon:'',
            // },
            {
                path:'/memberGroup',
                title:'分组管理',
                icon:'',
            },
            // {
            //     path:'/memberList',
            //     title:'成员管理',
            //     icon:'',
            // },
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
    // {
    //     path:'/vote',
    //     title:'会议管理',
    //     icon:'icon-toupiao1',
    //     child:[]
    // },
    // {
    //     path:'/assets',
    //     title:'集体资产',
    //     icon:'icon-tongyongzichan',
    //     child:[]
    // },
    {
        path:'/asset',
        title:'集体资产',
        icon:'icon-tongyongzichan',
        child:[]
    },
    // {
    //     path:'/bonus',
    //     title:'分红管理',
    //     icon:'icon-tongyongzichan',
    //     child:[]
    // },
    // {
    //     path:'',
    //     title:'文章公告',
    //     icon:'icon-tongyongzichan',
    //     child:[
    //         {
    //             path:'/tagList',
    //             title:'标签管理',
    //             icon:'',
    //         },
    //         {
    //             path:'/article',
    //             title:'文章公告',
    //             icon:'',
    //         }
    //     ]
    // },
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
        child:[]
    }
]

export default {
    menu,
    lowMenu
}
