var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Scene基类
 */
var BaseScene = (function () {
    function BaseScene() {
        this._layers = new Array();
    }
    /**
     * 进入Scene调用
     */
    BaseScene.prototype.onEnter = function () {
    };
    /**
     * 退出Scene调用
     */
    BaseScene.prototype.onExit = function () {
    };
    /**
     * 添加一个Layer到舞台
     * @param layer
     */
    BaseScene.prototype.addLayer = function (layer) {
        if (layer instanceof BaseSpriteLayer) {
            StageUtils.ins().getStage().addChild(layer);
            this._layers.push(layer);
        }
    };
    return BaseScene;
}());
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map