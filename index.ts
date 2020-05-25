import History from './history'
import Hooks from './hooks'
import { BeforeEachHookCallBack, Location } from './types'


class TaroRouter {
  history: History

  constructor() {
    this.history = new History()
  }

  push(location: Location) {
    this.history.push(location)
  }

  replace(location: Location) {
    this.history.replace(location)
  }

  switchTab(location: Location) {
    this.history.switchTab(location)
  }

  relaunch(location: Location) {
    this.history.relaunch(location)
  }

  back() {
    this.history.back()
  }

  beforeEach(beforeEachHookCallBack: BeforeEachHookCallBack) {
    Hooks.beforeEachHookCallBack = beforeEachHookCallBack
  }

  register(componet) {
    componet.prototype.$router = this
  }
}

export default TaroRouter