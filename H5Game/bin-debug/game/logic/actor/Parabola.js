var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Parabola = (function () {
    function Parabola() {
    }
    /**
     * 抛物线采样点计算函数
     * 通过给出起点XY，落点XY，按一定时间周期进行采样，算出每个采样时间的XY
     * @param cX 起点X
     * @param cY 起点Y
     * @param dX 落点X
     * @param dY 落点Y
     * @param nTime 抛物线持续的时间
     * @param accY  手动指定的重力加速度
     * @param nSamplingCount 采样点数量
     * @return 返回一个采样点XY坐标数组
     *
     * ★★注意★★
     * 本函数计算的坐标象限依据为：Y向6点方向递增，X向3点方向递增。这与几何学中的坐标方向中Y轴的方向相反！
     */
    Parabola.MakeParabolaPoints = function (cX, cY, dX, dY, nTime, nSamplingCount, accY) {
        if (accY === void 0) { accY = 0; }
        //这里增加一个可控的Y轴加速度,如果设置为0,就用重力加速度
        if (accY == 0)
            accY = Parabola.g;
        var Result = new Array(nSamplingCount);
        var sh = (dX - cX) / nTime;
        var sv = ((cY - dY) + accY * (nTime * nTime) / 2) / nTime;
        var t = 0;
        var sSampling = nTime / nSamplingCount; //采样速度
        for (var i = 0; i < nSamplingCount; ++i) {
            t += sSampling;
            Result[i] = new egret.Point(cX + sh * t, cY - ((sv * t) - (accY * (t * t) / 2)));
        }
        return Result;
    };
    Parabola.g = 9.8; //重力加速度
    return Parabola;
}());
__reflect(Parabola.prototype, "Parabola");
//# sourceMappingURL=Parabola.js.map