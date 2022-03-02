const path = require("path");
const IS_PROD = ["production", "development", "test"].includes(
  process.env.NODE_ENV
);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./", // 公共路径
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"));
    // 正式环境下，删除console和debugger
    config.optimization
      .minimize(true)
      .minimizer("terser")
      .tap((args) => {
        let { terserOptions } = args[0];
        terserOptions.compress.drop_console = true;
        terserOptions.compress.drop_debugger = true;
        return args;
      });
  },
  css: {
    // extract: IS_PROD,// CSS 热更新 生产环境下是 true，开发环境下是 false
    requireModuleExtension: true, // 去掉文件名中的 .module
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        globalVars: {
          primary: "#333",
        },
        // 给 sass-loader 传递选项
        sass: {
          prependData: `
          @import "@/assets/styles/scss/index.scss";
        `,
        },
      },
    },
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    // 注释 host 可选择 localhost 或者 ip 展示
    // host: "localhost", // 域名
    // port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // 代理 配置
    // proxy: {
    //   //配置多个跨域
    //   "/api": {
    //     target: " ",
    //     changeOrigin: true, // 开启跨域
    //     // ws: true,//websocket支持
    //     secure: false,
    //     // 路径重写
    //     pathRewrite: {
    //       "^/api": "/",
    //     },
    //   },
    // },
  },
};
