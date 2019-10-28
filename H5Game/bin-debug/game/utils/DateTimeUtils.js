var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var DateTimeUtils = (function () {
    function DateTimeUtils() {
    }
    DateTimeUtils.toTimeString = function (ms) {
        var time;
        var h = Math.floor(ms / 3600); //60 60
        var d = Math.floor(h / 24);
        h = h % 24;
        var m = Math.floor((ms - (d * 24 + h) * 3600) / 60);
        var s = Math.floor(ms % 60);
        return (d ? d + "天" : "") + (h ? h + "时" : "") + (m ? m + "分" : "") + (s ? s + "秒" : "");
    };
    DateTimeUtils.date = new Date();
    return DateTimeUtils;
}());
__reflect(DateTimeUtils.prototype, "DateTimeUtils");
//# sourceMappingURL=DateTimeUtils.js.map