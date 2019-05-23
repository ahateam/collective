import axios from 'axios'

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
        let url = " https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base"
        // console.log(url)
        window.location.href=url
        // return url
    }else{
        info = '请从微信访问...'
        return info
    }
}

/**
 *@getWXUserOpenId      获取微信用户的openid
 *
 * appId                   微信公众号的appid
 * secret                  微信公众号的开发者secret
 * code                    上一个接口请求得到的code
 *
 * */
function getWXUserOpenId(appId,secret,code) {
    let url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appId+"&secret="+secret+"&code="+code+"&grant_type=authorization_code"

    axios.get(url)
        .then(function (res) {
          return res
        })
        .catch(function (error) {
            return '0'
        });
}



export default {
    getWXUserCode,
    getWXUserOpenId
}
