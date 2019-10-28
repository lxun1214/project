var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ColorUtlis = (function () {
    function ColorUtlis() {
    }
    ColorUtlis.COLOR_STR = function (s, d) {
        if (d)
            return new egret.HtmlTextParser().parser("<font color = '#32CD32'>" + s + "</font>");
        return new egret.HtmlTextParser().parser("<font color = '#FF3030'>" + s + "</font>");
    };
    //颜色矩阵数组
    ColorUtlis.colorMatrix = new egret.ColorMatrixFilter([
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ]);
    ColorUtlis.QUALITY_COLOR = [0xffffff, 0x57f65e, 0x53b1fa, 0xff66d6, 0xffdd3e, 0xede4b3];
    /**绿色 */
    ColorUtlis.COLOR_GREEN = 0x32CD32;
    /**红色 */
    ColorUtlis.COLOR_RED = 0xFF3030;
    return ColorUtlis;
}());
__reflect(ColorUtlis.prototype, "ColorUtlis");
//# sourceMappingURL=ColorUtlis.js.map