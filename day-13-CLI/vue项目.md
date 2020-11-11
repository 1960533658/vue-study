# vue CLI 脚手架
`安装Vue CLI 这个系统 之后可以使用哦个Vuecreate 命令创建一个vue项目`
```shell
npm install -g @vue/cli
```
`开始创建vue脚手架`
```shell
vue create vuesyntax
```
### 选择默认项
![1603176952261](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603176952261.png)

### 选择配置项

![1603177023921](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603177023921.png)

### 选择版本

![1603177160268](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603177160268.png)



### 选择代码规范模式

![1603177333301](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603177333301.png)

### 选择什么时候用于触发代码规范提示和美化

![1603177425410](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603177425410.png)

### 选择label和eslint的配置文件方式

![1603177480686](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1603177480686.png)

### 启动服务
`按照顺序`
```shell
cd vuesyntax
npm run serve
```


`CTRL+左单机打开地址或浏览器输入地址开启`
```shell
- Local:   http://localhost:8080/     
- Network: http://192.168.43.210:8080/
```

*******
之后就会出现vue项目文件包，之后找到README.md,其中就是上线之后的各种操作的简单指令
*******
## README.md
# vuesyntax

## Project setup 
`根据package.json下载所需包（在git中下载项目是没有node_modules文件的`
```
npm install
```

### Compiles and hot-reloads for development
`运行服务`
```
npm run serve
```

### Compiles and minifies for production
`编译程序`
```
npm run build
```

### Lints and fixes files
`解决警告`
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
