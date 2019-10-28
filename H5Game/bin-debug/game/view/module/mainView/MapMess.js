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
var MapMess = (function (_super) {
    __extends(MapMess, _super);
    function MapMess() {
        var _this = _super.call(this) || this;
        _this.RX = 95;
        _this.RY = 72;
        return _this;
    }
    MapMess.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.mmap.mask = this.mm;
        DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE, function () {
            var A = GameMap.ins();
            _this.mmap.source = ResMgr.getMapImage(A.lastFile + ".jpg");
            _this.ln.text = A.mapType == MapType.TYPE_3 ? "竞技场" : (A.mapType == MapType.TYPE_2 ? "副本(第" + parseInt(A.mc.partID) % 100 + "层)" : "第" + A.mc.pointId + "关");
        }, this);
        TimerManager.ins().doTimer(500, 0, function () {
            _this.rr.visible = !_this.rr.visible;
        }, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.CHANGE_MINIMAP, function (e) {
            var sc = DisplayMapObject.MINMAP_SCALE;
            var w = MapVo.ins.miniMapW;
            var h = MapVo.ins.miniMapH;
            var a = e.data.a / sc;
            var b = e.data.b / sc;
            a -= _this.mm.width / 2;
            a = -a;
            b -= _this.mm.height / 2;
            b = -b;
            if (a >= 0) {
                _this.rr.x = _this.RX - a; // - this.rr.width/2;;
                a = 0;
            }
            else if (a <= _this.mm.width - w) {
                _this.rr.x = _this.RX + (-a + _this.mm.width - w); // - this.rr.width/2;;
                a = _this.mm.width - w;
            }
            else {
                _this.rr.x = _this.RX;
            }
            if (b >= 0) {
                _this.rr.y = _this.RY - b; // - this.rr.height/2;
                b = 0;
            }
            else if (b <= _this.mm.height - h) {
                _this.rr.y = _this.RY + (-b + _this.mm.height - h); // - this.rr.height/2;
                b = _this.mm.height - h;
            }
            else {
                _this.rr.y = _this.RY;
            }
            _this.mmap.x = a + _this.mm.x;
            _this.mmap.y = b + 38;
        }, this);
    };
    return MapMess;
}(eui.Component));
__reflect(MapMess.prototype, "MapMess");
//# sourceMappingURL=MapMess.js.map