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
/**
 * 更换装备
 */
var PlayerEquipReplaceView = (function (_super) {
    __extends(PlayerEquipReplaceView, _super);
    function PlayerEquipReplaceView() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerEquipReplaceSkin";
        _this.unloadBtn = _this.c.repBtn;
        _this.unloadBtn.skinName = "Btn001Skin";
        _this.c.repBtn.label = "卸下";
        return _this;
    }
    PlayerEquipReplaceView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.itemList.itemRenderer = ReplaceItemRender;
    };
    PlayerEquipReplaceView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curInfo = param[0];
        this.selectPos = param[1] | 0;
        this.addTouchEvent(this.unloadBtn, this.onTap);
        this.update();
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, this.update, this);
    };
    PlayerEquipReplaceView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA, this.update, this);
    };
    PlayerEquipReplaceView.prototype.update = function () {
        this.c.data = this.curInfo = UserVo.ins.Columns[this.selectPos].itemInfo;
        // if(!this.curInfo)return;
        // let Ecfg =  ConfigMgr.gameConfig["equip"][this.curInfo.itemId];
        var list = BagVo.ins().getPosEquipList(this.selectPos);
        this.itemList.dataProvider = new eui.ArrayCollection(list);
    };
    PlayerEquipReplaceView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.unloadBtn:
                HttpMgr.ins.sendMessage(ClientPacket.S_10031, { loc: this.selectPos }, ServerPacket.LOGIC_URL, true);
                ViewManager.ins().close(this);
                break;
        }
    };
    return PlayerEquipReplaceView;
}(BaseEuiView));
__reflect(PlayerEquipReplaceView.prototype, "PlayerEquipReplaceView");
ViewManager.ins().reg(PlayerEquipReplaceView, LayerManager.UI_Popup);
//# sourceMappingURL=PlayerEquipReplaceView.js.map