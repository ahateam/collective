

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? './'
        : './',
    devServer: {
        proxy: {
            '/sns/oauth2/access_token': {    // search为转发路径
                target: ' https://api.weixin.qq.com',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            },
        }
    },

}
