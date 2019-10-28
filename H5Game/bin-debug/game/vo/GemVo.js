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
var GemVo = (function (_super) {
    __extends(GemVo, _super);
    function GemVo() {
        var _this = _super.call(this) || this;
        _this.equipPos = -1;
        _this.gemPos = -1;
        _this.gemAtts = [];
        return _this;
    }
    GemVo.ins = function () {
        return _super.ins.call(this);
    };
    GemVo.prototype.initEvent = function () {
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20014, this.gemMountResponse, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20017, this.onGemComposeInGrooveResponse, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20015, this.onGemRemoveResponse, this);
    };
    /**
     * 宝石镶嵌(包含替换)
     */
    GemVo.prototype.sendGemMountRequest = function (uuid, upPos) {
        if (upPos === void 0) { upPos = -1; }
        var pos = upPos;
        if (upPos == -1)
            pos = this.getGemPos(this.equipPos);
        this.gemPos = pos;
        if (pos == -1)
            return;
        var data = { columnLoc: this.equipPos, grooveLoc: pos, uuid: uuid };
        HttpMgr.ins.sendMessage(ClientPacket.S_10014, data, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 宝石镶嵌(包含替换)返回
     */
    GemVo.prototype.gemMountResponse = function (e) {
        if (e.data.isSuccess) {
            // BagVo.ins().removeBagItem( e.data.bagChangeInfo.bagChangeItems);
            // UserVo.ins.fightPower = e.data.fightPower;
            this.updateCurrEquipGem(e.data.itemId);
        }
    };
    /**
     * 宝石摘除
     */
    GemVo.prototype.sendGemRemoveRequest = function (gemPos) {
        HttpMgr.ins.sendMessage(ClientPacket.S_10015, { columnLoc: this.equipPos, grooveLoc: gemPos }, ServerPacket.LOGIC_URL);
    };
    /**
     * 宝石摘除返回
     */
    GemVo.prototype.onGemRemoveResponse = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("成功卸下宝石", false);
            this.equipPos = e.data.columnLoc;
            this.gemPos = e.data.grooveLoc;
            this.updateCurrEquipGem(0);
            // DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA,-1);
        }
    };
    /**
     * //合成镶嵌在宝石槽中宝石
     */
    GemVo.prototype.sendGemComposeInGrooveResponse = function (equipPos, gemPos) {
        HttpMgr.ins.sendMessage(ClientPacket.S_10017, { columnLoc: equipPos, grooveLoc: gemPos }, ServerPacket.LOGIC_URL);
    };
    GemVo.prototype.onGemComposeInGrooveResponse = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("宝石升级成功", false);
            this.updateCurrEquipGem(e.data.gemId, e.data.columnLoc, e.data.grooveLoc);
            // DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA, -1);
        }
    };
    GemVo.prototype.getGemPos = function (equipPos) {
        var equipGem = UserVo.ins.Columns[equipPos].gemGrooves.gemGrooves;
        var pos = 0;
        for (var key in equipGem) {
            var info = equipGem[key];
            if (info.gemId == 0 && info.isOpen)
                break;
            if (!info.isOpen) {
                UserTips.ins().showTipsBigToSmall("没有开启的宝石槽");
                pos = -1;
                break;
            }
            pos++;
        }
        return pos;
    };
    /**
     * 镶嵌成功，更新当前装备宝石列表
     */
    GemVo.prototype.updateCurrEquipGem = function (itemId, ePos, gPos) {
        if (ePos === void 0) { ePos = this.equipPos; }
        if (gPos === void 0) { gPos = this.gemPos; }
        var equipGem = UserVo.ins.Columns[ePos].gemGrooves.gemGrooves;
        for (var key in equipGem) {
            var info = equipGem[key];
            if (info.loc == gPos) {
                //检测删除之前的属性
                if (this.gemAtts[ePos] && this.gemAtts[ePos][gPos])
                    AttributeUtlis.attributeMgr(this.gemAtts[ePos][gPos], false);
                info.gemId = itemId;
                if (itemId > 0) {
                    var gemcfg = ConfigMgr.gameConfig["gemAttr"][itemId];
                    if (!this.gemAtts[ePos])
                        this.gemAtts[ePos] = [];
                    this.gemAtts[ePos][gPos] = gemcfg;
                    AttributeUtlis.attributeMgr(gemcfg, true);
                }
                else {
                    if (this.gemAtts[ePos]) {
                        this.gemAtts[ePos][gPos] = null;
                    }
                }
                break;
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA, -1);
    };
    GemVo.prototype.addGemAtts = function (info) {
        var local = info ? info == UserVo.ins : true;
        info = info ? info : UserVo.ins;
        var a = info.Columns;
        for (var i = 0; i < a.length; i++) {
            if (local)
                this.gemAtts[i] = [];
            var gemData = a[i].gemGrooves.gemGrooves;
            if (!gemData)
                continue;
            for (var j = 0; j < gemData.length; j++) {
                if (gemData[j].gemId != 0) {
                    var gemcfg = ConfigMgr.gameConfig["gemAttr"][gemData[i].gemId];
                    if (local)
                        this.gemAtts[i][j] = gemcfg;
                    AttributeUtlis.attributeMgr(gemcfg, true, info.playerAttrInfo, info.jobId);
                }
                else {
                    if (local)
                        this.gemAtts[i][j] = null;
                }
            }
        }
    };
    /**
     * 根据宝石ID获取宝石等级
     */
    GemVo.prototype.getGemLv = function (gemId) {
        var data = this.getGemAttr(gemId);
        return (gemId - 1000) - (data.AttrType - 100) * 10 + 1;
    };
    /**
     * 根据宝石ID获取宝石属性配置
     */
    GemVo.prototype.getGemAttr = function (gemId) {
        var cfg = ConfigMgr.gameConfig["gemAttr"];
        var data;
        for (var key in cfg) {
            if (cfg[key].id == gemId) {
                data = cfg[key];
                break;
            }
        }
        return data;
    };
    /**
     * 升级宝石
     */
    GemVo.prototype.upGem = function (data) {
        var bagGemList = BagVo.ins().getBagGemList();
        // if (bagGemList.length == 0) {
        // 	UserTips.ins().showTips("背包无宝石");
        // 	return;
        // }
        // if (data.gemId == 0) {
        // 	for (let key in bagGemList) {
        // 		if (!this.isEquipGem(bagGemList[key].itemId)) {
        // 			this.sendGemMountRequest(bagGemList[key].uuid, data.loc);
        // 			return;
        // 		}
        // 	}
        // 	UserTips.ins().showTips("只能镶嵌不同属性的宝石");
        // 	return;
        // }
        //升级
        var a = this.getGemAttr(data.gemId);
        if (a.nextId == 0)
            return UserTips.ins().showTipsBigToSmall("已达到最高等级");
        var curType = a.AttrType;
        for (var key in bagGemList) {
            var info = bagGemList[key];
            var type = this.getGemAttr(info.itemId).AttrType;
            if (curType == type) {
                if (info.itemNum >= a.compose - 1) {
                    this.sendGemComposeInGrooveResponse(this.equipPos, data.loc);
                    // this.sendGemMountRequest(info.uuid, data.loc);
                    return;
                }
            }
        }
        UserTips.ins().showTipsBigToSmall("所需宝石数量不足");
    };
    /**
     * 是否该装备已经装备该类型宝石
     */
    GemVo.prototype.isEquipGem = function (itmeId) {
        var data = this.getGemAttr(itmeId);
        var equipGem = UserVo.ins.Columns[this.equipPos].gemGrooves.gemGrooves;
        var pos = 0;
        for (var key in equipGem) {
            var info = this.getGemAttr(equipGem[key].gemId);
            if (info && info.AttrType == data.AttrType) {
                return info.loc;
            }
        }
        return -1;
    };
    GemVo.prototype.getGemType = function (id) {
        var info = this.getGemAttr(id);
        var str = "";
        for (var i = 0; i < GemVo.GEM_TYPE.length; i++) {
            if (info[GemVo.GEM_TYPE[i]] > 0) {
                str += GemVo.GEM_TYPE_VALUE[i] + "+" + info[GemVo.GEM_TYPE[i]] + "\n";
            }
        }
        return str;
    };
    GemVo.GEM_TYPE = ["powerQuality", "intellectQuality", "alacrityQuality", "physiqueQuality", "attackInit", "armorInit", "magicAttack", "magicArmorInit", "critRate", "critDamage", "blood"];
    GemVo.GEM_TYPE_VALUE = ["力量资质", "智力资质", "敏捷资质", "体力资质", "物理攻击", "物理防御", "魔法攻击", "魔法防御", "暴击率", "暴击伤害", "生命值"];
    return GemVo;
}(BaseClass));
__reflect(GemVo.prototype, "GemVo");
//# sourceMappingURL=GemVo.js.map