import qs from 'qs'
import Taro from '@tarojs/taro'
import Hooks from './hooks'
import { RouterInfo, Location, HookNext } from './types'

/**
 * 获取需要跳转的路由
 * @param {string | {}} location
 * @return {string}
 */
function getUrl(location: Location) {
  if (typeof location === 'string') {
    return location
  } else if (typeof location === 'object') {
    const { path, query } = location
    if (JSON.stringify(query) === '{}') {
      return path
    }
    return `${path}?${qs.stringify(query)}`
  } else {
    console.error('router.push传递参数类型错误!')
    return ''
  }
}

/**
 * 结束hook函数
 * @param {*} location 
 */
const hookNext: HookNext = param => {
  return new Promise(resolove => {
    if (param !== false) {
      resolove(param)
    }
  })
}

class History {

  /**
   * 当前页面打开方式
   */
  currentPageOpenType

  constructor() {
    this.listen()
  }

  /**
   * 当前页面栈的长度
   */
  get length() {
    return Taro.getCurrentPages().length
  }

  /**
   * 监听路由变化
   */
  listen() {
    wx.onAppRoute(res => {
      this.currentPageOpenType = res.openType

      let pages = Taro.getCurrentPages()
      let currentPage = pages[pages.length - 1]
      delete res.query.__key_

      if (Hooks.afterEachHookCallBack) {
        Hooks.afterEachHookCallBack(res, currentPage)
      }
    })
  }

  /**
   * 页面跳转统一处理
   * @param {string | {}}} location 
   * @param {string} openType 
   */
  toPage(location: Location, openType: string) {

    enum OPEN_TYPES {
      'push' = 'navigateTo',
      'replace' = 'redirectTo',
      'switchTab' = 'switchTab',
      'relaunch' = 'relaunch'
    }

    const URL = getUrl(location)

    if (!URL) {
      return
    }

    let from;

    if (typeof location === 'string') {
      from = { path: location }
    } else if (typeof location === 'object') {
      from = { path: location, query: location.query || {} }
    }

    if (Hooks.beforeEachHookCallBack) {

      let pages = Taro.getCurrentPages()
      let currentPage = pages[pages.length - 1]
      let path = currentPage.route
      let query = currentPage.options
      delete query.__key_

      let to = {
        path,
        query
      } as RouterInfo

      Hooks.beforeEachHookCallBack(to, from, async (param, newOpenType = 'push') => {
        await hookNext(param)
        if (typeof param === 'object') {
          return this[openType](param, newOpenType)
        }
        return Taro[OPEN_TYPES[openType]]({ url: URL })
      })
    } else {
      Taro[OPEN_TYPES[openType]]({ url: URL })
    }
  }

  /**
   * 普通跳转
   * @param {Location} location 
   */
  push(location: Location) {
    this.toPage(location, 'push')
  }

  /**
   * 重定向
   * @param {Location} location 
   */
  replace(location: Location) {
    this.toPage(location, 'replace')
  }

  /**
   * tabbar页面跳转
   * @param {Location} location 
   */
  switchTab(location: Location) {
    this.toPage(location, 'switchTab')
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {Location} location 
   */
  relaunch(location: Location) {
    this.toPage(location, 'relaunch')
  }

  /**
   * 返回
   */
  back() {
    Taro.navigateBack({ delta: 1 })
  }
}

export default History