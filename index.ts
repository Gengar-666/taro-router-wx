import History from './history'
import Hooks from './hooks'
import { BeforeEachHookCallBack, Location } from './types'


class TaroRouter {
  history: History

  constructor() {
    this.history = new History()
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
   * 自动把router实例挂载到Componet原型上。
   * @param componet 组件实例
   */
  register(componet) {
    componet.prototype.$router = this
  }
}

export default TaroRouter