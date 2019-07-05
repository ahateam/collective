import axios from 'axios'
import jsonp from 'jsonp'
/**
 * @commen.js  全局的js方法
 *
 */


/**
 * @getWXUserCode      获取用户的微信的code
 *
 * @appId               微信公众号的appid
 * @redirectUrl        成功之后的回调页面redirectUrl
 */
function getWXUserCode(appId,redirectUrl) {
    let info = ''
    let ua = window.navigator.userAgent.toLowerCase();
    let isWX = ua.match(/MicroMessenger/i) == 'micromessenger'
    if( isWX == true){
        let address = " https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base"
        window.location.href=address
    }else{
        info = '请从微信打开访问...'
        return info
    }
}


/** 判断是否为手机登录 判断手机平台 跳转连接的封装*/

function jumpUrl(url) {
    var ua = navigator.userAgent.toLowerCase()
    if(typeof window !== 'undefined'){
        window.location.href =url
    }else{
        document.addEventListener('plusready',function() {
            let uuid= plus.device.uuid
            if(ua.match(/iPhone\sOS/i) == "iphone os"){
                plus.runtime.openURL(url)
            }else if(ua.match(/Android/i) == "android"){
                plus.runtime.openURL(url)
            }
        },false)
    }


}


export default {
    getWXUserCode,
    jumpUrl
}
