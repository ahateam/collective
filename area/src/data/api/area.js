import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';


let api = {};
console.log('开始调用ctrl');


//获取所有合作社
api.getCooperativeList = function (cnt,callback) {
    util.call(baseUrl+'/org/getCooperativeList', cnt, callback)
}


//账号注册
api.registeUser = function (cnt,callback) {
    util.call(baseUrl+'/org/registeUser', cnt, callback)
}
//账号登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}
//选择机构登录
api.areaAdminLoginInORG = function (cnt,callback) {
    util.call(baseUrl+'/org/areaAdminLoginInORG', cnt, callback)
}
//查询省市区地址
api.getProCityDistrict = function (cnt,callback) {
    util.call(baseUrl+'/org/getProCityDistrict', cnt, callback)
}
//根据组织名/等级查找组织列表
api.getOrgByNameAndLevel = function (cnt,callback) {
    util.call(baseUrl+'/org/getOrgByNameAndLevel', cnt, callback)
}
//申请组织
api.createORGApply = function (cnt,callback) {
    util.call(baseUrl+'/org/createORGApply', cnt, callback)
}
//查看用户自己的申请
api.getORGExamineByUser = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGExamineByUser', cnt, callback)
}
//机构列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}
//再次申请
api.oRGApplyAgain = function (cnt,callback) {
    util.call(baseUrl+'/org/oRGApplyAgain', cnt, callback)
}
//删除申请
api.delORGExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGExamine', cnt, callback)
}

//机构列表--查询组织地址
api.getORGDistrict = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGDistrict', cnt, callback)
}

//新增下级机构
api.createSubOrg = function (cnt,callback) {
    util.call(baseUrl+'/org/createSubOrg', cnt, callback)
}

//移除下级机构
api.delSubOrg = function (cnt,callback) {
    util.call(baseUrl+'/org/delSubOrg', cnt, callback)
}

//申请列表--查询组织地址
api.getORGDistrictByOrgApplyId = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGDistrictByOrgApplyId', cnt, callback)
}

//根据org请求上级组织信息
api.getSuperior = function (cnt,callback) {
    util.call(baseUrl+'/org/getSuperior', cnt, callback)
}

//管理查询-机构列表
api.getORGExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGExamine', cnt, callback)
}
//修改申请的机构的状态
api.upORGApply = function (cnt,callback) {
    util.call(baseUrl+'/org/upORGApply', cnt, callback)
}
//获取单个成员导入任务的详细信息
api.getListImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/getListImportTask', cnt, callback)
}
//创建成员导入任务
api.createImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/createImportTask', cnt, callback)
}
//设置下级机构用户为该管理员
api.editORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/editORGUser', cnt, callback)
}
//创建成员导入任务
api.createImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/createImportTask', cnt, callback)
}
//<导入到临时表>
api.importRecord = function (cnt,callback) {
    util.call(baseUrl+'/imp/importRecord', cnt, callback)
}

//获取错误数据
api.getFailImportRecord = function (cnt,callback) {
    util.call(baseUrl+'/imp/getFailImportRecord', cnt, callback)
}

//
api.getImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/getImportTask', cnt, callback)
}
//
api.importOrgUser = function (cnt,callback) {
    util.call(baseUrl+'/imp/importOrgUser', cnt, callback)
}



//资产相关
//获取资产导入任务--列表
api.getListImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/getListImportTask', cnt, callback)
}

//创建资产导入任务
api.createAssetImportTask = function (cnt,callback) {
    util.call(baseUrl+'/asset/createAssetImportTask', cnt, callback)
}
//获取当前导入任务的信息
api.getAssetImportTask = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetImportTask', cnt, callback)
}
//导入资产列表
api.importAsset = function (cnt,callback) {
    util.call(baseUrl+'/imp/importAsset', cnt, callback)
}




//请求行政组织下的机构列表

api.getORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGs', cnt, callback)
}
//区级查询组织申请列表-搜索
api.getExamineByORGNameDistrict = function (cnt,callback) {
    util.call(baseUrl+'/org/getExamineByORGNameDistrict', cnt, callback)
}
//区级查询下级组织列表-搜索
api.getSubORGByLikeORGName = function (cnt,callback) {
    util.call(baseUrl+'/org/getSubORGByLikeORGName', cnt, callback)
}
//根据组织名称查询用户的组织申请列表-搜索
api.getORGExamineByUserANDLikeORGName= function (cnt,callback) {
    util.call(baseUrl+'/org/getORGExamineByUserANDLikeORGName', cnt, callback)
}

//下级机构成员列表
api.getORGUserSysTagGroups = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserSysTagGroups', cnt, callback)
}
api.getORGUserByRole = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserByRole', cnt, callback)
}



api.getTagGroupTree = function (cnt,callback) {
    util.call(baseUrl+'/org/getTagGroupTree', cnt, callback)
}

//请求条件搜素对应资产统计数据--根据不同的年份查询
api.districtCountByYears  = function (cnt,callback) {
    util.call(baseUrl+'/asset/districtCountByYears ', cnt, callback)
}
//请求资产类型--列表
api.getAssetType = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetType', cnt, callback)
}
//请求资源类型--列表
api.getResType = function (cnt,callback) {
    util.call(baseUrl+'/asset/getResType', cnt, callback)
}
//请求经营方式--列表
api.getBusinessMode  = function (cnt,callback) {
    util.call(baseUrl+'/asset/getBusinessMode ', cnt, callback)
}

//银行金融组织管理
api.createBankORG  = function (cnt,callback) {
    util.call(baseUrl+'/bank/createBankORG ', cnt, callback)
}
//根据区级id获取银行列表
api.getBankList  = function (cnt,callback) {
    util.call(baseUrl+'/bank/getBankList ', cnt, callback)
}
//创建银行管理员
api.createBankAdmin  = function (cnt,callback) {
    util.call(baseUrl+'/bank/createBankAdmin ', cnt, callback)
}
//获取银行管理员列表
api.getORGUsers  = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsers ', cnt, callback)
}
//删除管理员
api.deleteBankAdmin  = function (cnt,callback) {
    util.call(baseUrl+'/bank/deleteBankAdmin ', cnt, callback)
}

//管理员管理-下级管理员列表
api.getSubORGUser  = function (cnt,callback) {
    util.call(baseUrl+'/org/getSubORGUser ', cnt, callback)
}
//创建管理员
api.createORGAdmin  = function (cnt,callback) {
    util.call(baseUrl+'/org/createORGAdmin ', cnt, callback)
}
//删除管理员
api.delORGUserAdmin  = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGUserAdmin ', cnt, callback)
}

//区级报表
api.sumAssetByDis = function (cnt,callback) {
    util.call(baseUrl+'/asset/sumAssetByDis', cnt, callback)
}
//根据orgid查询报表
api.sumAsset = function (cnt,callback) {
    util.call(baseUrl+'/asset/sumAsset', cnt, callback)
}

//请求资产数据所需的接口
//初始化数据


//请求创建时间（年份） --列表
api.getBuildTime  = function (cnt,callback) {
    util.call(baseUrl+'/asset/getBuildTime ', cnt, callback)
}

//请求区级平台下-所有的org列表
api.getORGSByDistrictId  = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGSByDistrictId ', cnt, callback)
}

//区级平台查询-资产条件的列表
api.getAssetListByTypes  = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetListByTypes ', cnt, callback)
}


//区级平台查询-投票参与人数
api.countVoteTurnout  = function (cnt,callback) {
    util.call(baseUrl+'/vote/countVoteTurnout ', cnt, callback)
}
//区级平台查询投票的列表——根据组织id
api.getVotesByOrgId  = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVotesByOrgId ', cnt, callback)
}
//查看所有的投票票数信息
api.getVoteOptions  = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteOptions ', cnt, callback)
}
//根据选项请求用户列表
api.getUserBySelection  = function (cnt,callback) {
    util.call(baseUrl+'/vote/getUserBySelection ', cnt, callback)
}
//根据userID请求用户信息
api.getUserById  = function (cnt,callback) {
    util.call(baseUrl+'/user/getUserById ', cnt, callback)
}
//根据组织id和用户姓名搜素用户
api.getORGUsersLikeRealName  = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersLikeRealName ', cnt, callback)
}
//查询用户的投票列表
api.getVoteTicketByUserId  = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteTicketByUserId ', cnt, callback)
}
//查询用户的投票选项详情
api.getOptionByUserSelection  = function (cnt,callback) {
    util.call(baseUrl+'/vote/getOptionByUserSelection ', cnt, callback)
}
//获取内部或外部成员并附带人员总数
api.getOrgUserListByIsOrgUser  = function (cnt,callback) {
    util.call(baseUrl+'/org/getOrgUserListByIsOrgUser ', cnt, callback)
}
//获取组织每个职位的人员总数
api.getCountsByRoles  = function (cnt,callback) {
    util.call(baseUrl+'/org/getCountsByRoles ', cnt, callback)
}




//审批列表
api.getExamineByDisId  = function (cnt,callback) {
    util.call(baseUrl+'/org/getExamineByDisId ', cnt, callback)
}
//审核分户
api.editExamine  = function (cnt,callback) {
    util.call(baseUrl+'/org/editExamine ', cnt, callback)
}
//审核股权变更
api.examineShareCerNo  = function (cnt,callback) {
    util.call(baseUrl+'/org/examineShareCerNo ', cnt, callback)
}
//设置股权证号
api.setShareCerNo  = function (cnt,callback) {
    util.call(baseUrl+'/org/setShareCerNo ', cnt, callback)
}
//修改状态为待领证
api.editExamineStatus  = function (cnt,callback) {
    util.call(baseUrl+'/org/editExamineStatus ', cnt, callback)
}


//查找用户的所有职务信息

api.getSysORGUserRoles  = function (cnt,callback) {
    util.call(baseUrl+'/org/getSysORGUserRoles ', cnt, callback)
}

//获取打印变量列表
api.getPrintingType  = function (cnt,callback) {
    util.call(baseUrl+'/ext/getPrintingType ', cnt, callback)
}
//保存打印模板
api.createPrintingTemplate  = function (cnt,callback) {
    util.call(baseUrl+'/ext/createPrintingTemplate ', cnt, callback)
}
//获取打印模板详情
api.getPrintingTemplateByType  = function (cnt,callback) {
    util.call(baseUrl+'/ext/getPrintingTemplateByType ', cnt, callback)
}
//修改模板
api.editPrintingTemplate  = function (cnt,callback) {
    util.call(baseUrl+'/ext/editPrintingTemplate ', cnt, callback)
}
//获取组织下的所有户列表
api.getFamilyAll  = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyAll ', cnt, callback)
}
//户主搜索列表
api.getFamilyByFamilyMaster  = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByFamilyMaster ', cnt, callback)
}
//户主搜索列表
api.getFamilyByFamilyNumber  = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByFamilyNumber ', cnt, callback)
}
//户主搜索列表
api.getFamilyByshare  = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByshare ', cnt, callback)
}
//根据组织id获取组织信息
api.getORGById  = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGById ', cnt, callback)
}

//根据户信息获取整个家庭户成员列表
api.getFamilyUserByFamilyNumber  = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyUserByFamilyNumber ', cnt, callback)
}

//批量导出用户数据
api.createExportTask = function (cnt,callback) {
    util.call(baseUrl+'/export/createExportTask ', cnt, callback)
}
//批量导出用户数据
api.createExportTask = function (cnt,callback) {
    util.call(baseUrl+'/export/createExportTask ', cnt, callback)
}
//获取批量导出的任务列表
api.getExportTaskLikeTitle = function (cnt,callback) {
    util.call(baseUrl+'/export/getExportTaskLikeTitle ', cnt, callback)
}

//执行导入
api.downLoadExcel = function (cnt,callback) {
    util.call(baseUrl+'/export/downLoadExcel ', cnt, callback)
}
//获取导出任务详情
api.getExportTaskById = function (cnt,callback) {
    util.call(baseUrl+'/export/getExportTaskById ', cnt, callback)
}
export default api

