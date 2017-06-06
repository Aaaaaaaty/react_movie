# prwd_movie
> 影院react版

> 技术栈：react redux sass webpack es6

## Directory

```
│  .gitignore
│  index.html         入口页面
│  package.json
│  README.md
│  webpack.config.js  webpack配置
│
├─dist                打包目录
│     
└─src
    │  App.js        项目入口
    │
    ├─container      容器组件
    │
    ├─components      子组件
    │
    │
    ├─redux          redux状态管理
    │  ├─action
    │  ├─reducer
    │  ├─store
    │     
    ├─router          路由
    │
    │
    ├─utils            通用文件
    │
    │
    └─styles           通用样式文件

```


## Setup

``` 
git clone https://github.com/Aaaaaaaty/react_movie 

cd react_movie 

cnpm i || npm i

将./data及./src/images 文件 拷贝进dist //项目依赖的图片及假数据

npm start

```

## 效果预览
### 区域选择组件
![区域选择](https://dn-mhke0kuv.qbox.me/bbd349f5eea3aaf661ae)
### 电影列表组件
![电影列表](https://dn-mhke0kuv.qbox.me/48d55570a6113a5c74bf)
### 电影详情组件
![电影详情](https://dn-mhke0kuv.qbox.me/8a548a80b0f4a1d9ac36)
### 电影排期组件
![电影排期](https://dn-mhke0kuv.qbox.me/4e113ca5799e239c89f8)
### 电影选座组件
![选座组件](https://dn-mhke0kuv.qbox.me/247556ed695bcbdb2b91.gif)

