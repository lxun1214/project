var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SystemOpenMgr = (function () {
    function SystemOpenMgr() {
    }
    SystemOpenMgr.checkOpen = function (cs, showTip, dx) {
        if (showTip === void 0) { showTip = false; }
        var type;
        if (cs)
            type = SystemOpenMgr.VIEW_Arr.indexOf(cs);
        else
            type = dx;
        if (type == -1)
            return true;
        var c = ConfigMgr.gameConfig["unlockFunction"][type + ""];
        if (!c)
            return true;
        if (c.playerLvl > UserVo.ins.rebirthNum
            || c.vipLvl > UserVo.ins.vipLevel
            || c["层数"] > UserVo.ins.MAX_POINTS) {
            if (showTip)
                UserTips.ins().showTipsBigToSmall(c.lockDesc);
            return false;
        }
        return true;
    };
    SystemOpenMgr.getOpenCondition = function (cs) {
        var type = SystemOpenMgr.VIEW_Arr.indexOf(cs);
        return ConfigMgr.gameConfig["unlockFunction"][type + ""];
    };
    SystemOpenMgr.VIEW_Arr = [null, PVEWin, PVEWin, PVEWin, EmailView, TaskWin, null, ShopWin, PVPWin, ReborthWin, AchievementWin, ArtifactWin, GemWin];
    return SystemOpenMgr;
}());
__reflect(SystemOpenMgr.prototype, "SystemOpenMgr");
//# sourceMappingURL=SystemOpenMgr.js.map