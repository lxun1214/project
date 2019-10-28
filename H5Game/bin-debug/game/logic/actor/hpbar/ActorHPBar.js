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
/**
 *
 * @author
 *  血条
 */
var ActorHPBar = (function (_super) {
    __extends(ActorHPBar, _super);
    function ActorHPBar() {
        var _this = _super.call(this) || this;
        _this._value = 1;
        _this._max = 1;
        _this._truck = new eui.Image("hp1");
        _this._frame = new eui.Image("hp0");
        _this.addChild(_this._frame);
        _this.addChild(_this._truck);
        _this.setSize(ActorHPBar.INIT_WIDTH, ActorHPBar.INIT_HEIGHT);
        return _this;
    }
    /**
     * 设置尺寸
     */
    ActorHPBar.prototype.setSize = function (wide, hide) {
        this._truck.scaleX = wide / ActorHPBar.INIT_WIDTH;
        this._truck.scaleY = hide / ActorHPBar.INIT_HEIGHT;
        this._frame.x = this._truck.x = -wide / 2;
        this.setPosition(this._value, this._max);
    };
    /**
     * 设置进度
     */
    ActorHPBar.prototype.setPosition = function (value, max) {
        this._value = value;
        this._max = max;
        if (this._value > this._max) {
            this._value = this._max;
        }
        this._truck.scaleX = this._value / this._max;
    };
    ActorHPBar.INIT_WIDTH = 138;
    ActorHPBar.INIT_HEIGHT = 20;
    return ActorHPBar;
}(egret.DisplayObjectContainer));
__reflect(ActorHPBar.prototype, "ActorHPBar");
//# sourceMappingURL=ActorHPBar.js.map