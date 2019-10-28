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
var CreateRole = (function (_super) {
    __extends(CreateRole, _super);
    function CreateRole() {
        var _this = _super.call(this) || this;
        _this.skinName = "createRoleSkin";
        _this.horizontalCenter = 0;
        for (var i = 1; i <= 7; i++) {
            _this["b" + i].name = i + "";
            _this["b" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        }
        var obj = ConfigMgr.gameConfig["surnametype"][0];
        _this.name1 = obj["surname"].split("\n");
        _this.name2 = obj["name"].split("\n");
        _this.randomJob();
        _this.randomName();
        return _this;
    }
    CreateRole.prototype.randomJob = function () {
        this.b2.touchEnabled = this.b3.touchEnabled = false;
        this.job = 1; //Math.floor(Math.random()*3) + 1;
        this.role.source = ResMgr.getGameOtherPng("h_" + this.job);
        this.sex = Math.floor(Math.random() * 2) + 1;
    };
    CreateRole.prototype.randomName = function () {
        var s;
        s = this.name1[Math.floor(Math.random() * this.name1.length)];
        s += this.name2[Math.floor(Math.random() * this.name1.length)];
        this.t1.text = s;
    };
    CreateRole.prototype.onClick = function (e) {
        var n = parseInt(e.target.name);
        switch (n) {
            case 1:
            case 2:
            case 3:
                this.job = n;
                this.role.source = ResMgr.getGameOtherPng("h_" + n);
                break;
            case 4:
                if (this.t1.text == "") {
                    UserTips.ins().showTipsBigToSmall("请输入名字!");
                    return;
                }
                var data = {
                    playerName: this.t1.text,
                    jobId: this.job,
                    sex: this.sex
                };
                HttpMgr.ins.sendMessage(ClientPacket.S_10002, data, ServerPacket.LOGIC_URL);
                break;
            case 5:
                this.randomName();
                break;
            case 6:
                this.sex = 1;
                break;
            case 7:
                this.sex = 2;
                break;
        }
    };
    Object.defineProperty(CreateRole.prototype, "sex", {
        get: function () {
            return this._sex;
        },
        set: function (v) {
            this._sex = v;
            this.b6.selected = v == 1;
            this.b7.selected = v != 1;
            this.role.source = "h_" + v + "_png";
        },
        enumerable: true,
        configurable: true
    });
    CreateRole.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        for (var i = 1; i <= 5; i++) {
            this["b" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    return CreateRole;
}(eui.Component));
__reflect(CreateRole.prototype, "CreateRole", ["IDispose"]);
//# sourceMappingURL=CreateRole.js.map