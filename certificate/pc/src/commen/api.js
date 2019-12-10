import util from 'ahaapi'
import url from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let baseUrl = url.baseUrl

let api = {};
console.log('开始调用ctrl');



//获取所有合作社
api.getCooperativeList = function (cnt,callback) {
    util.call(baseUrl+'/org/getCooperativeList', cnt, callback)
}

//获取删除资产详情
api.delORGAsset = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGAsset ', cnt, callback)
}

//获取删除用户详情
api.delORGUser = function (cnt,callback) {
    util.call(baseUrl+'/org/delORGUser ', cnt, callback)
}

//移除下级机构
api.delSubOrg = function (cnt,callback) {
    util.call(baseUrl+'/org/delSubOrg', cnt, callback)
}


//机构列表
api.getORGList = function (cnt,callback) {
    util.call(baseUrl+'/scft/getORGList', cnt, callback)
}
//机构下的户列表
api.getFamilyMasterList = function (cnt,callback) {
    util.call(baseUrl+'/scft/getFamilyMasterList', cnt, callback)
}
    
//获取家庭户详情
api.getFamilyInfo = function (cnt,callback) {
    util.call(baseUrl+'/scft/getFamilyInfo', cnt, callback)
}
	



export default api
