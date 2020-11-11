// import path from 'path';
const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // 入口文件
  entry: './src/main.js',
  // 出口文件
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      // 加载Vue单文件组件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'style-loader!css-loader!sass-loader',
            sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
          },
        }
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 加载sass 
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }

    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // vue-loader 要求的
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      // 新创建一个html文件 并往body中添加一个id为app的div 在这个div中添加router-view标签
      appMountId: 'app',
      // appMountHtmlSnippet: '<router-view></router-view>',
      lang: 'en-US',
      title: 'HappyAnswer',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }
      ],
    })
  ]
}