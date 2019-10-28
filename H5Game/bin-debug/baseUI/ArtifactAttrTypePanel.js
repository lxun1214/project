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
var ArtifactAttrTypePanel = (function (_super) {
    __extends(ArtifactAttrTypePanel, _super);
    function ArtifactAttrTypePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ArtifactAttrTypeSkin";
        _this.dg.itemRenderer = PropertyRender;
        return _this;
    }
    ArtifactAttrTypePanel.prototype.setTile = function (title, t) {
        this.labTile.text = title;
        if (t == 0)
            this.dg.left = 20;
        else
            this.dg.right = 30;
    };
    ArtifactAttrTypePanel.prototype.updateType = function (itemId, t) {
        if (t === void 0) { t = 0; }
        var typeName = ["power", "intellect", "alacrity", "physique",
            "critRate", "critDamage", "blood", "akillDamage",
            "attackDamage", "damageReduction", "skillInterval",
            "fireDamage", "waterDamage", "thunderDamage", "windDamage",
            "fireDefenses", "waterDefense", "thunderDefense", "windDefense"];
        var data = ConfigMgr.gameConfig["artifact"][itemId];
        var a = [];
        if (data) {
            var index = 0;
            for (var j = 0; j < typeName.length; j++) {
                if (data[typeName[j]] && data[typeName[j]] > 0) {
                    // this["labAttr"+index].text = ConfigMgr.gameConfig["attributeName"][typeName[j]].value+"："+data[typeName[j]];
                    a.push([ConfigMgr.gameConfig["attributeName"][typeName[j]].value, data[typeName[j]]]);
                    index++;
                }
            }
        }
        this.dg.dataProvider = new eui.ArrayCollection(a);
    };
    return ArtifactAttrTypePanel;
}(BaseView));
__reflect(ArtifactAttrTypePanel.prototype, "ArtifactAttrTypePanel");
//# sourceMappingURL=ArtifactAttrTypePanel.js.map