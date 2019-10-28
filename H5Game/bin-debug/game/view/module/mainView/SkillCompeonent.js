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
var SkillCompeonent = (function (_super) {
    __extends(SkillCompeonent, _super);
    function SkillCompeonent() {
        var _this = _super.call(this) || this;
        _this.radiu = 51;
        _this.isMaxSkill = false;
        _this.openCD = false;
        _this.skinName = "SkillCompeonentSkin";
        // DataEventDispatcher.dispatcher.addEventListener(SkillVo.SKILL_DOWN_CD,this.UpCd,this);
        var shape = _this._shape = new egret.Shape();
        // shape.x = 54;
        // shape.y = 54;
        _this.addChildAt(shape, 3);
        // this._shapeII = new egret.Shape();
        // this._shapeII.graphics.beginFill(0x0,0.5);
        // this._shapeII.graphics.drawRect(0,0,102,102);
        // this._shapeII.graphics.endFill();
        // this._shapeII.visible = false;
        // this.addChildAt(this._shapeII,5);
        _this.myTime = new egret.Timer(200);
        _this.myTime.addEventListener(egret.TimerEvent.TIMER, _this.downCD, _this);
        return _this;
        // DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.upSkill,this);
    }
    SkillCompeonent.prototype.changeGraphics = function (angle) {
        var shape = this._shape;
        shape.graphics.clear();
        shape.graphics.beginFill(0x0, 0.5);
        shape.graphics.moveTo(0, 0);
        shape.graphics.lineTo(this.radiu, 0);
        shape.graphics.drawArc(0, 0, this.radiu, 0, angle * Math.PI / 180, true);
        shape.graphics.lineTo(0, 0);
        shape.graphics.endFill();
    };
    SkillCompeonent.prototype.setData = function (v) {
        this.vo = v;
        if ((v.level == 0) || !v) {
            this.suo.visible = true;
            //this.rc.visible = false;
            this.icon.source = !v ? null : (this.openCD ? null : ResMgr.skillIcon(v.stdSkill.skillIcon));
            // this.w1.visible  = false;
            this.sname.text = "";
            //大招需要显示背景
            if (v)
                this.isMaxSkill = SkillMgr.ins.isMaxSkill(this.vo);
            // if(SkillMgr.ins.isMaxSkill(this.vo) && this.openCD)
            // 	this.w1.visible = true;
        }
        else {
            /*this.rc.visible = */ this.suo.visible = false;
            this.icon.source = ResMgr.skillIcon(v.stdSkill.skillIcon);
            if (this.openCD) {
                this.isMaxSkill = SkillMgr.ins.isMaxSkill(this.vo);
                if (this.isMaxSkill) {
                    // this.w1.visible =  true;
                    // this.cd.visible = false;
                    this.sname.text = v.stdSkill.name;
                }
                else {
                    // this.w1.visible =  false;
                    this.sname.text = v.stdSkill.name;
                }
                if (!this.vo.canUse)
                    this.UpCd(null);
            }
            else {
                // this.w1.visible =  false;
                this.sname.text = "";
                this.suo.visible = v.level == 0;
                /*this.rc.visible = */ this.suo.visible;
            }
        }
        this.w1.source = this.isMaxSkill ? "ww1" : "ww2";
        if (this.isMaxSkill) {
            this.icon.scaleX = this.icon.scaleY = 1.2;
            //			this._shape.scaleX = this._shape.scaleY = 1.2;
            this.icon.verticalCenter = -5;
            this.icon.horizontalCenter = -1;
            this._shape.x = 87;
            this._shape.y = 65;
        }
        else {
            this._shape.x = 56;
            this._shape.y = 58;
        }
    };
    SkillCompeonent.prototype.UpCd = function (e) {
        if (!e || e.data == this.vo) {
            if (this.isMaxSkill) {
                // this.w3.mask = this._shape;
                this.radiu = 54;
            }
            else {
                // this.w3.mask = null;
                this.radiu = 44.5;
                // this._shapeII.visible = true;
                // this._shape.mask = this._shapeII;
            }
            this.myTime.stop();
            this.downCD();
            this.myTime.reset();
            this.myTime.start();
        }
    };
    SkillCompeonent.prototype.downCD = function () {
        if (this.vo) {
            if (this.vo.canUse) {
                // this._shapeII.visible = false;
                this.changeGraphics(0);
                // this.w3.mask = null;
                this._shape.mask = null;
                this.cd.text = "";
                this.myTime.stop();
            }
            else {
                var d = this.vo._currentCD - GameLogic.ins.gameRunTick;
                this.cd.text = Math.floor(d / 100) + "";
                // if(!this.isMaxSkill)
                this.changeGraphics((this.vo.stdSkill.CD - d) / this.vo.stdSkill.CD * 360);
                // else
                // this.changeGraphics(d / this.vo.stdSkill.CD * 360);
            }
        }
    };
    Object.defineProperty(SkillCompeonent.prototype, "data", {
        get: function () {
            return this.vo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCompeonent.prototype, "canClick", {
        get: function () {
            if (!this.vo)
                return false;
            return this.vo.level != 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillCompeonent.prototype, "monitorCD", {
        set: function (val) {
            this.openCD = val;
            if (val)
                DataEventDispatcher.dispatcher.addEventListener(SkillVo.SKILL_DOWN_CD, this.UpCd, this);
            else
                DataEventDispatcher.dispatcher.removeEventListener(SkillVo.SKILL_DOWN_CD, this.UpCd, this);
        },
        enumerable: true,
        configurable: true
    });
    return SkillCompeonent;
}(eui.Component));
__reflect(SkillCompeonent.prototype, "SkillCompeonent");
//# sourceMappingURL=SkillCompeonent.js.map