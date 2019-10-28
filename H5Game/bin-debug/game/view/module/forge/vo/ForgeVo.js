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
var ForgeVo = (function (_super) {
    __extends(ForgeVo, _super);
    function ForgeVo() {
        return _super.call(this) || this;
    }
    ForgeVo.ins = function () {
        return _super.ins.call(this);
    };
    ForgeVo.prototype.initEvent = function () {
        // DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20003,this.baglist,this);
        // DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20008,this.WearEquipRequest,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20008, this.WearEquipRequest, this);
        // DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20010,this.reinforcedEquipResponse,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20031, this.takeOffEquipResponse, this);
    };
    /**
     * 穿戴装备返回
     */
    ForgeVo.prototype.WearEquipRequest = function (e) {
        // BagVo.ins().removeBagItem( e.data.bagChangeInfo.bagChangeItems);
        // UserVo.ins.fightPower = e.data.fightPower;
        UserTips.ins().showTipsBigToSmall("穿戴成功", false);
        this.updateEquip(e.data.bagChangeInfo.bagChangeItems[0], e.data.loc);
        DataEventDispatcher.dispatchEventWith(GameEvent.WEAR_EQUIPS);
    };
    /**
     * 穿戴更换装备
     */
    ForgeVo.prototype.updateEquip = function (itemInfo, dx) {
        var eCfg = ForgeVo.ins().getEquipID(itemInfo.itemId);
        if (!eCfg)
            return;
        for (var i = 0; i < this.equipAttr.length; i++) {
            if (this.equipAttr[i])
                AttributeUtlis.attributeMgr(this.equipAttr[i], false);
        }
        UserVo.ins.Columns[dx].itemInfo = itemInfo;
        this.setEquipAttr();
    };
    // public reinforcedEquipResponse(e:egret.Event): void{
    // 	if(e.data.isSuccess){
    // 	}
    // }
    /**
     * 卸下装备返回
     */
    ForgeVo.prototype.takeOffEquipResponse = function (e) {
        if (e.data.isSuccess) {
            UserVo.ins.Columns[e.data.loc].itemInfo = null;
            if (this.equipAttr[e.data.loc])
                AttributeUtlis.attributeMgr(this.equipAttr[e.data.loc], false);
            this.equipAttr[e.data.loc] = null;
            // AttributeUtlis.InitAttributeDerive(UserVo.ins);
            DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_PLAYER_WIN, -1);
        }
    };
    /**
     * 根据道具ID获取装备等级配置
     */
    ForgeVo.prototype.getEquipID = function (id) {
        return ConfigMgr.gameConfig["equip"][id];
    };
    /**
     * 根据等级获取消耗所需金币
     */
    ForgeVo.prototype.getUpEquipGold = function (lv) {
        var info = ConfigMgr.gameConfig["equipGrow"][lv];
        return info ? info.gold : 0;
    };
    /**
     * 设置装备属性
     */
    ForgeVo.prototype.setEquipAttr = function (info) {
        var local = info ? info == UserVo.ins : true;
        info = info ? info : UserVo.ins;
        var addTypeName = [];
        for (var i = 0; i < info.Columns.length; i++) {
            var itemInfo = info.Columns[i].itemInfo;
            if (!itemInfo)
                continue;
            var eCfg = ForgeVo.ins().getEquipID(itemInfo.itemId);
            var obj = {};
            for (var key in eCfg) {
                if (info.playerAttrInfo[key] == undefined)
                    continue;
                obj[key] = eCfg[key];
                if (AttributeUtlis.BaseAttributeII.indexOf(key) != -1) {
                    obj[key] *= (itemInfo.level + 1);
                }
            }
            AttributeUtlis.attributeMgr(obj, true, info.playerAttrInfo, info.jobId);
            addTypeName[i] = obj;
        }
        if (local)
            this.equipAttr = addTypeName;
    };
    ForgeVo.prototype.strengthenBack = function (data) {
        if (data.isSuccess) {
            this.strengthenItem.level++;
            for (var i = 0; i < this.equipAttr.length; i++) {
                if (this.equipAttr[i])
                    AttributeUtlis.attributeMgr(this.equipAttr[i], false);
            }
            this.setEquipAttr();
            DataEventDispatcher.dispatchEventWith(GameEvent.UP_STRENGTH, data);
        }
    };
    ForgeVo.prototype.advanceBack = function (data) {
        if (data.isSuccess) {
            // this.advanceItem.itemId ++;
            for (var i = 0; i < this.equipAttr.length; i++) {
                if (this.equipAttr[i])
                    AttributeUtlis.attributeMgr(this.equipAttr[i], false);
            }
            this.setEquipAttr();
            DataEventDispatcher.dispatchEventWith(GameEvent.UP_ADVANCE, data);
        }
    };
    return ForgeVo;
}(BaseClass));
__reflect(ForgeVo.prototype, "ForgeVo");
//# sourceMappingURL=ForgeVo.js.map