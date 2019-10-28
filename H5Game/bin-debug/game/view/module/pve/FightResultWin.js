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
var FightResultWin = (function (_super) {
    __extends(FightResultWin, _super);
    function FightResultWin() {
        var _this = _super.call(this) || this;
        _this.horizontalCenter = _this.verticalCenter = 0;
        _this.skinName = "FightResultSkin";
        _this.touchChildren = false;
        _this.items.itemRenderer = BaseItem;
        return _this;
    }
    FightResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this, this.onClose);
        SystemInstance.addTimeHandle(this.onClose, 2000, this);
        // for(var i:number=0;i<4;i++)
        // {
        // 	this["s" + i].visible = i == param[0];
        // }
        this.re.source = (param[0] == 0 || param[0] == 2) ? "组-44_png" : "组-4_png";
        this.call = param[1];
        if (param[0] < 2) {
            // this.s4.visible = this.s5.visible = true;
            this.i0.source = param[0] == 0 ? "result12" : "result11"; //0失败1胜利
            this.s6.visible = false;
            this.s5.visible = true;
            if (param[0] == 0) {
                this.ww.text = "很遗憾!";
                this.ww0.textFlow = ColorUtlis.COLOR_STR("当前排名下降至:XXX", false);
            }
            else {
                this.ww.text = "恭喜您!";
                this.ww0.textFlow = ColorUtlis.COLOR_STR("当前排名上升至:XXX", true);
            }
            // this.aw.text = PVPWin.getAwardStr(PVPMgr.ChallegeRank);
        }
        else {
            // this.s4.visible = this.s5.visible = false;
            this.s6.visible = true;
            this.s5.visible = false;
            if (param[0] == 3) {
                this.ww1.textFlow = ColorUtlis.COLOR_STR("恭喜您获得如下奖励:", true);
                var z = [];
                var s = param[2];
                if (s && s != "") {
                    var d = s.split("#");
                    var c;
                    var vo;
                    for (var i = 0; i < d.length; i++) {
                        vo = new ItemInfo();
                        vo.showEquipsCount = true;
                        c = d[i].split(":");
                        vo.itemId = parseInt(c[0]);
                        vo.itemNum = !c[1] ? 1 : parseInt(c[1]);
                        var cf = BagVo.ins().getItem(vo.itemId);
                        z.push(vo);
                    }
                }
                if (param[3]) {
                    for (i = 0; i < param[3].length; i++) {
                        vo = new ItemInfo();
                        vo.moneyType = param[3][i].key;
                        vo.itemNum = param[3][i].val;
                        z.push(vo);
                    }
                }
                this.items.dataProvider = new eui.ArrayCollection(z);
                this.items.visible = true;
            }
            else {
                this.items.dataProvider = new eui.ArrayCollection([]);
                this.items.visible = false;
                this.ww1.textFlow = ColorUtlis.COLOR_STR("革命尚未成功,同志仍需努力!", false);
                // this.s7.visible = true;
            }
        }
    };
    FightResultWin.prototype.onClose = function () {
        if (this.call)
            this.call();
        SystemInstance.removeTimeHandle(this.onClose);
        ViewManager.ins().close(this);
    };
    return FightResultWin;
}(BaseEuiView));
__reflect(FightResultWin.prototype, "FightResultWin");
ViewManager.ins().reg(FightResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=FightResultWin.js.map