import url from './api/url'
let ossBaseUrl = url.ossUrl
 function getDateStr () {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + ' 年 ' + month + ' 月 ' + strDate+ ' 日';
    return currentdate;
}

function getOssUrl(url){
    let OssUrl = ossBaseUrl+url
    return OssUrl
}




export default {
    getDateStr,
    getOssUrl
}
