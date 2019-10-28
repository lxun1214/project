var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataEventDispatcher = (function () {
    function DataEventDispatcher() {
    }
    DataEventDispatcher.dispatchEventWith = function (type, data) {
        DataEventDispatcher.dispatcher.dispatchEventWith(type, false, data);
    };
    DataEventDispatcher.dispatcher = new egret.EventDispatcher();
    return DataEventDispatcher;
}());
__reflect(DataEventDispatcher.prototype, "DataEventDispatcher");
//# sourceMappingURL=DataEventDispatcher.js.map