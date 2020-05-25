import History from './history';
import { BeforeEachHookCallBack, Location } from './types';
declare class TaroRouter {
    history: History;
    constructor();
    push(location: Location): void;
    replace(location: Location): void;
    switchTab(location: Location): void;
    relaunch(location: Location): void;
    back(): void;
    beforeEach(beforeEachHookCallBack: BeforeEachHookCallBack): void;
    register(componet: any): void;
}
export default TaroRouter;
