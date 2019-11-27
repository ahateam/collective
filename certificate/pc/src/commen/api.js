import util from 'ahaapi'
import url from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let baseUrl = url.baseUrl

let api = {};
console.log('开始调用ctrl');



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
