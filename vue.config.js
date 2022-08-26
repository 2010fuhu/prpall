module.exports = {
    devServer: {
        port: 8080, // 端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名， 127.0.0.1，  真机 0.0.0.0
        https: false, //协议
        open: true, //启动服务时自动打开浏览器访问
        proxy: { // 开发环境代理配置
            // '/dev-api': {
            [process.env.VUE_APP_BASE_API] :{
                // 目标服务器地址，代理访问 http://localhost:8001
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true, // 开启代理服务器，
                pathRewrite: {
                    // /dev-api/db.json 最终会发送 http://localhost:8001/db.json
                    // 将 请求地址前缀 /dev-api 替换为 空的，
                    // '^/dev-api': '',
                    [ '^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    //基本路径
    publicPath: process.env.NODE_ENV === 'production'? './': '/',
    //publicPath: process.env.NODE_ENV === 'production'? '/': '/',
    outputDir: 'prpall',
    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'static',
    //以多页模式构建应用程序。
    pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    parallel: require('os').cpus().length > 1,
    lintOnSave: false, // 关闭格式检查
    productionSourceMap: true, // 打包时不会生成 .map 文件，加快打包速度
    transpileDependencies: ["*"],
    configureWebpack: {
      //警告 webpack 的性能提示
      devtool: 'source-map',
      performance: {
        hints: "warning",
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith(".js");
        },
      },
    }
}