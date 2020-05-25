"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = __importDefault(require("./history"));
const hooks_1 = __importDefault(require("./hooks"));
class TaroRouter {
    constructor() {
        this.history = new history_1.default();
    }
    /**
     * 普通跳转
     * @param {Location} location
     */
    push(location) {
        this.history.push(location);
    }
    /**
     * 重定向
     * @param {Location} location
     */
    replace(location) {
        this.history.replace(location);
    }
    /**
     * tabbar页面跳转
     * @param {Location} location
     */
    switchTab(location) {
        this.history.switchTab(location);
    }
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param {Location} location
     */
    relaunch(location) {
        this.history.relaunch(location);
    }
    /**
     * 返回
     */
    back() {
        this.history.back();
    }
    /**
     * 路由跳转前的钩子函数
     * @param beforeEachHookCallBack hook回调函数
     */
    beforeEach(beforeEachHookCallBack) {
        hooks_1.default.beforeEachHookCallBack = beforeEachHookCallBack;
    }
    /**
     * 自动把router实例挂载到Componet原型上。
     * @param componet 组件实例
     */
    register(componet) {
        componet.prototype.$router = this;
    }
}
exports.default = TaroRouter;
