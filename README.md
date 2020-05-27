# taro-router-wx
>taro版本的微信小程序路由

## install

```
$ npm install taro-router-wx
```

## usage

```js
// React
import React, { Component } from 'react'
import router from 'taro-router-wx'
router.installReact(React)

// Nerv
import Taro, { Component } from "@tarojs/taro";
import router from 'taro-router-wx'
router.installNerv(Taro)

// Vue
import Vue from 'vue'
import router from 'taro-router-wx'
Vue.use(router)

// 全局注册路由跳转前的钩子函数，可以拦截路由跳转
router.beforeEach((to, from, next) => {
  console.log('当前页面:', to.path)
  console.log('即将跳转的页面:', from.path)

  // todo ..

  // 必须执行next方法resolve进行跳转，否则跳转永远不会被执行
  next()

  // 阻止跳转
  next(false)

  // 重新跳转新的页面
  next({path:'pages/test/index', query:{ test: 1 }})
})

// 全局注册路由成功跳转后的钩子函数
router.afterEach((res, page) => {
  console.log('页面跳转成功 ===========')
  console.log('当前页面信息', res)
  console.log('当前页面实例', page)

  // todo ..
})

// 路由跳转
// React，Vue使用this.$router访问路由实例
// Nerv使用this.$$router访问

let location = {path: 'pages/test/index', query:{ test:1 }}
// 或者
// let location = 'pages/test/index?test=1'

// navigateTo
this.$router.push(location)

// redirectTo
this.$router.replace(location)

// switchTab
this.$router.switchTab(location)

// relaunch
this.$router.relaunch(location)

// navigateBack
this.$router.back()

// 获取页面参数
this.$router.query

// 获取页面路径
this.$router.path

// 获取当前页面完整路径
this.$router.fullPath

// 获取当前页面实例
this.$router.currentPage
```