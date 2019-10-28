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
var StarIcon = (function (_super) {
    __extends(StarIcon, _super);
    function StarIcon() {
        var _this = _super.call(this) || this;
        _this.lv = 1;
        _this.skinName = "StarSkin";
        return _this;
    }
    StarIcon.prototype.euiCompete = function () {
        this.setLv(this.lv);
    };
    StarIcon.prototype.setLv = function (lv) {
        this.lv = lv;
        for (var i = 0; i < 10; i++) {
            this["star" + i].visible = false;
            if (i < lv) {
                this["star" + i].visible = true;
            }
        }
    };
    return StarIcon;
}(BaseView));
__reflect(StarIcon.prototype, "StarIcon");
//# sourceMappingURL=StarIcon.js.map