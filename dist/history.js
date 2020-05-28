"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
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
        return '';
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
        this.listen();
    }
    /**
     * 当前页面栈的长度
     */
    get length() {
        return getCurrentPages().length;
    }
    /**
     * 监听路由变化
     */
    listen() {
        wx.onAppRoute(res => {
            this.currentPageOpenType = res.openType;
            let pages = getCurrentPages();
            let currentPage = pages[pages.length - 1];
            delete res.query.__key_;
            if (hooks_1.default.afterEachHookCallBack) {
                hooks_1.default.afterEachHookCallBack(res, currentPage);
            }
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
            let pages = getCurrentPages();
            let currentPage = pages[pages.length - 1];
            let path = currentPage.route;
            let query = currentPage.options;
            delete query.__key_;
            let to = {
                path,
                query
            };
            hooks_1.default.beforeEachHookCallBack(to, from, async (param, newOpenType = 'push') => {
                await hookNext(param);
                if (typeof param === 'object') {
                    return this[openType](param, newOpenType);
                }
                return wx[OPEN_TYPES[openType]]({ url: URL });
            });
        }
        else {
            wx[OPEN_TYPES[openType]]({ url: URL });
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
        this.toPage(location, 'switchTab');
    }
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param {Location} location
     */
    relaunch(location) {
        this.toPage(location, 'relaunch');
    }
    /**
     * 返回
     */
    back() {
        wx.navigateBack({ delta: 1 });
    }
}
exports.default = History;
