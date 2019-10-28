var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StdSkillRange = (function () {
    // public isClear:boolean = true;
    function StdSkillRange() {
    }
    Object.defineProperty(StdSkillRange.prototype, "data", {
        set: function (s) {
            this.clear();
            if (!s || s == "" || s == "0")
                return;
            var a = s.split(",");
            switch (a[0]) {
                case "0":
                    this.type = 0;
                    this.g = parseInt(a[1]);
                    break;
                case "1":
                    this.type = 1;
                    this.w = parseInt(a[1]);
                    this.h = parseInt(a[2]);
                    break;
                case "2":
                    this.type = 2;
                    this.g = parseInt(a[1]);
                    break;
            }
            // this.isClear = false;
        },
        enumerable: true,
        configurable: true
    });
    StdSkillRange.prototype.clear = function () {
        this.w = this.h = this.g = this.c = null;
        // this.isClear = true;
        this.type = -1;
    };
    return StdSkillRange;
}());
__reflect(StdSkillRange.prototype, "StdSkillRange");
//# sourceMappingURL=StdSkillRange.js.map