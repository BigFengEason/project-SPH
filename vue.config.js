module.exports = {
    productionSourceMap:false,
    lintOnSave: false,       //关闭ESLint校验
    publicPath: './',//修改目录
    // // 代理跨越  
    // devServer: {
    //     proxy: {
    //         "/api": {   // 若请求路径中带有/api，则走代理服务器
    //             target: "http://gmall-h5-api.atguigu.cn",
    //             // pathRewrite: { "^/api": "" }
    //         }
    //     }
    // }
}