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
var PVERender = (function (_super) {
    __extends(PVERender, _super);
    function PVERender() {
        var _this = _super.call(this) || this;
        _this.skinName = "PVERenderSkinII";
        _this.touchChildren = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            if (_this.data) {
                if (_this.itemIndex == 0)
                    UIDmgr.bindingUID(_this, uid.fb1);
                else if (_this.itemIndex == 1)
                    UIDmgr.bindingUID(_this, uid.fb11);
                else
                    UIDmgr.bindingUID(_this, uid.fb111);
            }
        }, _this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.partChallengNumInfos, _this.upCount, _this);
        return _this;
    }
    PVERender.prototype.dataChanged = function () {
        this.l0.text = this.data.sectionName.replace("☆", "");
        this.l1.text = "";
        this.l2.text = "进入条件需要战力:" + this.data.entryConditions;
        var s = this.data.partType == 1 ? "<font color='#fffab3'>升阶石" : this.data.partType == 2 ? "<font color='#23b62e'>宝石" : "<font color='#f69c00'>技能玉";
        this.l4.textFlow = new egret.HtmlTextParser().parser("挑战可获得:" + s);
        this.upCount();
        this.bg.source = "fb" + (4 + this.itemIndex) + "_png";
    };
    PVERender.prototype.upCount = function () {
        this.l3.text = "剩余挑战次数:" + FBMgr.ins.getCountByType(this.data.partID);
    };
    PVERender.prototype.onTap = function () {
        if (this.itemIndex == 0)
            ViewManager.ins().open(PVEWinII, FBMgr.ins.fbData[this.itemIndex]);
        else {
            if (SystemOpenMgr.checkOpen(null, true, this.itemIndex + 1))
                ViewManager.ins().open(PVEWinII, FBMgr.ins.fbData[this.itemIndex]);
        }
        // if(!this.data)
        // 	return;
        // if(!GameMap.ins().onHookMap)
        // 	return UserTips.ins().showTips("非挂机地图,无法挑战!");
        // if(FBMgr.ins.getCountByType(this.data.partID) == 0)
        // 	return UserTips.ins().showTips("次数不足,无法挑战!");
        // ViewManager.ins().close(UIView);
        // ViewManager.ins().close(PVEWin);
        // ViewManager.ins().close(PVEWinII);
        // HttpMgr.ins.sendMessage(ClientPacket.S_10028,{partId:this.data.partID},ServerPacket.LOGIC_URL,true);
    };
    return PVERender;
}(eui.ItemRenderer));
__reflect(PVERender.prototype, "PVERender");
//# sourceMappingURL=PVERender.js.map