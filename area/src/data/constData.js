
//全局静态常量

/*
* 权限登录
* @demo 演示系统
* @bank 银行系统
* @area 区级管理系统
* */

const grade = {demo:'0',bank:'1',area:'2'}

/*
* 组织等级
*
* */
const orgLevel = [
    {key:1,val:'省级'}, {key:2,val:'市级'}, {key:3,val:'区级'}, {key:4,val:'合作社'},{key:5,val:'其他'}
]
/*
* 申请状态
* */
const applyStatus = [
    {key:0,val:'正在申请'}, {key:1,val:'申请通过'}, {key:2,val:'申请失败'}, {key:0,val:'再次申请'}
]


export default {
    grade,
    orgLevel,
    applyStatus
}
