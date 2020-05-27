import { Location } from './types';
declare class History {
    /**
     * 当前页面打开方式
     */
    currentPageOpenType: any;
    constructor();
    /**
     * 当前页面栈的长度
     */
    readonly length: number;
    /**
     * 监听路由变化
     */
    listen(): void;
    /**
     * 页面跳转统一处理
     * @param {string | {}}} location
     * @param {string} openType
     */
    toPage(location: Location, openType: string): void;
    /**
     * 普通跳转
     * @param {Location} location
     */
    push(location: Location): void;
    /**
     * 重定向
     * @param {Location} location
     */
    replace(location: Location): void;
    /**
     * tabbar页面跳转
     * @param {Location} location
     */
    switchTab(location: Location): void;
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param {Location} location
     */
    relaunch(location: Location): void;
    /**
     * 返回
     */
    back(): void;
}
export default History;
