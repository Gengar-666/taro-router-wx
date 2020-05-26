import Taro from '@tarojs/taro';
import History from './history';
import { BeforeEachHookCallBack, AfterEachHookCallBack, Location } from './types';
declare class TaroRouter {
    history: History;
    constructor();
    /**
     * 获取路由参数
     */
    readonly query: any;
    /**
     * 获取当前页面路径
     */
    readonly path: string;
    /**
     * 获取当前页面完整路径
     */
    readonly fullPath: string;
    /**
     * 获取当前页面实例
     */
    readonly currentPage: Taro.Page;
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
    /**
     * 路由跳转前的钩子函数
     * @param beforeEachHookCallBack hook回调函数
     */
    beforeEach(beforeEachHookCallBack: BeforeEachHookCallBack): void;
    /**
     * 路由跳转后的钩子函数
     * @param afterEachHookCallBack hook回调函数
     */
    afterEach(afterEachHookCallBack: AfterEachHookCallBack): void;
    /**
     * 自动把router实例挂载到Componet原型上。
     * @param componet 组件实例
     */
    register(componet: any): void;
    /**
     * 适用Vue.use
     */
    install(Vue: any): void;
}
export default TaroRouter;
