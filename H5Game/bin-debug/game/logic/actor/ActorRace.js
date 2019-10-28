var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ActorRace = (function () {
    function ActorRace() {
    }
    ActorRace.ALL = 0;
    ActorRace.HUMAN = 1;
    ActorRace.MONSTER = 2;
    ActorRace.PK_ROLE = 3;
    return ActorRace;
}());
__reflect(ActorRace.prototype, "ActorRace");
var AiType = (function () {
    function AiType() {
    }
    AiType.HUMAN = 0;
    AiType.MONSTER_1 = 1;
    AiType.PK_ROLE = 2;
    return AiType;
}());
__reflect(AiType.prototype, "AiType");
//# sourceMappingURL=ActorRace.js.map