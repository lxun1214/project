var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalVo = (function () {
    function GlobalVo() {
    }
    Object.defineProperty(GlobalVo, "GAME_W", {
        get: function () {
            return StageUtils.ins().getWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalVo, "GAME_H", {
        get: function () {
            return StageUtils.ins().getHeight();
        },
        enumerable: true,
        configurable: true
    });
    GlobalVo.RANK = ["", "绿", "蓝", "紫", "金", "暗金"];
    GlobalVo.EQUIPS = ["武器", "头盔", "铠甲", "吊坠", "手镯", "手镯", "戒指", "戒指", "腰带", "靴子"];
    return GlobalVo;
}());
__reflect(GlobalVo.prototype, "GlobalVo");
//# sourceMappingURL=GlobalVo.js.map