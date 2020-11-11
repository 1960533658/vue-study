const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 导入vue文件信息
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin.js').default
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
  },
  // loader
  module: {
    // 规则
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 配置vue文件所需条件
      {
        test: /\.vue$/,
        loader: "vue-loader-v16"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 把index.html作为模板创建到dist目录
      template: "./public/index.html"
    }),
    new VueLoaderPlugin()
  ]
}