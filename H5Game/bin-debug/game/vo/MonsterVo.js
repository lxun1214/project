var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonsterVo = (function () {
    function MonsterVo(vo) {
        this.jobId = 4;
        this.playerAttrInfo = new PbPlayerAttrInfo();
        this.nid = vo.monsterModel;
        this.difficultyFactor = vo.difficultyFactor;
        this.testName = MonsterVo.TEST_NAME + "";
        MonsterVo.TEST_NAME++;
        var a;
        if (vo.skillId1 != 0 && vo.skillId1 && vo.skillId1 != "" && vo.skillId1 != "0") {
            a = vo.skillId1.split("#");
            var skill;
            this.skillArr = [];
            for (var i = 0; i < a.length; i++) {
                skill = new SkillVo(parseInt(a[i]), 1);
                this.skillArr.push(skill);
            }
        }
        for (var key in vo) {
            if (this.playerAttrInfo[key] != undefined)
                this.playerAttrInfo[key] = vo[key];
        }
        this.nHp = this.nMaxHp;
    }
    Object.defineProperty(MonsterVo.prototype, "nMaxHp", {
        get: function () {
            return this.playerAttrInfo.blood;
        },
        enumerable: true,
        configurable: true
    });
    MonsterVo.TEST_NAME = 0;
    return MonsterVo;
}());
__reflect(MonsterVo.prototype, "MonsterVo");
//# sourceMappingURL=MonsterVo.js.map