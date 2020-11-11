# webpack
下载 
  npm install --save-dev webpack
  npm install --save-dev webpack -cli
  npm init -y 创建初始化文件pack.json
  npm install lodash
书写文件main.js内容为
```js
import _ from "lodash";
let str = "dsjdosdjsjdksljd";
console.log((_.upperCase(str)));
```
创建并书写webpack.config.js文件为
```js
const path = require('path')
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
```
修改项目文件package.json中的test的下一个
```js
"build": "webpack"
```
此时在命令端输入 npm run build（build与pack.json)有关
## webpack概述
同过ts、ES6等开发的应用不能直接放到服务器，因为服务器不解析，你们就可以通过webpack转化生成浏览器可以识别并执行的代码
目前市场上的打包工具rollup、webpack、gulp/grunt

## webpack是什么
官方解释：webpack是一个现代的JavaScript是一个现代的静态模块打包工具
也就是说webpack是一种前端资源构建工具，一个静态模块打包器（module，bundler）
它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundie）

webpack为了能够正常运行必须依赖node环境，node环境为了正常执行很多代码必须依赖很多包，npm (node packages manager)
工具是为了管理node的包

## webpack 简单使用
`.npmrc 百度搜索 npm命令替换镜像加快下载速度`

### 第一步：下载webpack
```shell
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

### 第二步：书写webpack的配置文件
*webpack*

### 第三步：书写项目代码


### 第四步：运行编译打包项目代码
```shell
 #如果没有package.json
 npx webpack
 # 如果有package.json
 script：{
   "build"：webpack
 }
```

### 第五步 自动转化命令
```shell
npm run build
```
## 自动生成index.html
`如果webpack.config.json中的输出目录的文件名改变的话就会在原来的文件下添加新的文件，这样就会出现问题，因为文件可能会越来越多`
第一步:下载html --savepack-plugin
```shell
// 自动生成html文件，且html文件中的链入文件地址也会自动变化
npm install --save-dev html-webpack-plugin
// 清除多余的文件名修改之后的旧文件
npm install clean-webpack-plugin --save-dev
```
第二步:引入html-webpack-plugin
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
```
第三步:使用：
```js
plugins:[
  new HtmlWebpackPlugin({
    title:'Output Management'
  })
]
```
### 清理文件dist文件
第一步： 下载clean-webpack-plugin
```shell
  npm install clean-webpack-plugin --save-dev
```

第二步：引入 html-webpack-plugin
```js
  const {HtmlWebpackPlugin} = require('html-webpack-plugin')
```

第三步：使用：
```js
plugins：[
  new HtmlWebpackPlugin({
    title:'Output Management'
  })
]
```

## 配置css文件
`因为默认指挥识别js文件，当我们需要识别其他类型的时候我们就得需要loader,比如css文件`
### 引入loader 命令
```shell
// 有`--save-dev`是开发依赖没有是线上依赖
npm install --save-dev style-loader css-loader
```

### 配置css所需包 
此时我们的根文件夹里中的package.json(npm init)文件是这样
```json
{
  "name": "webpacck-css",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // 开发依赖
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.0",
    "html-webpack-plugin": "^4.5.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.1.3",
    "webpack-cli": "^4.0.0"
  },
  // 线上依赖
  "dependencies": {},
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
`没有的包使用命令 npm install 补全`

### 基本文件格式书写
`在src中创建css文件夹 index.css 写入样式`
```css
.main {
  width: 200px;
  height: 200px;
  background-color: red;
}
```

`main.js`
```js
// 在js中直接引入css文件 创建元素添加到body内
import "./css/index.css";
let div = document.createElement('div');
div.classList.add('main');

document.body.appendChild(div);
```

`在webpack.config.json中写入代码`
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "自动生成了~~~~~~~~"
    })
  ]
}
```

`使用npx build 打包导出此文件 打开index.html文件 即可进入配置好css的文件内 npx可以多次使用看哪里没写好`

## 配置脚手架
`目的是为了和生成和vue脚手架一样的文件效果`
### vue 自动生成脚手架
`需要先下载vue cli 才能下载`
```shell
vue create vue-hello
```
### 文件依赖
`package.json  npm install vue@next可以下载最新版本vue`
```json
{
  "name": "webpacck-css",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.0",
    "html-webpack-plugin": "^4.5.0",
    "style-loader": "^2.0.0",
    "webpack": "^5.1.3",
    // TODO
    "vue": "^3.0.1",
    "vue-loader-v16": "^16.0.0-beta.5.4",
    "vue-template-compiler": "2.6.12",
    "@vue/compiler-sfc": "3.0.1",
    "webpack-cli": "^4.0.0"
    // TODO
  },
  "dependencies": {},
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

### 文件配置 在src文件夹下创建文件App.vue main.js
`App.vue`
```vue
<template>
  <h1>hello kangkang</h1>
</template>

<script>
export default {

}
</script>

<style>

</style>
```

`main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount('#app')
```

### 以某一个html为模板
`webpack.config.js`
```js
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
```

### 所有的文件目录（自己创建的文件）
public
  index.html
src
  App.js
  main.js
webpack.config.js
`其他的都是文件目录都是npm init创建 和npx webpack 根据webpack.config.js创建`