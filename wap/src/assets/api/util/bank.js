import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');



//正常登录
api.loginByMobileAndPwd = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}
//根据用户获取组织列表
api.getUserORGs = function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}
//二次登录
api.adminLoginInORG = function (cnt,callback) {
    util.call(baseUrl+'/org/adminLoginInORG', cnt, callback)
}
//根据手机号查找用户
api.getUsersByMobile = function (cnt,callback) {
    util.call(baseUrl+'/org/getUsersByMobile', cnt, callback)
}
//根据userid+密码登录
api.loginByUserId = function (cnt,callback) {
    util.call(baseUrl+'/org/loginByUserId', cnt, callback)
}
//获取银行下的组织列表
api.getORGByBank = function (cnt,callback) {
    util.call(baseUrl+'/bank/getORGByBank', cnt, callback)
}

api.getVoteDetail = function (cnt,callback) {
    util.call(baseUrl+'/vote/getVoteDetail', cnt, callback)
}



export default api
