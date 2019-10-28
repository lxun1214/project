var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ActionType = (function () {
    function ActionType() {
    }
    /**
     * 获取动作id
     */
    ActionType.getAct = function (type) {
        if (type == undefined || type == "undefined") {
            return "0";
        }
        var actId = Number(Actions[type]);
        if (isNaN(actId)) {
            actId = 0;
        }
        if (actId >= 10)
            return actId + "";
        return "" + actId;
    };
    ActionType.STAND = "stand"; //站立
    ActionType.WALK = "walk"; //走路
    ActionType.RUN = "run"; //跑步
    ActionType.READY = "ready"; //攻击停留
    ActionType.FIGHT = "fight"; //攻击
    ActionType.MAGIC = "magic"; //魔法攻击
    ActionType.DIE = "die"; //死亡
    ActionType.ATTACK7 = "ATTACK7";
    ActionType.ATTACK8 = "ATTACK8";
    ActionType.ATTACK9 = "ATTACK9";
    ActionType.ATTACK10 = "ATTACK10";
    ActionType.ATTACK11 = "ATTACK11";
    ActionType.ATTACK12 = "ATTACK12";
    ActionType.ATTACK13 = "ATTACK13";
    ActionType.ATTACK88 = "ATTACK88";
    return ActionType;
}());
__reflect(ActionType.prototype, "ActionType");
var Actions;
(function (Actions) {
    Actions[Actions["stand"] = 0] = "stand";
    Actions[Actions["walk"] = 1] = "walk";
    Actions[Actions["run"] = 2] = "run";
    Actions[Actions["ready"] = 3] = "ready";
    Actions[Actions["fight"] = 4] = "fight";
    Actions[Actions["magic"] = 5] = "magic";
    Actions[Actions["die"] = 6] = "die";
    Actions[Actions["ATTACK7"] = 7] = "ATTACK7";
    Actions[Actions["ATTACK8"] = 8] = "ATTACK8";
    Actions[Actions["ATTACK9"] = 9] = "ATTACK9";
    Actions[Actions["ATTACK10"] = 10] = "ATTACK10";
    Actions[Actions["ATTACK11"] = 11] = "ATTACK11";
    Actions[Actions["ATTACK12"] = 12] = "ATTACK12";
    Actions[Actions["ATTACK13"] = 13] = "ATTACK13";
    Actions[Actions["ATTACK88"] = 14] = "ATTACK88";
})(Actions || (Actions = {}));
//# sourceMappingURL=ActionType.js.map