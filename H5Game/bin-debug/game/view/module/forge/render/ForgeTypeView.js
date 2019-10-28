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
var ForgeTypeView = (function (_super) {
    __extends(ForgeTypeView, _super);
    function ForgeTypeView() {
        var _this = _super.call(this) || this;
        _this.skinName = "ForgeTypeSkin";
        _this.dg0.itemRenderer = PropertyRender;
        return _this;
    }
    ForgeTypeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ForgeTypeView.prototype.setData = function (tile, info, isCurr, type) {
        if (isCurr === void 0) { isCurr = true; }
        // this.labTile.text = tile;
        var typeAr = ["powerQuality", "intellectQuality", "alacrityQuality", "physiqueQuality"];
        var value = ["力量资质", "智力资质", "敏捷资质", "体力资质"];
        var a = [];
        if (info == null) {
            this.l0.text = "选择装备!";
            this.l0.visible = true;
        }
        var str = "";
        var cfg = null;
        if (type == 1 && info) {
            this.l0.visible = false;
            value = ["力量", "智力", "敏捷", "体力"];
            for (var i = 0; i < typeAr.length; i++) {
                if (ConfigMgr.gameConfig["equip"][info.itemId][typeAr[i]] > 0) {
                    a.push([value[i], (isCurr ? info.level : 1) * ConfigMgr.gameConfig["equip"][info.itemId][typeAr[i]]]);
                }
            }
        }
        else if (type == 2 && info) {
            cfg = ConfigMgr.gameConfig["equip"][isCurr ? info.itemId : info.itemId + 1];
            if (!cfg) {
                this.l0.text = "已达极限!";
                this.l0.visible = true;
            }
            else {
                this.l0.visible = false;
                for (var i = 0; i < typeAr.length; i++) {
                    if (cfg[typeAr[i]] > 0) {
                        a.push([value[i], info.level * cfg[typeAr[i]]]);
                    }
                }
            }
        }
        this.dg0.dataProvider = new eui.ArrayCollection(a);
    };
    return ForgeTypeView;
}(BaseView));
__reflect(ForgeTypeView.prototype, "ForgeTypeView");
//# sourceMappingURL=ForgeTypeView.js.map