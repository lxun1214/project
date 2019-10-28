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
var BagVo = (function (_super) {
    __extends(BagVo, _super);
    function BagVo() {
        var _this = _super.call(this) || this;
        _this.bagList = [];
        return _this;
    }
    BagVo.ins = function () {
        return _super.ins.call(this);
    };
    BagVo.prototype.initEvent = function () {
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20003, this.setBaglist, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20012, this.smeltResponse, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30002, this.itemChange, this);
    };
    BagVo.prototype.setBaglist = function (e) {
        BagVo.ins().bagList = e.data.items;
    };
    /**
     * 根据道具ID获取配置数据
     */
    BagVo.prototype.getItem = function (id) {
        return ConfigMgr.gameConfig["item"][id];
    };
    /**
     * 道具增删
     */
    BagVo.prototype.itemChange = function (e) {
        if (!this.bagList)
            this.bagList = [];
        var list = e.data.bagChangeInfo.bagChangeItems;
        var flag = false;
        var vo;
        var add = 0;
        var s;
        for (var key in list) {
            add = 0;
            var element = list[key];
            var cfg = this.getItem(element.itemId);
            // if(element.itemNum > 0){
            // 	let cfg = this.getItem(element.itemId);
            // UserTips.ins().showTips(`获得|S:28&C:${ColorUtlis.QUALITY_COLOR[cfg.rank]}&T:${cfg.name}x${element.itemNum}`);
            // }
            flag = false;
            for (var i = 0; i < this.bagList.length; i++) {
                vo = this.bagList[i];
                if (element.uuid == vo.uuid) {
                    flag = true;
                    if (element.itemNum > 0) {
                        this.bagList[i] = element;
                    }
                    else {
                        this.bagList.splice(i, 1);
                    }
                    add = element.itemNum - vo.itemNum;
                    break;
                }
            }
            if (!flag) {
                this.bagList.push(element);
                add = element.itemNum;
            }
            s = add > 0 ? '获得' : '失去';
            // add = Math.abs(add);
            // if(add > 0)
            // 	UserTips.ins().showTips(s + `|S:28&C:${ColorUtlis.QUALITY_COLOR[cfg.rank]}&T:${cfg.name}x${add}`);
            // else
            if (add > 0)
                UserTips.ins().showitemTips(s + ("|S:28&C:" + ColorUtlis.QUALITY_COLOR[cfg.rank] + "&T:" + cfg.name + "x" + add));
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_BAG_DATA, -1);
    };
    /**
     * 装备熔炼返回
     */
    BagVo.prototype.smeltResponse = function (e) {
        // this.bagList = e.data.bagChangeInfo;
        // let list: ItemInfo[] = e.data.bagChangeInfo.bagChangeItems;
        // this.removeBagItem(list);
        // UserVo.ins.reinforcedEquipmentStone = e.data.fenjieEquipmentStone;
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("熔炼完成", false);
        }
        // DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_BAG_DATA,-1);
    };
    /**
     * 删除背包多个物品
     */
    BagVo.prototype.removeBagItem = function (list) {
        for (var key in list) {
            var element = list[key];
            for (var i = 0; i < this.bagList.length; i++) {
                if (element.uuid == this.bagList[i].uuid) {
                    this.bagList.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * 获取熔炼列表
     */
    BagVo.prototype.getSmeltList = function () {
        var semltList = [];
        for (var key in this.bagList) {
            var info = this.bagList[key];
            var cfg = this.getItem(info.itemId);
            if (cfg.itemType != 2)
                continue;
            var bagEquip = ConfigMgr.gameConfig["equip"][info.itemId];
            for (var i = 0; i < UserVo.ins.Columns.length; i++) {
                var itemInfo = UserVo.ins.Columns[i].itemInfo;
                if (!itemInfo)
                    continue;
                var userEquip = ConfigMgr.gameConfig["equip"][itemInfo.itemId];
                if (bagEquip.itemQuality <= userEquip.itemQuality && bagEquip.equipCoordinate == userEquip.equipCoordinate) {
                    semltList.push(info);
                }
            }
        }
        return semltList;
    };
    /**
     * 根据品质等级获取熔炼列表
     */
    BagVo.prototype.getQualitySmeltList = function (nubType) {
        var semltList = this.getSmeltList();
        var newInfo = [];
        for (var key in semltList) {
            var info = semltList[key];
            for (var i = 0; i < nubType.length; i++) {
                if (nubType[i] == 0) {
                    return semltList;
                }
                var cfg = ConfigMgr.gameConfig["equip"][info.itemId];
                if (cfg && cfg.rank == nubType[i]) {
                    newInfo.push(info);
                }
            }
        }
        return newInfo;
    };
    /**
     * 根据道具类型获取列表
     * @param type 物品类型(1宝石2装备3神器4道具）
     */
    BagVo.prototype.getTypeItemList = function (type) {
        var list = [];
        for (var key in this.bagList) {
            var info = this.bagList[key];
            var cfg = this.getItem(info.itemId);
            if (cfg.itemType == type) {
                list.push(info);
            }
        }
        if (type == 2) {
            list.sort(function (a, b) {
                var aitemCfg = ConfigMgr.gameConfig["equip"][a.itemId];
                var bitemCfg = ConfigMgr.gameConfig["equip"][b.itemId];
                if (aitemCfg.initialScore + aitemCfg.growScore * a.level > bitemCfg.initialScore + bitemCfg.growScore * b.level)
                    return 1;
                return -1;
            });
        }
        else if (type == 1) {
            list.sort(function (a, b) {
                var aitemCfg = ConfigMgr.gameConfig["gemAttr"][a.itemId];
                var bitemCfg = ConfigMgr.gameConfig["gemAttr"][b.itemId];
                if (aitemCfg.initialScore > bitemCfg.initialScore)
                    return 1;
                return -1;
            });
        }
        return list;
    };
    /**
     * 根据道具ID获取背包道具数据
     */
    BagVo.prototype.getIdItem = function (id) {
        for (var key in this.bagList) {
            var info = this.bagList[key];
            if (info.itemId == id)
                return info;
        }
        return null;
    };
    /**
     * 获取背包宝石列表
     */
    BagVo.prototype.getBagGemList = function () {
        var list = [];
        for (var key in this.bagList) {
            var info = this.bagList[key];
            var cfg = this.getItem(info.itemId);
            if (cfg.itemType != 1)
                continue;
            list.push(info);
        }
        return list.sort(this.gemListSort);
    };
    BagVo.prototype.gemListSort = function (a, b) {
        if (a.itemId > b.itemId)
            return -1;
        else if (a.itemId < b.itemId)
            return 1;
        return 0;
    };
    /**
     * 根据装备位置获取背包中该部位的装备
     */
    BagVo.prototype.getPosEquipList = function (pos) {
        var list = [];
        for (var key in this.bagList) {
            var info = this.bagList[key];
            var itemCfg = this.getItem(info.itemId);
            if (itemCfg.itemType != 2 || itemCfg.heroType != UserVo.ins.jobId)
                continue;
            var cfg = ConfigMgr.gameConfig["equip"][info.itemId];
            if (cfg.equipCoordinate == pos || (cfg.equipCoordinate == 4 && (pos == 4 || pos == 5)) || (cfg.equipCoordinate == 6 && (pos == 6 || pos == 7)))
                list.push(info);
        }
        list.sort(function (a, b) {
            var aitemCfg = ConfigMgr.gameConfig["equip"][a.itemId];
            var bitemCfg = ConfigMgr.gameConfig["equip"][b.itemId];
            if (aitemCfg.equipScore > bitemCfg.equipScore)
                return -1;
            return 1;
        });
        return list;
    };
    BagVo.EQUIP_MAX = 10;
    //物品类型(1宝石2装备3神器4道具）
    /**1宝石 */
    BagVo.ITEM_TYPE_GEM = 1;
    /** 2装备*/
    BagVo.ITEM_TYPE_EQUIP = 2;
    /**3神器 */
    BagVo.ITEM_TYPE_ARTIFACT = 3;
    /**4道具 */
    BagVo.ITEM_TYPE_OTHER = 4;
    return BagVo;
}(BaseClass));
__reflect(BagVo.prototype, "BagVo");
//# sourceMappingURL=BagVo.js.map