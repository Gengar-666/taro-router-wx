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
    push(location) {
        this.history.push(location);
    }
    replace(location) {
        this.history.replace(location);
    }
    switchTab(location) {
        this.history.switchTab(location);
    }
    relaunch(location) {
        this.history.relaunch(location);
    }
    back() {
        this.history.back();
    }
    beforeEach(beforeEachHookCallBack) {
        hooks_1.default.beforeEachHookCallBack = beforeEachHookCallBack;
    }
    register(componet) {
        componet.prototype.$router = this;
    }
}
exports.default = TaroRouter;
