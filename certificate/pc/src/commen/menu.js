/*左侧导航栏菜单生成的内容*/


//管理员权限菜单
const  menu =[
   
    {
        path:'/dashboard',
        title:'系统首页',
        icon:'course_shouye',
        child:[]
    },
	{
	    path:'/batchDataList',
	    title:'批量数据删除',
	    icon:'course_shouye',
	    child:[]
    },
    {
        path:'/createCode',
        title:'生成二维码',
        icon:'course_shouye',
        child:[]
    }
]



export default {
    menu,
}
