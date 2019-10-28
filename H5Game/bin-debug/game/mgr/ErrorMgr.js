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
var ErrorMgr = (function (_super) {
    __extends(ErrorMgr, _super);
    function ErrorMgr() {
        var _this = _super.call(this) || this;
        _this.ErrorCode = [];
        _this.ErrorCode[0] = "系统错误!";
        _this.ErrorCode[1] = "角色不存在";
        _this.ErrorCode[2] = "角色名称长度应为1-8";
        _this.ErrorCode[3] = "角色名称含有特殊字符";
        _this.ErrorCode[4] = "角色名称包含屏蔽字";
        _this.ErrorCode[5] = "已经有角色了不可以再创建了";
        _this.ErrorCode[7] = "登陆游戏token异常";
        _this.ErrorCode[8] = "登陆游戏token超时了";
        _this.ErrorCode[10] = "名字已存在";
        _this.ErrorCode[11] = "重生次数不足";
        _this.ErrorCode[12] = "竞技场次数不足";
        _this.ErrorCode[13] = "自己正在战斗中";
        _this.ErrorCode[14] = "对方正在战斗中";
        _this.ErrorCode[15] = "对方不存在";
        _this.ErrorCode[16] = "奖励不存在";
        _this.ErrorCode[17] = "任务没达成，不能领取奖励";
        _this.ErrorCode[18] = "已领取过奖励";
        _this.ErrorCode[19] = "无法领取";
        _this.ErrorCode[20] = "已领取过月卡奖励";
        _this.ErrorCode[21] = "没有月卡信息";
        _this.ErrorCode[22] = "激活码无效";
        _this.ErrorCode[23] = "激活码有效时间已过";
        _this.ErrorCode[24] = "同组激活码只能使用一次";
        _this.ErrorCode[25] = "激活码已使用过";
        _this.ErrorCode[26] = "投资计划已购买过，无法购买";
        return _this;
    }
    ErrorMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    ErrorMgr.prototype.showError = function (dx, s) {
        if (dx === void 0) { dx = -1; }
        if (s === void 0) { s = ""; }
        if (dx != -1)
            s = this.ErrorCode[dx];
        UserTips.ins().showTipsBigToSmall(s);
    };
    return ErrorMgr;
}(BaseClass));
__reflect(ErrorMgr.prototype, "ErrorMgr");
//# sourceMappingURL=ErrorMgr.js.map