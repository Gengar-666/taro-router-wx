/** 路由信息 */
export interface RouterInfo {
    /**
     * 页面栈的webviewId
     */
    webviewId: number;
    /**
     * 页面完整路径
     */
    fullPath: string;
    /**
     * 页面路径
     */
    path: string;
    /**
     * 页面路由参数
     */
    query: {
        [key: string]: any;
    };
}
/**
 * 路由跳转信息
 */
export declare type Location = {
    /**
     * 需要跳转的页面地址
     */
    path: string;
    /**
     * 路由参数
     */
    query: {
        [key: string]: any;
    };
} | string;
/**
 * 结束hook的next函数
 */
export interface HookNext {
    (param?: {} | boolean): Promise<{} | Location | Boolean | undefined>;
}
/**
 * 路由跳转前的Hook回调函数
 */
export interface BeforeEachHookCallBack {
    (to: RouterInfo, from: {
        path: string;
        query?: {
            [key: string]: any;
        };
    }, next: HookNext): void;
}
export interface Hooks {
    beforeEachHookCallBack: BeforeEachHookCallBack | null;
}
