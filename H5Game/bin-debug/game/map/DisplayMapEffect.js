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
 *  地图特效
 */
var DisplayMapEffect = (function (_super) {
    __extends(DisplayMapEffect, _super);
    function DisplayMapEffect(hitFunc, thisObj) {
        var arg = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            arg[_i - 2] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        /**
         * 移动
         */
        _this._isMissile = false;
        _this._startTime = -1;
        _this._offsetX = _this._offsetY = 0;
        return _this;
    }
    DisplayMapEffect.prototype.init = function () {
        this.skill = undefined;
        this.user = undefined;
        this.target = undefined;
        this._isMissile = false;
        this._startTime = -1;
        this.targetHandle = 0;
        this.visible = true;
        // super.endMove();
    };
    /**
     * 创建场景特效
     */
    DisplayMapEffect.create = function () {
        if (DisplayMapEffect.poollings.length > 0) {
            DisplayMapEffect.poollings[0].init();
            return DisplayMapEffect.poollings.shift();
        }
        return new DisplayMapEffect();
    };
    DisplayMapEffect.prototype.moveTo = function (nx, ny, speed) {
        this._startTime = egret.getTimer() + 5000;
        this.rotation = 0;
        if (speed > 0) {
            this._isMissile = true;
            if (_super.prototype.moveTo.call(this, nx, ny, speed)) {
                this.rotation = Math.atan2(this.nSteppingY, this.nSteppingX) * 180 / Math.PI + 90;
                return true;
            }
            else {
                this.nStartMoveTick = this.getTimer();
                this.nEndMoveTick = this.nStartMoveTick + speed;
                this.nTargetX = nx;
                this.nTargetY = ny;
            }
        }
        else {
            this._isMissile = false;
        }
        return false;
    };
    Object.defineProperty(DisplayMapEffect.prototype, "finish", {
        /**
         * 判断是否完成播放
         */
        get: function () {
            var t = egret.getTimer();
            if (!this._isMissile) {
                if (this._clip && this._clip.isComplete) {
                    if ((this._clip.currentFrame == this._clip.totalFrames - 1 && this._clip.lastPlayTimes <= 0) || (this._clip.endPlayloop != 0 && this._clip.endPlayloop < t)) {
                        return true;
                    }
                }
            }
            else if (!this.onMoveing || !this.isMoving) {
                return true;
            }
            if (this._startTime < t) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置特效id
     */
    DisplayMapEffect.prototype.playEffect = function (value, times, keepTime, offsetX, offsetY) {
        if (times === void 0) { times = -1; }
        if (keepTime === void 0) { keepTime = -1; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        if (value < 0) {
            return;
        }
        if (!this._clip) {
            this._clip = ModelResMgr.getSkillEffect(value);
        }
        else {
            ModelResMgr.getSkillEffect(value, this._clip);
        }
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        if (!this._clip.isComplete && keepTime != -1) {
            this._clip.endPlayloop = keepTime;
            this._clip.play(times);
        }
        else {
            this._clip.endPlayloop = 0;
            this._clip.play(times);
        }
        this.addChild(this._clip);
    };
    /**
     * 设置结束移动的触发函数
     */
    DisplayMapEffect.prototype.setEndHandle = function (SkillVo, user, target) {
        this.skill = SkillVo;
        this.user = user;
        this.target = target;
        this.targetHandle = target.handleId;
    };
    /*
     * 销毁
     */
    DisplayMapEffect.prototype.destruct = function (gc) {
        if (gc === void 0) { gc = false; }
        // if(gc)
        // {
        this._clip.destruct();
        //this._clip = null;
        // }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        DisplayMapEffect.poollings.push(this);
    };
    DisplayMapEffect.poollings = new Array();
    return DisplayMapEffect;
}(DisplayMapObject));
__reflect(DisplayMapEffect.prototype, "DisplayMapEffect");
//# sourceMappingURL=DisplayMapEffect.js.map