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
var ToggleBtn01 = (function (_super) {
    __extends(ToggleBtn01, _super);
    function ToggleBtn01() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ToggleBtn01.prototype, "s0", {
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
    Object.defineProperty(ToggleBtn01.prototype, "s1", {
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
    Object.defineProperty(ToggleBtn01.prototype, "c0", {
        get: function () {
            return this._c0;
        },
        set: function (v) {
            this._c0 = v;
            if (this.a0)
                this.a0.source = this.c0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleBtn01.prototype, "c1", {
        get: function () {
            return this._c1;
        },
        set: function (v) {
            this._c1 = v;
            if (this.a1)
                this.a1.source = this.c1;
        },
        enumerable: true,
        configurable: true
    });
    ToggleBtn01.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.n1)
            this.n1.source = this.s1;
        if (this.n0)
            this.n0.source = this.s0;
        if (this.a1 && this.c1)
            this.a1.source = this.c1;
        if (this.a0 && this.c0)
            this.a0.source = this.c0;
    };
    return ToggleBtn01;
}(eui.ToggleButton));
__reflect(ToggleBtn01.prototype, "ToggleBtn01");
//# sourceMappingURL=ToggleBtn01.js.map