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
var WelcomWin = (function (_super) {
    __extends(WelcomWin, _super);
    function WelcomWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "welcomeSkin";
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        _this.rc.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        _this.width = GlobalVo.GAME_W;
        _this.height = GlobalVo.GAME_H;
        _this.y = -GlobalVo.GAME_H;
        UIDmgr.bindingUID(_this.btn, uid.beginGame);
        UIDmgr.bindingUID(_this, uid.beginGameP);
        return _this;
    }
    WelcomWin.prototype.onclick = function (e) {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        this.rc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        if (this.parent)
            this.parent.removeChild(this);
        GuideMgr._instance.save(1);
        GuideMgr._instance.guides.forEach(function (element) {
            if (element.id == 1) {
                element.status = guideStep.End;
            }
        });
        GameLogic.GAME_STATUS = 0;
        GuideMgr._instance.openFistGuide = false;
    };
    return WelcomWin;
}(eui.Component));
__reflect(WelcomWin.prototype, "WelcomWin");
//# sourceMappingURL=WelcomWin.js.map