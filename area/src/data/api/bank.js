import util from 'ahaapi'
import url from './url'

// let appId = process.env.appID;//应用编号
// let appId ='';

let baseUrl = url.baseUrl


let api = {};
console.log('开始调用ctrl');


//账号登录
api.bankAdminLogin	 = function (cnt,callback) {
    util.call(baseUrl+'/bank/bankAdminLogin', cnt, callback)
}


export default api

