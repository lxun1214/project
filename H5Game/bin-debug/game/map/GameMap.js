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
var GameMap = (function (_super) {
    __extends(GameMap, _super);
    function GameMap(val) {
        return _super.call(this, val) || this;
    }
    GameMap.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args[0]);
    };
    GameMap.prototype.update = function (CurrentTick) {
        //处理地图震荡效果，在EnterFrame事件中也会处理
        if (this.m_dwShakingOverTick) {
            this.runShakeEffect(CurrentTick);
        }
    };
    /**
    * 开始地图震动效果
    * @param xRange 水平方向震动的范围限制
    * @param yRange 垂直方向震动的范围限制
    * @param shakeTime 震动持续时间，单位是毫秒
    *
    */
    GameMap.prototype.shake = function (xRange, yRange, shakeTime) {
        this.m_nShakeRangeX = xRange;
        this.m_nShakeRangeY = yRange;
        this.m_dwShakingOverTick = egret.getTimer() + shakeTime;
    };
    /**
    * 强制结束屏幕震荡效果
    *
    */
    GameMap.prototype.stopShake = function () {
        if (this.m_dwShakingOverTick) {
            this.m_dwShakingOverTick = 0;
        }
    };
    /**
    * 处理地图震荡效果
    *
    */
    GameMap.prototype.runShakeEffect = function (CurrentTick) {
        if (CurrentTick < this.m_dwShakingOverTick) {
            var nOldX = this.m_nLayersOffsetX;
            var nOldY = this.m_nLayersOffsetY;
            //根据地图震荡参数，随机产生震荡偏移 
            this.m_nLayersOffsetX = -this.m_nShakeRangeX / 2 + egret.getTimer() % this.m_nShakeRangeX;
            this.m_nLayersOffsetY = -this.m_nShakeRangeY / 2 + egret.getTimer() % this.m_nShakeRangeY;
            //如果随机的偏移与上次的偏移相同，则再次随机以避免两次偏移相同而导致看起来没有震荡
            if (nOldX == this.m_nLayersOffsetX && this.m_nShakeRangeX != 0)
                this.m_nLayersOffsetX += -6 + Math.random() * 1000 % 11;
            if (nOldY == this.m_nLayersOffsetY && this.m_nShakeRangeY != 0)
                this.m_nLayersOffsetY += -6 + Math.random() * 1000 % 11;
        }
        else {
            this.m_nLayersOffsetX = this.m_nLayersOffsetY = 0;
            this.m_dwShakingOverTick = 0;
        }
    };
    return GameMap;
}(BaseMap));
__reflect(GameMap.prototype, "GameMap");
//# sourceMappingURL=GameMap.js.map