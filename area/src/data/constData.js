
//全局静态常量

/*
* 权限登录
* @demo 演示系统
* @bank 银行系统
* @area 区级管理系统
* */



const grade = { demo: '0', bank: '1', area: '2' }

/*
* 组织等级
*
* */
const orgLevel = [
    { key: 1, val: '省级' }, { key: 2, val: '市级' }, { key: 3, val: '区级' }, { key: 4, val: '合作社' }, { key: 5, val: '其他' }
]
/*
* 申请状态
* */
const applyStatus = [
    { key: 0, val: '正在申请' }, { key: 1, val: '申请通过' }, { key: 2, val: '申请失败' }, { key: 0, val: '再次申请' }
]

/**
 * 审批类型
 * */
const examineType = [{ key: 0, val: '组织申请' }, { key: 1, val: '分户审批' }, { key: 2, val: '股权变更' }]
const examineStatus = [{ key: 0, val: '等待组织审核' }, { key: 1, val: '组织审核通过，等待区级审核' }, { key: 2, val: '区级初审通过' }, { key: 3, val: '审核成功' }, { key: 4, val: '审核失败' }, { key: 5, val: '等待取证' }, { key: 6, val: '已取证' }]

/**
 * 打印的股权证的页面分类
 * */
const printType = [{ key: 0, val: '成员股权证' }, { key: 1, val: '初始登记' }, { key: 2, val: '变更登记' }, { key: 3, val: '抵押情况登记' }, { key: 4, val: '贵州省股东基本信息登记' }, { key: 5, val: '贵州省股权登记' }, { key: 6, val: '贵州省股权变更登记' }, { key: 7, val: '贵州省收益分配领取记录' }, { key: 8, val: '汇川初始登记副本' }]

/**
 * 选择打印变量的前端定义变量
 * */
const printConstant = [{ key: 1, isConstant: 1, printingName: '当天日期', printing: '' }]

/** 导入表格常量**/

const importData = { userImport: { skipRowCount: 1, colCount: 21 }, assetImport: { skipRowCount: 2, colCount: 38 } }

/**打印证书模板 图片列表 */

const printBookList = {
    huichuan: [
        {
            id: 'hc1',
            src: 'http://online.file.zyyunxun.cn/template/1.jpg',
            seat: '右侧',
            info: '成员股权证首页'
        },
        {
            id: 'hc2',
            src: 'http://online.file.zyyunxun.cn/template/2.jpg',
            seat: '右侧',
            info: '初始登记页'
        },
        {
            id: 'hc3',
            src: 'http://online.file.zyyunxun.cn/template/2.jpg',
            seat: '右侧',
            info: '初始登记页（成员超10人）'
        },
        {
            id: 'hc4',
            src: 'http://online.file.zyyunxun.cn/template/3.jpg',
            seat: '左侧',
            info: '变更登记页1'
        },
        {
            id: 'hc5',
            src: 'http://online.file.zyyunxun.cn/template/3.jpg',
            seat: '右侧',
            info: '变更登记页2'
        },
        {
            id: 'hc6',
            src: 'http://online.file.zyyunxun.cn/template/4.jpg',
            seat: '左侧',
            info: '抵押情况登记页'
        }
    ],
    guizhou: [
        {
            id: 's1',
            src: 'http://online.file.zyyunxun.cn/template/s1.png',
            seat: '右侧',
            info: '股东基本信息登记页'
        },
        {
            id: 's2',
            src: 'http://online.file.zyyunxun.cn/template/s2.png',
            seat: '左侧',
            info: '股权登记页'
        },
        {
            id: 's3',
            src: 'http://online.file.zyyunxun.cn/template/s3.png',
            seat: '右侧',
            info: '变更登记页'
        },
        {
            id: 's4',
            src: 'http://online.file.zyyunxun.cn/template/s4.png',
            seat: '左侧',
            info: '收益分配领取记录页'
        },
        {
            id: 's5',
            src: 'http://online.file.zyyunxun.cn/template/s4.png',
            seat: '右侧',
            info: '收益分配领取记录页'
        }
    ]
}

/** 批量打印证书导出数据的任务状态 */
const exportStatus = [{ key: 0, val: '准备生成文件' }, { key: 1, val: '数据已生成文件' }, { key: 3, val: '正在生成数据文件' }]

export default {
    grade,
    orgLevel,
    applyStatus,
    examineType,
    examineStatus,
    printConstant,
    printType,
    importData,
    printBookList,
    exportStatus
}
