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
   * 当前页面实例
   */
  app?: {}

  /** 
   * 当前页面路由信息
   */
  current: RouterInfo

  /**
   * 所有访问过的页面路由信息
   */
  pages: RouterInfo[]

  constructor() {

    this.app = {}

    this.current = {} as RouterInfo

    this.pages = [] as RouterInfo[]

    this.listen()
  }

  /**
 * 监听路由变化
 */
  listen() {
    wx.onAppRoute(res => {
      const { webviewId, path, query } = res
      delete query.__key_
      const fullPath = getUrl({ path, query }) as string

      if (!this.pages.some(page => page.webviewId === webviewId)) {
        this.pages.push({ webviewId, fullPath, path, query })
      }

      this.app = Taro.getCurrentPages().pop()
      this.current = { webviewId, fullPath, path, query }
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
      Hooks.beforeEachHookCallBack(this.current, from, async (param, openType = 'push') => {
        await hookNext(param)
        if (typeof param === 'object') {
          return this[openType](param, openType)
        }
        if (typeof param === 'function') {
          Taro[OPEN_TYPES[openType]]({ url: URL })
          return setTimeout(() => param(Taro.getCurrentPages().pop()), 1000)
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
    this.toPage(location, 'replace')
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {Location} location 
   */
  relaunch(location: Location) {
    this.toPage(location, 'replace')
  }

  /**
   * 返回
   */
  back() {
    Taro.navigateBack({ delta: 1 })
  }
}

export default History