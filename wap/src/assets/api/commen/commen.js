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
        //
        // let href = window.location.href=address;
        // if (href.includes("com/?code")) {  //url包括 com/?code 证明为从微信跳转回来的
        //     let url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
        //     let jingPosit = url.indexOf("com/") + 4; //获取域名结束的位置
        //     let urlLeft = url.substring(0, jingPosit);//url左侧部分
        //     let urlRight = url.substring(jingPosit, url.length); //url右侧部分
        //     window.location = urlLeft + "#/" + urlRight;//拼接跳转
        // }

        window.location.href=address
        // let data =''
        // let codeStr=''
        // let info = window.location.href
        // if(info.indexOf('code') >-1){
        //     data = info.substr(info.indexOf('code'))
        //    let arr = data .split('&')
        //     codeStr = arr[0]
        //     codeStr = this.codeStr.substr(codeStr.indexOf('=')+1)
        // }
        // console.log(codeStr)
        //
        // window.location.href =''
        // this.$router.push({
        //     path:'/userWX',
        //     name:'userWx',
        //     params:{
        //         code:codeStr
        //     }
        // })

    }else{
        info = '请从微信打开访问...'
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
    // jsonp(url
    // })

        // axios.get(url)
        //     .then(function (res) {
        //         console.log(res)
        //       return res
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         return '0'
        //     });

        // window.location.href=url
        jsonp(url,(res)=>{
            console.log(res)
        })
}



export default {
    getWXUserCode,
    getWXUserOpenId
}
