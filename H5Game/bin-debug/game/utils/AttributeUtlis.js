var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AttributeUtlis = (function () {
    function AttributeUtlis() {
    }
    //添加删除属性
    AttributeUtlis.attributeMgr = function (propertys, add, info, job) {
        if (add === void 0) { add = true; }
        info = info ? info : UserVo.ins.playerAttrInfo;
        job = job ? job : UserVo.ins.jobId;
        var dx;
        var lv;
        for (var k in propertys) {
            lv = -1;
            if (info[k] == undefined)
                continue;
            dx = AttributeUtlis.BaseAttribute.indexOf(k);
            if (dx == -1) {
                dx = AttributeUtlis.BaseAttributeII.indexOf(k);
                lv = dx;
            }
            if (add)
                info[k] += propertys[k];
            else
                info[k] -= propertys[k];
            if (dx != -1) {
                var config = ConfigMgr.gameConfig["propertyConversion"];
                for (var j = 0; j < AttributeUtlis.DeriveAttribute.length; j++) {
                    if (add) {
                        info[AttributeUtlis.DeriveAttribute[j]] += propertys[k] * config[(job - 1) * 4 + dx][AttributeUtlis.DeriveAttribute[j]];
                    }
                    else {
                        info[AttributeUtlis.DeriveAttribute[j]] -= propertys[k] * config[(job - 1) * 4 + dx][AttributeUtlis.DeriveAttribute[j]];
                    }
                }
            }
            if (lv >= 0) {
                if (add)
                    info[AttributeUtlis.BaseAttribute[lv]] += propertys[k];
                else
                    info[AttributeUtlis.BaseAttribute[lv]] -= propertys[k];
            }
        }
        if (info == UserVo.ins.playerAttrInfo && Human.ins)
            Human.ins.upSpeed();
    };
    //buff属性添加或者减去从目标身上
    AttributeUtlis.BuffAttributeByTarge = function (buff, vo, add) {
        if (!vo)
            return;
        var info = vo.playerAttrInfo;
        if (!info)
            return;
        var config = ConfigMgr.gameConfig["attributeName"];
        var obj = config[buff.type + ""];
        switch (buff.type) {
            case ComAttribute.intellectHurt:
                if (add)
                    info["bonusDamage"] += info["intellect"] * buff.value / 100;
                else
                    info["bonusDamage"] -= info["intellect"] * buff.value / 100;
                break;
            case ComAttribute.thornsPCT:
            case ComAttribute.leechPCT:
            case ComAttribute.invincible:
            case ComAttribute.hurtPCT:
                return;
            default:
                if (buff.hurtType == -1)
                    return;
                if (buff.hurtType == 0) {
                    var v = {};
                    v[obj.value] = buff.value;
                    AttributeUtlis.attributeMgr(v, add, info, vo.jobId);
                }
                else {
                    var v = {};
                    if (add)
                        v[obj.value] = buff.value / 100 * info[obj.value];
                    else
                        v[obj.value] = (info[obj.value] * buff.value / (100 + buff.value));
                    AttributeUtlis.attributeMgr(v, add, info, vo.jobId);
                }
                break;
        }
    };
    //基础属性（power力量;intellect智力alacrity敏捷physique体力）
    AttributeUtlis.BaseAttribute = ["power", "intellect", "alacrity", "physique"];
    AttributeUtlis.BaseAttributeII = ["powerQuality", "intellectQuality", "alacrityQuality", "physiqueQuality"];
    //衍生  物理攻击	物理防御	魔法攻击	魔法防御	生命值
    AttributeUtlis.DeriveAttribute = ["attackInit", "armorInit", "magicAttack", "magicArmorInit", "blood"];
    return AttributeUtlis;
}());
__reflect(AttributeUtlis.prototype, "AttributeUtlis");
//# sourceMappingURL=AttributeUtlis.js.map