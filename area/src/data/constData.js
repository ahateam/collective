
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

/**
 * 审批类型
 * */
const examineType = [{key:0,val:'组织申请'},{key:1,val:'分户审批'},{key:2,val:'股权变更'}]
const examineStatus = [{key:0,val:'等待组织审核'},{key:1,val:'组织审核通过，等待区级审核'},{key:2,val:'区级初审通过'},{key:3,val:'审核成功'},{key:4,val:'审核失败'},{key:5,val:'等待取证'},{key:6,val:'已取证'} ]

/**
 * 打印的股权证的页面分类
 * */
const printType = [{key:0,val:'成员股权证'},{key:1,val:'初始登记'},{key:2,val:'变更登记'},{key:3,val:'抵押情况登记'}]

/**
 * 选择打印变量的前端定义变量
 * */
const printConstant =[{key:1,isConstant:1,printingName:'当天日期',printing:''}]

export default {
    grade,
    orgLevel,
    applyStatus,
    examineType,
    examineStatus,
    printConstant,
    printType
}
