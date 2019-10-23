import util from 'ahaapi'
import baseUrl from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let api = {};
console.log('开始调用ctrl');



//机构列表
api.getFamilyInfo = function (cnt,callback) {
    util.call(baseUrl+'/scft/getFamilyInfo', cnt, callback)
}




export default api
