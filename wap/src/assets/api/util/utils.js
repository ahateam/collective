import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');

//身份证登录

api.loginByIdNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByIdNumber', cnt, callback)
}
//正常登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}
//获取所有的系统角色列表
api.getSysORGUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/org/getSysORGUserRoles', cnt, callback)
}

//根据手机号查找所有的同一手机号的账号
api.getUsersByMobile = function (cnt,callback) {
    util.call(baseUrl+'/org/getUsersByMobile', cnt, callback)
}

//根据用户的id判断用户密码进行登录
api.loginByUserId = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByUserId', cnt, callback)
}

//根据用户选择机构
api.loginInORG = function (cnt,callback) {
    util.call(baseUrl+'/org/loginInORG', cnt, callback)
}

//根据用户请求机构列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}

//请求会议列表
api.getVoteProjectsByOrgId = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteProjectsByOrgId', cnt, callback)
}

//导入资产列表
api.importAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/importAssets', cnt, callback)
}

//导入组织用户列表
api.importORGUsers = function (cnt,callback) {
    util.call(baseUrl+'/org/importORGUsers', cnt, callback)
}

//删除资产
api.delAsset = function (cnt,callback) {
    util.call(baseUrl+'/asset/delAsset', cnt, callback)
}

//获取资产列表
api.queryAssets = function (cnt,callback) {
    util.call(baseUrl+'/asset/queryAssets', cnt, callback)
}



//获取组织对象
api.getORGById = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGById', cnt, callback)
}

//根据组织编号和身份证号片段（生日），模糊查询
api.getORGUsersLikeIDNumber = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersLikeIDNumber', cnt, callback)
}

//根据组织编号和用户真名片段，模糊查询
api.getORGUsersLikeRealName = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUsersLikeRealName', cnt, callback)
}

//修改用户职务
api.editORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/editORGUser', cnt, callback)
}


//获取组织的用户
api.getORGUserById = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserById', cnt, callback)
}

//更新用户信息
api.editUser = function (cnt,callback) {
    util.call(baseUrl+'/org/editUser', cnt, callback)
}




//获取投票列表
api.getVotes = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVotes', cnt, callback)
}
//获取未投的投票列表
api.getNotVoteByUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/vote/getNotVoteByUserRoles', cnt, callback)
}
//获取用户已投的投票列表
api.getVoteByUserRoles = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteByUserRoles', cnt, callback)
}
//投票详情-计算票数
api.getVoteDetail = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteDetail', cnt, callback)
}
//投票的选项列表
api.getVoteOptions = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteOptions', cnt, callback)
}
//获取用户的选票
api.getVoteTicket = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteTicket', cnt, callback)
}


//用户投票
api.vote = function (cnt,callback) {
    util.call(baseUrl+'/vote/vote', cnt, callback)
}

//获取所有的分组
api.getORGUserSysTagGroups = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGUserSysTagGroups', cnt, callback)
}
//获取机构下的所有的分组tree
api.getTagGroupTree = function (cnt,callback) {
    util.call(baseUrl+'/org/getTagGroupTree', cnt, callback)
}
//根据分组id 请求资产列表
api.getAssetsByGroups = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetsByGroups', cnt, callback)
}

//发起投票
api.createVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/createVote', cnt, callback)
}
//新增投票选项
api.addVoteOption = function (cnt,callback) {
    util.call(baseUrl+'/vote/addVoteOption', cnt, callback)
}
//交换选项的位置
api.setVoteOptionIds = function (cnt,callback) {
    util.call(baseUrl+'/vote/setVoteOptionIds', cnt, callback)
}
//修改选项
api.editVoteOption = function (cnt,callback) {
    util.call(baseUrl+'/vote/editVoteOption', cnt, callback)
}
//删除选项
api.delVoteOption = function (cnt,callback) {
    util.call(baseUrl+'/vote/delVoteOption', cnt, callback)
}
//修改投票
api.editVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/editVote', cnt, callback)
}
//删除投票
api.delVote = function (cnt,callback) {
    util.call(baseUrl+'/vote/delVote', cnt, callback)
}

//用户公告列表

api.getNoticeByRoleGroup = function (cnt,callback) {
    util.call(baseUrl+'/org/getNoticeByRoleGroup', cnt, callback)
}
//用户审批列表
api.getExamineByPer = function (cnt,callback) {
    util.call(baseUrl+'/org/getExamineByPer', cnt, callback)
}

//审批人审批
api.editExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/editExamine', cnt, callback)
}
//审批股权变更
api.examineShareCerNo = function (cnt,callback) {
    util.call(baseUrl+'/org/examineShareCerNo', cnt, callback)
}
//微信获取openid
api.getAccessToken = function (cnt,callback) {
    util.call(baseUrl+'/wxOAuth/getAccessToken', cnt, callback)
}
//用户绑定微信
api.bdUserOpenId = function (cnt,callback) {
    util.call(baseUrl+'/org/bdUserOpenId', cnt, callback)
}
//用户解绑微信

api.removeOpenId = function (cnt,callback) {
    util.call(baseUrl+'/org/removeOpenId', cnt, callback)
}

//微信登录
api.loginByOpenId = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByOpenId', cnt, callback)
}
//绑定手机，解绑手机
api.editUserMobile = function (cnt,callback){
	util.call(baseUrl+'/org/editUserMobile', cnt, callback)
}

export default api
