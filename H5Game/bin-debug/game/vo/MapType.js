var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapType = (function () {
    function MapType() {
    }
    //关卡、关卡BOSS、副本、jjc
    MapType.TYPE_0 = 0;
    MapType.TYPE_1 = 1;
    MapType.TYPE_2 = 2;
    MapType.TYPE_3 = 3;
    return MapType;
}());
__reflect(MapType.prototype, "MapType");
//# sourceMappingURL=MapType.js.map