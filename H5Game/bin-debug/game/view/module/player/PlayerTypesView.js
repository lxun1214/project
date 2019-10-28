var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PlayerTypesView = (function (_super) {
    __extends(PlayerTypesView, _super);
    function PlayerTypesView() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerTypesSkin";
        return _this;
    }
    PlayerTypesView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    PlayerTypesView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemInfo = param[0];
        // this.addTouchEvent(this.closeBg, this.onTap);
        this.update();
    };
    PlayerTypesView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    PlayerTypesView.prototype.update = function () {
        var vo = UserVo.ins.playerAttrInfo;
        var dx = 0;
        var s0 = "";
        var s1 = "";
        var d = ["hitRate", "dodgeRate", "attackRange", "skillsConsumption", "speedAnger"];
        for (var key in vo) {
            if (key == "__class__" || key == "__types__" || !ConfigMgr.gameConfig["attributeName"][key] || d.indexOf(key) != -1)
                continue;
            if (dx % 2 == 0) {
                s0 += ConfigMgr.gameConfig["attributeName"][key].value + ":" + Math.floor(vo[key]) + PbPlayerAttrInfo.isPercent(key);
                s0 += "\n";
            }
            else {
                s1 += ConfigMgr.gameConfig["attributeName"][key].value + ":" + Math.floor(vo[key]) + PbPlayerAttrInfo.isPercent(key);
                ;
                s1 += "\n";
            }
            dx++;
        }
        this.l0.textFlow = new egret.HtmlTextParser().parser(s0);
        this.l1.textFlow = new egret.HtmlTextParser().parser(s1);
    };
    return PlayerTypesView;
}(BaseEuiView));
__reflect(PlayerTypesView.prototype, "PlayerTypesView");
ViewManager.ins().reg(PlayerTypesView, LayerManager.UI_Popup);
//# sourceMappingURL=PlayerTypesView.js.map