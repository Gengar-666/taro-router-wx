import History from './history';
import { BeforeEachHookCallBack, Location } from './types';
declare class TaroRouter {
    history: History;
    constructor();
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
     * 自动把router实例挂载到Componet原型上。
     * @param componet 组件实例
     */
    register(componet: any): void;
}
export default TaroRouter;
