"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = __importDefault(require("@tarojs/taro"));
const qs_1 = __importDefault(require("qs"));
const history_1 = __importDefault(require("./history"));
const hooks_1 = __importDefault(require("./hooks"));
class TaroRouter {
    constructor() {
        this.history = new history_1.default();
    }
    /**
     * 获取路由参数
     */
    get query() {
        let pages = taro_1.default.getCurrentPages();
        let query = pages[pages.length - 1].options;
        delete query.__key_;
        return query;
    }
    /**
     * 获取当前页面路径
     */
    get path() {
        let pages = taro_1.default.getCurrentPages();
        let currentPage = pages[pages.length - 1];
        return currentPage.route;
    }
    /**
     * 获取当前页面完整路径
     */
    get fullPath() {
        let pages = taro_1.default.getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let query = pages[pages.length - 1].options;
        let fullPath = `${currentPage.route}?${qs_1.default.stringify(query)}`;
        return fullPath;
    }
    /**
     * 获取当前页面实例
     */
    get currentPage() {
        let pages = taro_1.default.getCurrentPages();
        let currentPage = pages[pages.length - 1];
        return currentPage;
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
     * 路由跳转后的钩子函数
     * @param afterEachHookCallBack hook回调函数
     */
    afterEach(afterEachHookCallBack) {
        hooks_1.default.afterEachHookCallBack = afterEachHookCallBack;
    }
    /**
     * 自动把router实例挂载到ReactComponet原型上。
     * @param componet 组件实例
     */
    installReact(React) {
        React.Component.prototype.$router = this;
    }
    /**
     * 自动把router实例挂载到NervComponet原型上。
     * @param componet 组件实例
     */
    installNerv(Taro) {
        Taro.Component.prototype.$$router = this;
    }
    /**
     * 适用Vue.use
     */
    install(Vue) {
        Vue.prototype.$router = this;
    }
}
exports.default = new TaroRouter();
