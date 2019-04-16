import util from 'ahaapi'


const baseUrl = 'http://47.99.212.32/api/jiti';  //正式服请求地址前缀


// const baseUrl = 'http://192.168.1.155:8080/jiti';  //本地请求地址前缀
// const baseUrl = 'http://47.99.209.235/api/jiti';  //测试服请求地址前缀


let api = {};
console.log('开始调用ctrl');


//账号登录
api.getGroup = function (cnt,callback) {
    util.call(baseUrl+'/demon/getGroup', cnt, callback)
}
//资产列表
api.getAsset= function (cnt,callback) {
    util.call(baseUrl+'/demon/getAsset', cnt, callback)
}
//根据id查找资产详情 /demon/getAssetById
api.getAssetById= function (cnt,callback) {
    util.call(baseUrl+'/demon/getAssetById', cnt, callback)
}
//合作社管理登录
api.loginByMobileAndPwd= function (cnt,callback) {
    util.call(baseUrl+'/org/loginByMobileAndPwd', cnt, callback)
}

//根据用户请求机构列表
api.getUserORGs= function (cnt,callback) {
    util.call(baseUrl+'/org/getUserORGs', cnt, callback)
}

//选择机构登录
api.adminLoginInORG= function (cnt,callback) {
    util.call(baseUrl+'/org/adminLoginInORG', cnt, callback)
}



export default api
