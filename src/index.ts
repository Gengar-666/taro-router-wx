import Taro from '@tarojs/taro'
import qs from 'qs'
import History from './history'
import Hooks from './hooks'
import { BeforeEachHookCallBack, AfterEachHookCallBack, Location } from './types'

class TaroRouter {
  history: History

  constructor() {
    this.history = new History()
  }

  /**
   * 异步获取当前页面打开方式
   * @param cb
   */
  getPageOpenTypeSync(cb: (openType?: string) => void) {
    // 使用定时器把获取任务推到任务栈栈底，不然获取到的都是上一次的
    setTimeout(() => cb(this.history.currentPageOpenType), 0)
  }

  /**
   * 获取路由参数
   */
  get query() {
    let pages = Taro.getCurrentPages()
    let query = pages[pages.length - 1].options
    delete query.__key_
    return query
  }

  /**
   * 获取当前页面路径
   */
  get path() {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    return currentPage.route
  }

  /**
   * 获取当前页面完整路径
   */
  get fullPath() {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let query = pages[pages.length - 1].options
    let fullPath = `${currentPage.route}?${qs.stringify(query)}`
    return fullPath
  }

  /**
   * 获取当前页面实例
   */
  get currentPage() {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    return currentPage
  }

  /**
   * 普通跳转
   * @param {Location} location 
   */
  push(location: Location) {
    this.history.push(location)
  }

  /**
   * 重定向
   * @param {Location} location 
   */
  replace(location: Location) {
    this.history.replace(location)
  }

  /**
   * tabbar页面跳转
   * @param {Location} location 
   */
  switchTab(location: Location) {
    this.history.switchTab(location)
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {Location} location 
   */
  relaunch(location: Location) {
    this.history.relaunch(location)
  }

  /**
   * 返回
   */
  back() {
    this.history.back()
  }

  /**
   * 路由跳转前的钩子函数
   * @param beforeEachHookCallBack hook回调函数
   */
  beforeEach(beforeEachHookCallBack: BeforeEachHookCallBack) {
    Hooks.beforeEachHookCallBack = beforeEachHookCallBack
  }

  /**
   * 路由跳转后的钩子函数
   * @param afterEachHookCallBack hook回调函数
   */
  afterEach(afterEachHookCallBack: AfterEachHookCallBack) {
    Hooks.afterEachHookCallBack = afterEachHookCallBack
  }

  /**
   * 自动把router实例挂载到ReactComponet原型上。
   * @param componet 组件实例
   */
  installReact(React) {
    React.Component.prototype.$router = this
  }

  /**
   * 自动把router实例挂载到NervComponet原型上。
   * @param componet 组件实例
   */
  installNerv(Taro) {
    Taro.Component.prototype.$$router = this
  }

  /**
   * 适用Vue.use
   */
  install(Vue) {
    Vue.prototype.$router = this
  }
}

const route = new TaroRouter()

export const useRouter = () => route

export default route