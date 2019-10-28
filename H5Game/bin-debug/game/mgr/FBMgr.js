var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FBMgr = (function () {
    function FBMgr() {
        this.delay = false;
        this.fbConfig = ConfigMgr.gameConfig["partInfo"];
        this.fbData = [];
        var o;
        for (var key in this.fbConfig) {
            o = this.fbConfig[key];
            if (!this.fbData[o.partType - 1])
                this.fbData[o.partType - 1] = [];
            if (!this.fbData[o.partType - 1][o.partRank - 1])
                this.fbData[o.partType - 1][o.partRank - 1] = o;
        }
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20028, this.gotoScene, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20029, this.exitFbBack, this);
    }
    Object.defineProperty(FBMgr, "ins", {
        get: function () {
            if (FBMgr._ins == null)
                FBMgr._ins = new FBMgr();
            return FBMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    FBMgr.prototype.gotoScene = function (e) {
        if (e.data.isSuccess) {
            ViewManager.ins().close(UIView);
            ViewManager.ins().close(PVEWinII);
            GameLogic.ins.changeMap(e.data.partId, true);
            UserVo.ins.upFbCount(e.data);
        }
    };
    FBMgr.prototype.exitFbBack = function (e) {
        if (e.data.isSuccess) {
            UserVo.ins.upUserVo(e.data);
            var c = ConfigMgr.gameConfig["partInfo"][e.data.partId + ""];
            // if(c.nextPartID == 0)
            // 	GameLogic.ins.changeMap(UserVo.ins.points);
            // else
            // 	GameLogic.ins.changeMap(c.nextPartID,true);
        }
    };
    FBMgr.prototype.eixtFb = function (die) {
        if (die === void 0) { die = false; }
        HttpMgr.ins.sendMessage(ClientPacket.S_10029, { partId: GameMap.ins().currMapID, isVictory: die }, ServerPacket.LOGIC_URL, true);
        if (die)
            GameLogic.ins.changeMap(UserVo.ins.points);
    };
    FBMgr.prototype.checkChangeMap = function () {
        var _this = this;
        var id = GameMap.ins().currMapID;
        var c = ConfigMgr.gameConfig["partInfo"][id + ""];
        if (c.nextPartID == 0) {
            if (!this.delay) {
                this.delay = true;
                var obj = ConfigMgr.gameConfig["partInfo"][GameMap.ins().currMapID + ""];
                var arr = MoneyUtils.getMoneyData(obj);
                ViewManager.ins().open(FightResultWin, 3, function () {
                    FBMgr.ins.eixtFb(true);
                    _this.delay = false;
                }, obj.item, arr);
            }
        }
        else {
            this.eixtFb();
            GameLogic.ins.changeMap(c.nextPartID, true);
        }
    };
    FBMgr.prototype.getCountByType = function (id) {
        var c = ConfigMgr.gameConfig["partInfo"][id];
        var d = UserVo.ins.partChallengNumInfos;
        for (var i = 0; i < d.length; i++) {
            if (d[i].partType == c.partType) {
                return d[i].partChallengNum;
            }
        }
    };
    return FBMgr;
}());
__reflect(FBMgr.prototype, "FBMgr");
//# sourceMappingURL=FBMgr.js.map