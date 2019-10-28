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
var RankWin = (function (_super) {
    __extends(RankWin, _super);
    function RankWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankSkin";
        _this.dg.itemRenderer = RankRender;
        _this.cpArr = [ClientPacket.S_10025, ClientPacket.S_30001, ClientPacket.S_30002, ClientPacket.S_10024];
        _this.spArr = [ServerPacket.C_20025, ServerPacket.C_40001, ServerPacket.C_40002, ServerPacket.C_20024];
        _this.lbs = [["排名", "名字", "等级", "战力"], ["排名", "名字", "等级", "重生"], ["排名", "名字", "vip", "战力"], ["排名", "名字", "等级", "战力"]];
        return _this;
    }
    RankWin.prototype.euiCompete = function () {
        var _this = this;
        _super.prototype.euiCompete.call(this);
        for (var i = 0; i < 4; i++) {
            this["btn" + i].name = i + "";
            this["btn" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (_this.currBtn)
                    _this.currBtn.selected = false;
                HttpMgr.ins.sendMessage(_this.cpArr[parseInt(e.currentTarget.name)], {}, ServerPacket.LOGIC_URL, true);
                _this.currBtn = e.currentTarget;
                _this.currBtn.selected = true;
                var c = _this.lbs[parseInt(e.currentTarget.name)];
                for (var j = 0; j < 4; j++) {
                    _this["l" + j].text = c[j];
                }
            }, this);
        }
    };
    RankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this);
        for (var j = 0; j < this.spArr.length; j++) {
            this.addEvent(this.spArr[j], DataEventDispatcher.dispatcher, this.upData);
        }
        var d = this.currBtn ? this.currBtn : this["btn0"];
        d.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
    };
    RankWin.prototype.upData = function (e) {
        if (this.spArr.indexOf(e.type) + "" == this.currBtn.name) {
            this.dg.dataProvider = new eui.ArrayCollection(e.data.rankingsInfos);
            this.r0.text = "我的排名:" + (e.data.rankings == -1 ? "未上榜" : e.data.rankings);
        }
    };
    return RankWin;
}(BaseEuiView));
__reflect(RankWin.prototype, "RankWin");
ViewManager.ins().reg(RankWin, LayerManager.UI_MainUI);
//# sourceMappingURL=RankWin.js.map