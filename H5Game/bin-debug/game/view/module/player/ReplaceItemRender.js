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
var ReplaceItemRender = (function (_super) {
    __extends(ReplaceItemRender, _super);
    function ReplaceItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReplaceItemSkin";
        return _this;
    }
    ReplaceItemRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ReplaceItemRender.prototype.euiCompete = function () {
        this.dataChanged();
        this.addTouchEvent(this.repBtn, this.onTap);
    };
    ReplaceItemRender.prototype.dataChanged = function () {
        if (!this.data) {
            this.itemIcon.data = null;
            this["g0"].visible = false;
            return;
        }
        this["g0"].visible = true;
        this.itemIcon.data = this.data;
        // this.eName.text = BagVo.ins().getItem(this.data.itemId).name;
        var Ecfg = ConfigMgr.gameConfig["equip"][this.data.itemId];
        this.eFighting.text = Ecfg.initialScore;
        var typeName = ['power', 'intellect', 'alacrity', 'physique', 'attackInit', 'armorInit', 'magicAttack', 'magicArmorInit', 'critRate', 'critDamage', 'blood', 'attackSpeed', 'attackRange', 'movingSpeed'];
        var index = 0;
        for (var i = 0; i < 4; i++) {
            this["labType" + i].text = "";
            // if(i > 3)continue;
            for (index; index < typeName.length; index++) {
                if (Ecfg[typeName[index]] > 0) {
                    this["labType" + i].text = ConfigMgr.gameConfig["attributeName"][typeName[index]].value + ":" + Ecfg[typeName[index]];
                    index++;
                    break;
                }
            }
        }
    };
    ReplaceItemRender.prototype.onTap = function (e) {
        HttpMgr.ins.sendMessage(ClientPacket.S_10008, { uuid: this.data.uuid }, ServerPacket.LOGIC_URL, true);
    };
    return ReplaceItemRender;
}(BaseItemRender));
__reflect(ReplaceItemRender.prototype, "ReplaceItemRender");
//# sourceMappingURL=ReplaceItemRender.js.map