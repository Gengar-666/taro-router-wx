"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const taro_1 = __importDefault(require("@tarojs/taro"));
const hooks_1 = __importDefault(require("./hooks"));
/**
 * 获取需要跳转的路由
 * @param {string | {}} location
 * @return {string}
 */
function getUrl(location) {
    if (typeof location === 'string') {
        return location;
    }
    else if (typeof location === 'object') {
        const { path, query } = location;
        if (JSON.stringify(query) === '{}') {
            return path;
        }
        return `${path}?${qs_1.default.stringify(query)}`;
    }
    else {
        console.error('router.push传递参数类型错误!');
    }
}
/**
 * 结束hook函数
 * @param {*} location
 */
const hookNext = param => {
    return new Promise(resolove => {
        if (param !== false) {
            resolove(param);
        }
    });
};
class History {
    constructor() {
        this.app = {};
        this.current = {};
        this.pages = [];
        this.listen();
    }
    /**
   * 监听路由变化
   */
    listen() {
        wx.onAppRoute(res => {
            const { webviewId, path, query } = res;
            delete query.__key_;
            const fullPath = getUrl({ path, query });
            if (!this.pages.some(page => page.webviewId === webviewId)) {
                this.pages.push({ webviewId, fullPath, path, query });
            }
            this.app = taro_1.default.getCurrentPages().pop();
            this.current = { webviewId, fullPath, path, query };
        });
    }
    /**
     * 页面跳转统一处理
     * @param {string | {}}} location
     * @param {string} openType
     */
    toPage(location, openType) {
        let OPEN_TYPES;
        (function (OPEN_TYPES) {
            OPEN_TYPES["push"] = "navigateTo";
            OPEN_TYPES["replace"] = "redirectTo";
            OPEN_TYPES["switchTab"] = "switchTab";
            OPEN_TYPES["relaunch"] = "relaunch";
        })(OPEN_TYPES || (OPEN_TYPES = {}));
        const URL = getUrl(location);
        if (!URL) {
            return;
        }
        let from;
        if (typeof location === 'string') {
            from = { path: location };
        }
        else if (typeof location === 'object') {
            from = { path: location, query: location.query || {} };
        }
        if (hooks_1.default.beforeEachHookCallBack) {
            hooks_1.default.beforeEachHookCallBack(this.current, from, async (param, openType = 'push') => {
                await hookNext(param);
                if (typeof param === 'object') {
                    return this[openType](param, openType);
                }
                if (typeof param === 'function') {
                    taro_1.default[OPEN_TYPES[openType]]({ url: URL });
                    return setTimeout(() => param(taro_1.default.getCurrentPages().pop()), 1000);
                }
                return taro_1.default[OPEN_TYPES[openType]]({ url: URL });
            });
        }
        else {
            taro_1.default[OPEN_TYPES[openType]]({ url: URL });
        }
    }
    /**
     * 普通跳转
     * @param {Location} location
     */
    push(location) {
        this.toPage(location, 'push');
    }
    /**
     * 重定向
     * @param {Location} location
     */
    replace(location) {
        this.toPage(location, 'replace');
    }
    /**
     * tabbar页面跳转
     * @param {Location} location
     */
    switchTab(location) {
        this.toPage(location, 'replace');
    }
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param {Location} location
     */
    relaunch(location) {
        this.toPage(location, 'replace');
    }
    /**
     * 返回
     */
    back() {
        taro_1.default.navigateBack({ delta: 1 });
    }
}
exports.default = History;
