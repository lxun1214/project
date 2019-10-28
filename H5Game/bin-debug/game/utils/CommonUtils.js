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
var CommonUtils = (function (_super) {
    __extends(CommonUtils, _super);
    function CommonUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonUtils.overLength = function (num) {
        var str = null;
        if (num < 100000) {
            str = Math.floor(num) + "";
        }
        else if (num > 100000000) {
            num = (num / 100000000);
            num = Math.floor(num * 10) / 10;
            str = num + "亿";
        }
        else {
            num = (num / 10000);
            num = Math.floor(num * 10) / 10;
            str = num + "万";
        }
        return str;
    };
    /**
     * 万字的显示
     * @param label
     * @param num
     */
    CommonUtils.labelIsOverLenght = function (label, num) {
        label.text = this.overLength(num);
    };
    return CommonUtils;
}(BaseClass));
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map