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
var PKHuman = (function (_super) {
    __extends(PKHuman, _super);
    function PKHuman(race, aiRate) {
        var _this = _super.call(this, race, aiRate) || this;
        _this.nHPBar._truck.source = "hp2";
        return _this;
    }
    PKHuman.prototype.getEnemy = function () {
        var ls = GameLogic.ins.getActorsByType(ActorRace.MONSTER);
        ls = ls.concat(GameLogic.ins.getActorsByType(ActorRace.HUMAN));
        return ls;
    };
    PKHuman.prototype.destruct = function (gc) {
        if (gc === void 0) { gc = false; }
        this.path = null;
        this.nDie = false;
        this.sleep = false;
        this.visible = true;
        this.nTargetPoint.x = this.nTargetPoint.y = -1;
        this.nTargeter = undefined;
        this.addHp(this.actorVo.nMaxHp, false);
        this.nHPBar.setPosition(this.actorVo.nHp, this.actorVo.nMaxHp);
        for (var i = this.nBuffs.length; i >= 0; i--) {
            this.removeBuff(i);
        }
        this.sleep = false;
        this.nDie = false;
        _super.prototype.destruct.call(this, gc);
        this.setDie();
        this.actorVo = null;
        GameLogic.ins.receivePkHuman();
    };
    PKHuman.prototype.setDie = function () {
        this.sleep = true;
        this.nDie = true;
    };
    return PKHuman;
}(Human));
__reflect(PKHuman.prototype, "PKHuman");
//# sourceMappingURL=PKHuman.js.map