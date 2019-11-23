// import 'babel-polyfill'
// import './promise-6.1.0'

// import './aliyun-oss-sdk.min'

const OSS = require('ali-oss');


let client = new OSS({
    region: 'oss-cn-hangzhou',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    
    //小红椒
    // accessKeyId: 'LTAIJ9mYIjuW54Cj',
    // accessKeySecret: '89EMlXLsP13H8mWKIvdr4iM1OvdVxs',
    //测试服
    // bucket: 'jiti-img-test'
    // 正式服
    // bucket: 'jitijingji-test1'
    
    //云讯
    accessKeyId: 'LTAI4FgJibdQgparTs4Nba8E',
    accessKeySecret: 'kDJX4Hicd8H00m16GCSdNN7TJRex9g',
    //云讯正式服
    bucket: 'production-file',
    //云讯测试服
    // bucket: 'test-file-jiti',
});

export default {
    client,
}
