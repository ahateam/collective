import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');



//机构列表
api.getORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGs', cnt, callback)
}
//新增机构-创建组织申请
api.createORGApply = function (cnt,callback) {
    util.call(baseUrl+'/org/createORGApply', cnt, callback)
}

//再次申请
api.oRGApplyAgain = function (cnt,callback) {
    util.call(baseUrl+'/org/oRGApplyAgain', cnt, callback)
}
//请求机构地址--申请通过的
api.getORGDistrict = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGDistrict', cnt, callback)
}
//请求的地址-申请未通过的
api.getORGDistrictByOrgApplyId = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGDistrictByOrgApplyId', cnt, callback)
}
//根据org获取上级信息
api.getSuperior = function (cnt,callback) {
    util.call(baseUrl+'/org/getSuperior', cnt, callback)
}




//根据等级获取上级信息
api.getSuperiorORGs	 = function (cnt,callback) {
    util.call(baseUrl+'/org/getSuperiorORGs	', cnt, callback)
}


//修改机构的资金信息createORG
api.editORGExt = function (cnt,callback) {
    util.call(baseUrl+'/org/editORGExt', cnt, callback)
}
//创建组织用户
api.createORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/createORGUser', cnt, callback)
}
//修改用户基本信息
api.editUser = function (cnt,callback) {
    util.call(baseUrl+'/org/editUser', cnt, callback)
}
//修改组织用户信息-职务修改
api.editORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/editORGUser', cnt, callback)
}
//导入用户表
api.importORGUsers = function (cnt,callback) {
    util.call(baseUrl+'/org/importORGUsers', cnt, callback)
}
//获取组织成员列表
api.getORGUserByRole = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserByRole', cnt, callback)
}
//用户移出组织
api.delORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGUser', cnt, callback)
}

//根据组织编号和身份证号片段（生日），模糊查询
api.getORGUsersLikeIDNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersLikeIDNumber', cnt, callback)
}

//获取内部或外部成员并附带人员总数
api.getOrgUserListByIsOrgUser = function (cnt,callback) {
    util.call(baseUrl+'/org/getOrgUserListByIsOrgUser', cnt, callback)
}
api.getCountsByRoles = function (cnt,callback) {
    util.call(baseUrl+'/org/getCountsByRoles', cnt, callback)
}



//获取投票的选项列表
api.getVoteOptions = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteOptions', cnt, callback)
}
//获取组织的投票项目
api.getVoteProjectsByOrgId = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteProjectsByOrgId', cnt, callback)
}
//创建投票
api.addVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/addVote', cnt, callback)
}
//获取投票项目中的投票
api.getVotes = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVotes', cnt, callback)
}
//<创建投票项目
api.createVoteProject = function (cnt,callback) {
    util.call(baseUrl+'/vote/createVoteProject', cnt, callback)
}
//获取投票的选项列表
api.getVoteOptions = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteOptions', cnt, callback)
}
//删除投票的选项
api.delVoteOption = function (cnt,callback) {
    util.call(baseUrl+'/vote/delVoteOption', cnt, callback)
}
//新增投票的选项
api.addVoteOption = function (cnt,callback) {
    util.call(baseUrl+'/vote/addVoteOption', cnt, callback)
}
//修改编辑投票
api.editVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/editVote', cnt, callback)
}
//删除投票项目
api.delVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/delVote', cnt, callback)
}
//启用/禁用投票
api.setVoteActivation = function (cnt,callback) {
    util.call(baseUrl+'/vote/setVoteActivation', cnt, callback)
}
//修改编辑编辑投票项目
api.editVoteProject = function (cnt,callback) {
    util.call(baseUrl+'/vote/editVoteProject', cnt, callback)
}

//获取资产列表
api.getAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssets', cnt, callback)
}

//导入资产列表
api.importAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/importAssets', cnt, callback)
}
//



/*重构之后的接口*/
//新增投票
api.createVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/createVote', cnt, callback)
}

//用户相关
//注册平台账号
api.registeUser = function (cnt,callback) {
    util.call(baseUrl+'/org/registeUser', cnt, callback)
}
//管理员登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}
//用户管理员账号的机构列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}
//管理员选取组织的登录
api.adminLoginInORG = function (cnt,callback) {
   util.call(baseUrl+'/org/adminLoginInORG', cnt, callback)
}
//获取申请的机构列表
api.getORGExamineByUser = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGExamineByUser', cnt, callback)
}
//选择上级机构
api.getOrgByNameAndLevel = function (cnt,callback) {
    util.call(baseUrl+'/org/getOrgByNameAndLevel', cnt, callback)
}
//查询省市区
api.getProCityDistrict = function (cnt,callback) {
    util.call(baseUrl+'/org/getProCityDistrict', cnt, callback)
}



//取消申请机构
api.delORGExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGExamine', cnt, callback)
}
//获取组织上级机构信息
api.getSuperiorORG = function (cnt,callback) {
    util.call(baseUrl+'/org/getSuperiorORG', cnt, callback)
}


//请求系统角色列表
api.getSysORGUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/org/getSysORGUserRoles', cnt, callback)
}

//请求分组信息
api.getORGUserSysTagGroups	 = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserSysTagGroups', cnt, callback)
}



//请求分组信息
api.getTagGroupTree	 = function (cnt,callback) {
    util.call(baseUrl+'/org/getTagGroupTree', cnt, callback)
}

//新增分组
api.createORGUserTagGroup = function (cnt,callback) {
    util.call(baseUrl+'/org/createORGUserTagGroup', cnt, callback)
}
//根据标签信息获取组织成员列表
api.getORGUsersByTags = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersByTags', cnt, callback)
}
//获取组织类所有的用户信息
api.getORGUsers = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsers', cnt, callback)
}
//根据分组获取用户列表
api.getORGUsersByGroups = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersByGroups', cnt, callback)
}
//将用户批量新增到某一分组
api.batchEditORGUsersGroups = function (cnt,callback) {
    util.call(baseUrl+'/org/batchEditORGUsersGroups', cnt, callback)
}
//根据姓名模糊搜索用户列表
api.getORGUsersLikeRealName = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersLikeRealName', cnt, callback)
}
//修改成员的身份证号码
api.editUserIdNumber = function (cnt,callback) {
    util.call(baseUrl+'/user/editUserIdNumber', cnt, callback)
}
//创建成员/资产导入任务
api.createImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/createImportTask', cnt, callback)
}

//导入用户数据进入临时表
api.importRecord = function (cnt,callback) {
    util.call(baseUrl+'/imp/importRecord', cnt, callback)
}
//获取导入任务列表
api.getListImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/getListImportTask', cnt, callback)
}
//将临时表的用户数据导入真实表
api.importOrgUser = function (cnt,callback) {
    util.call(baseUrl+'/imp/importOrgUser', cnt, callback)
}
//用户错误数据列表

api.getFailImportRecord	 = function (cnt,callback) {
    util.call(baseUrl+'/imp/getFailImportRecord', cnt, callback)
}

//资产相关
//根据条件查询--对应资产列表
api.queryAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/queryAssets', cnt, callback)
}
//根据分组信息获取资产列表
api.getAssetsByGroups = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetsByGroups', cnt, callback)
}
//删除资产
api.delAsset = function (cnt,callback) {
    util.call(baseUrl+'/asset/delAsset', cnt, callback)
}
//移入资产
api.batchEditAssetsGroups = function (cnt,callback) {
    util.call(baseUrl+'/asset/batchEditAssetsGroups', cnt, callback)
}
//资产导入任务列表
api.getAssetImportTasks = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetImportTasks', cnt, callback)
}
//创建的导入任务
api.createAssetImportTask = function (cnt,callback) {
    util.call(baseUrl+'/asset/createAssetImportTask', cnt, callback)
}
//获取导入任务进度
api.getImportTask = function (cnt,callback) {
    util.call(baseUrl+'/imp/getImportTask', cnt, callback)
}
//批量导入到临时数据表
api.importAssetsRecord = function (cnt,callback) {
    util.call(baseUrl+'/asset/importAssetsRecord', cnt, callback)
}
//批量导入到正式数据表
api.importAsset = function (cnt,callback) {
    util.call(baseUrl+'/imp/importAsset', cnt, callback)
}
//获取当前资产任务信息
api.getAssetImportTask = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetImportTask', cnt, callback)
}
//获取任务中的失败的数据
api.getNotcompletionRecord = function (cnt,callback) {
    util.call(baseUrl+'/asset/getNotcompletionRecord', cnt, callback)
}

//权限管理--权限列表
api.getPermission = function (cnt,callback) {
    util.call(baseUrl+'/org/getPermission', cnt, callback)
}
//根据权限查找角色列表
api.getRolesByPermission = function (cnt,callback) {
    util.call(baseUrl+'/org/getRolesByPermission', cnt, callback)
}
//根据权限设置角色列表
api.insertPermissionRole = function (cnt,callback) {
    util.call(baseUrl+'/org/insertPermissionRole', cnt, callback)
}


//审批管理
//请求所有的户列表
api.getFamilyAll = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyAll', cnt, callback)
}
//根据户序号请求用户列表
api.getFamilyUserByFamilyNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyUserByFamilyNumber', cnt, callback)
}
//搜索-按户主姓名
api.getFamilyByFamilyMaster = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByFamilyMaster', cnt, callback)
}
//搜索-按户编号
api.getFamilyByFamilyNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByFamilyNumber', cnt, callback)
}
//搜索-按股权证号
api.getFamilyByshare = function (cnt,callback) {
    util.call(baseUrl+'/org/getFamilyByshare', cnt, callback)
}

//创建分户审批操作
api.createExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/createExamine', cnt, callback)
}
//审批列表
api.getExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/getExamine', cnt, callback)
}
//删除审批
api.delExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/delExamine', cnt, callback)
}
//判断用户是否可以新增
api.getOrgUser = function (cnt,callback) {
    util.call(baseUrl+'/org/getOrgUser', cnt, callback)
}

//公告管理
//新增公告
api.createNotice = function (cnt,callback) {
    util.call(baseUrl+'/org/createNotice', cnt, callback)
}
//获取公告列表
api.getNotice = function (cnt,callback) {
    util.call(baseUrl+'/org/getNotice', cnt, callback)
}
//修改公告
api.editNotice = function (cnt,callback) {
    util.call(baseUrl+'/org/editNotice', cnt, callback)
}
//删除公告
api.deleteNotice = function (cnt,callback) {
    util.call(baseUrl+'/org/deleteNotice', cnt, callback)
}
//投票创建/修改完成发送微信通知

api.sendVoteMessage = function (cnt,callback) {
    util.call(baseUrl+'/vote/sendVoteMessage', cnt, callback)
}




export default api
