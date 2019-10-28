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
var PProgress = (function (_super) {
    __extends(PProgress, _super);
    function PProgress() {
        var _this = _super.call(this) || this;
        _this.pp = false;
        return _this;
        // this.skinName = "PProgressSkin";
    }
    PProgress.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONSTER_COUNT_CHANGE, this.challengeStatus, this);
        DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE, function () {
            var obj = ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""];
            _this.pp = UserVo.ins.points % 3 == 2;
            var b = UserVo.ins.points - (_this.pp ? 1 : 0);
            _this.l0000.text = b + "";
            _this.l1111.text = (b + 1) + "";
        }, this);
    };
    PProgress.prototype.challengeStatus = function (e) {
        //-2  隐藏按钮  判断进度条显示
        if (e.data == -2) {
            // this.challenge.visible = false;
            this.hp.value = 0;
            // this.pro.visible = GameMap.ins().onHookMap;
        }
        else if (e.data == -1) {
            // this.challenge.visible = true;
        }
        else {
            this.pp = UserVo.ins.points % 3 == 2;
            var val = e.data / GameLogic.SKILL_MONSTER_COUNT;
            val = val > 1 ? 1 : val;
            val *= 0.5;
            val += this.pp ? 0.5 : 0;
            // this.proTxt.text = Math.floor(val * 100) + "%";
            this.hp.value = val * 100;
        }
    };
    return PProgress;
}(eui.Component));
__reflect(PProgress.prototype, "PProgress");
//# sourceMappingURL=PProgress.js.map