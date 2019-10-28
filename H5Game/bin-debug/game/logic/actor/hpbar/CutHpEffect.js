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
/**
 *
 * @author
 *
 */
var CutHpEffect = (function (_super) {
    __extends(CutHpEffect, _super);
    function CutHpEffect(ty) {
        var _this = _super.call(this) || this;
        _this.t = ty;
        if (ty == ActorRace.HUMAN)
            _this.font = RES.getRes("fightFontII_fnt");
        else
            _this.font = RES.getRes("sysFont_fnt");
        _this.verticalAlign = egret.VerticalAlign.JUSTIFY;
        return _this;
    }
    /**
     * 播放特效
     */
    CutHpEffect.playHp = function (value, parent, crit, offsetx, offsety) {
        if (crit === void 0) { crit = 1; }
        if (offsetx === void 0) { offsetx = 0; }
        if (offsety === void 0) { offsety = -100; }
        var effect;
        if (CutHpEffect.pooling[parent.nRace].length) {
            effect = CutHpEffect.pooling[parent.nRace].shift();
        }
        else {
            effect = new CutHpEffect(parent.nRace);
        }
        effect.isCrit = false;
        if (value == Number.MIN_VALUE) {
            // effect.textColor = 0xFF00FF;
            effect.text = "未命中";
        }
        else if (value == 0) {
            // effect.textColor = 0xFF00FF;
            effect.text = "闪避";
        }
        else if (crit >= 1) {
            // effect.textColor = 0xFE6001;
            effect.text = "暴击" + Math.floor(value).toString();
            effect.isCrit = true;
        }
        else if (value < 0) {
            // effect.textColor = 0xffff00;
            effect.text = value.toString();
        }
        else {
            // effect.textColor = 0x00ff00;
            effect.text = "+" + Math.floor(value);
        }
        parent.addChild(effect);
        effect.x = -effect.textWidth / 2 + offsetx;
        effect.y = -100 + offsety;
        effect.scaleX = effect.scaleY = 0;
        effect.tw = egret.Tween.get(effect);
        if (!effect.isCrit)
            effect.tw.to({ y: -165 + offsety, scaleX: 1.5, scaleY: 1.5 }, 300).call(effect.twEnd, null, [effect, 0, offsetx, offsety]);
        else
            effect.tw.to({ y: -165 + offsety, x: -100, scaleX: 0.45, scaleY: 0.45 }, 100).call(effect.twEnd, null, [effect, 0, offsetx, offsety]);
    };
    CutHpEffect.prototype.twEnd = function (effect, type, offsetx, offsety) {
        if (!effect.isCrit) {
            if (type == 0) {
                this.delay = setTimeout(effect.twEnd, 400, effect, 1, offsetx, offsety);
            }
            else {
                effect.tw = egret.Tween.get(effect, null, true);
                effect.tw.to({ x: 150 + offsetx, alpha: 0, scaleX: 0, scaleY: 0 }, 300).call(effect.endEffect, effect);
            }
        }
        else {
            if (type == 0) {
                effect.tw = egret.Tween.get(effect, null, true);
                effect.tw.to({ y: -180 + offsety, x: -150 + offsetx, scaleX: 1.65, scaleY: 1.65 }, 500, egret.Ease.elasticOut).call(effect.twEnd, null, [effect, 1, offsetx, offsety]);
            }
            else if (type == 1) {
                effect.tw = egret.Tween.get(effect, null, true);
                effect.tw.to({ x: 0 + offsetx, alpha: 0, scaleX: 0, scaleY: 0 }, 300).call(effect.endEffect, effect);
            }
        }
    };
    /**
     * 播放特效
     */
    // public static playEffect(src: string,color:number,parent: egret.DisplayObjectContainer,offsetx: number,offsety: number):void
    // {
    //     var effect: CutHpEffect;
    //     if(CutHpEffect.pooling.length) {
    //         effect = CutHpEffect.pooling.shift();
    //     } else {
    //         effect = new CutHpEffect();
    //     }
    //     // effect.textColor = color;
    //     effect.text = src;
    //     parent.addChild(effect);
    //     effect.x = offsetx - effect.textWidth / 2;
    //     effect.y = offsety;
    //     effect.tw = egret.Tween.get(effect);
    //     effect.tw.to({ y: offsety - 26 },800).call(effect.endEffect,effect);
    // }
    /**
     * 结束特效
     */
    CutHpEffect.prototype.endEffect = function () {
        clearTimeout(this.delay);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
        egret.Tween.removeTweens(this);
        CutHpEffect.pooling[this.t].push(this);
    };
    CutHpEffect.pooling = [[], [], []]; //飘血特效
    return CutHpEffect;
}(eui.BitmapLabel));
__reflect(CutHpEffect.prototype, "CutHpEffect");
//# sourceMappingURL=CutHpEffect.js.map