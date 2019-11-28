import url from './url'
let ossUrl = url.ossUrl

const commen = {}
commen.getDateStr = ()=>{
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
    let currentdate = year + '- ' + month + ' - ' + strDate+ ' -';
    return currentdate;
}
commen.getOssUrl = (url)=>{
    return ossUrl+url
}


export default commen