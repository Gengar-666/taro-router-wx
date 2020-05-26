import { Hooks } from './types'

const HOOKS: Hooks = {
  /**
   * 路由跳转前的Hook回调函数
   */
  beforeEachHookCallBack: null,

  /**
   * 路由跳转后的Hook回调函数
   */
  afterEachHookCallBack: null
}

export default HOOKS