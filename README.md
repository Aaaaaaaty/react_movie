# prwd_movie
> 影院react版

> 技术栈：react redux sass webpack es6
asasasasas

## Directory

```
│  .gitignore
│  index.html         入口页面
│  package.json
│  README.md
│  webpack.config.js  webpack配置
│
├─dist                打包生成
│     
└─src
    │  main.js        项目入口
    │  setup.js       初始化账户
    │
    ├─container         容器组件
    │
    ├─components      子组件
    │
    ├─constant     静态常量
    │
    ├─redux          redux状态管理框架
    │  ├─action
    │  ├─reducer
    │  ├─store
    │     
    ├─router          路由
    │
    ├─store           vuex文件
    │
    ├─utils            通用文件
    │
    │
    └─styles           样式文件

```


## Setup
####环境
* Node.js **v6**

克隆远程库
```
git clone http://gitlab.sys.wanmei.com/java-movies/weixin.git
```
进入项目目录
```
cd weixin
```
安装依赖
```
cnpm install

```
webpack打包开启监听
```
webpack --watch
```
## Licence
MIT
