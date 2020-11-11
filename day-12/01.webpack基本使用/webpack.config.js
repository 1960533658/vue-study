const path = require('path')
const HtmlWebpackplugin = require('html-webpack-plugin')
module.exports = {
  // 编译打包模式
  // development(不压缩 可以看到注释和代码)
  // production 压缩 看不到注释和代码
  //  none 无变化
  mode: "development",
  // 入口 entry
  entry: './src/main.js',
  // 出口 output
  output: {
    // 出口路径（编译打包的js文件输出到哪里
    path: path.resolve(__dirname, 'dist'),
    // 输出文件的名称
    filename: "bundle.js"
  }
}