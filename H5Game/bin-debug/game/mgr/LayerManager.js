var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏层级类
 */
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.mapLayer = new eui.UILayer();
    /**
     * UI主界面
     * @type{BaseEuiLayer}
     */
    LayerManager.UI_Main = new BaseEuiLayer();
    /**
     * UI界面
     * @type{BaseEuiLayer}
     */
    LayerManager.UI_MainUI = new BaseEuiLayer();
    /**
     * UI弹出层
     * @type{BaseEuiLayer}
     */
    LayerManager.UI_Popup = new BaseEuiLayer();
    /**
     * UI弹出框层
     * @type{BaseEuiLayer}
     */
    LayerManager.UI_Tips = new BaseEuiLayer();
    LayerManager.guideLayer = new eui.UILayer();
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map