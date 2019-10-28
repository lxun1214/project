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
var Btn01 = (function (_super) {
    __extends(Btn01, _super);
    function Btn01() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Btn01.prototype, "s0", {
        get: function () {
            return this._s0;
        },
        set: function (v) {
            this._s0 = v;
            if (this.n0)
                this.n0.source = this.s0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Btn01.prototype, "s1", {
        get: function () {
            return this._s1;
        },
        set: function (v) {
            this._s1 = v;
            if (this.n1)
                this.n1.source = this.s1;
        },
        enumerable: true,
        configurable: true
    });
    Btn01.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.s1)
            this.n1.source = this.s1;
        if (this.s0)
            this.n0.source = this.s0;
    };
    return Btn01;
}(eui.Button));
__reflect(Btn01.prototype, "Btn01");
//# sourceMappingURL=Btn01.js.map