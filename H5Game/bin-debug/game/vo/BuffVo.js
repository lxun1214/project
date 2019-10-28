var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *  buff对象，支持并联和串联
 */
var BuffVo = (function () {
    function BuffVo() {
        this.value = 0; //属性值
        /*效果相关*/
        this.endTime = 0; //结束时间
        this.triggerCount = 0; //触发次数
        this.hurtType = -1; //0+ 1*
        this.interval = [];
    }
    BuffVo.prototype.reset = function (type, value) {
        this.type = type;
        this.value = value;
    };
    BuffVo.create = function (type, value) {
        var buff;
        if (BuffVo.pooling.length) {
            buff = BuffVo.pooling.shift();
        }
        else {
            buff = new BuffVo();
        }
        BuffVo.seed++;
        buff.handle = BuffVo.seed;
        buff.reset(type, value);
        return buff;
    };
    BuffVo.prototype.destruct = function () {
        this.interval.length = 0;
        this.endTime = 0;
        this.triggerCount = 0;
        this.hurtType = -1;
        if (this.effs) {
            var e;
            while (this.effs.length) {
                (this.effs.shift()).destruct();
            }
        }
        this.effs = null;
        BuffVo.pooling.push(this);
    };
    BuffVo.pooling = new Array();
    BuffVo.seed = 0;
    return BuffVo;
}());
__reflect(BuffVo.prototype, "BuffVo");
var BuffType = (function () {
    function BuffType() {
    }
    BuffType.SUSTAIN_HP = 1; //持续伤害BUFF
    return BuffType;
}());
__reflect(BuffType.prototype, "BuffType");
//# sourceMappingURL=BuffVo.js.map