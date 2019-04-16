import util from 'ahaapi'


const baseUrl = 'http://47.99.212.32/api/jiti';  //正式服请求地址前缀


// const baseUrl = 'http://192.168.1.123:8080/jiti';  //本地请求地址前缀
// const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀


// let appId = process.env.appID;//应用编号
// let appId ='';


let api = {};
console.log('开始调用ctrl');


//账号登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}
//机构列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}
//区级管理查询-机构列表
api.getORGExamine = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGExamine', cnt, callback)
}
//修改申请的机构的状态
api.upORGApply = function (cnt,callback) {
    util.call(baseUrl+'/org/upORGApply', cnt, callback)
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
//请求资产类型--列表
api.getAssetType = function (cnt,callback) {
    util.call(baseUrl+'/asset/getAssetType', cnt, callback)
}
//请求资源类型--列表
api.getResType = function (cnt,callback) {
    util.call(baseUrl+'/asset/getResType', cnt, callback)
}
//请求创建时间（年份） --列表
api.getBuildTime  = function (cnt,callback) {
    util.call(baseUrl+'/asset/getBuildTime ', cnt, callback)
}
//请求经营方式--列表
api.getBusinessMode  = function (cnt,callback) {
    util.call(baseUrl+'/asset/getBusinessMode ', cnt, callback)
}
//请求区级平台下-所有的org列表
api.getORGSByDistrictId  = function (cnt,callback) {
    util.call(baseUrl+'/org/getORGSByDistrictId ', cnt, callback)
}
//请求条件搜素对应资产统计数据--根据不同的年份查询
api.districtCountByYears  = function (cnt,callback) {
    util.call(baseUrl+'/asset/districtCountByYears ', cnt, callback)
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

export default api

