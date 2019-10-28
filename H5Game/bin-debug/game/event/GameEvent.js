var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvent = (function () {
    function GameEvent() {
    }
    GameEvent.CHANGE_MINIMAP = "CHANGE_MINIMAP"; //更新小地图
    GameEvent.SKILL_UP_LVL = "SKILL_UP_LVL"; //技能升级
    GameEvent.UP_PLAYER_PROPERTY = "UP_PLAYER_PROPERTY"; //人物属性变更 propertyType
    GameEvent.MONSTER_COUNT_CHANGE = "MONSTER_COUNT_CHANGE"; //怪物数量变更
    GameEvent.SELECT_SKILL = "SELECT_SKILL"; //选择技能
    GameEvent.INIT_ROLE = "INIT_ROLE"; //初始化人物
    GameEvent.UPDATE_BAG_DATA = "UPDATE_BAG_DATA"; //更新背包数据
    GameEvent.UPDATE_GEM_DATA = "UPDATE_GEM_DATA"; //更新宝石界面数据
    GameEvent.UPDATE_PLAYER_WIN = "UPDATE_PLAYER_WIN"; //角色界面
    GameEvent.UPDATE_ARTIFACT_WIN = "UPDATE_ARTIFACT_WIN"; //神器
    // static UP_TASK:string = "UP_TASK";//更新任务
    GameEvent.UP_STRENGTH = "UP_STRENGTH"; //更新强化
    GameEvent.UP_ADVANCE = "UP_ADVANCE"; //升阶返回
    GameEvent.UP_SHOP_BUY = "UP_SHOP_BUY"; //次数刷新
    GameEvent.ADD_EMAIL = "ADD_EMAIL"; //添加邮件
    GameEvent.REMOVE_EMAIL = "REMOVE_EMAIL"; //移除邮件
    GameEvent.UP_EMAIL_STATUS = "UP_EMAIL_STATUS"; //更新状态
    GameEvent.STUDY_SKILL = "STUDY_SKILL"; //学习新技能
    GameEvent.WEAR_EQUIPS = "WEAR_EQUIPS"; //穿戴装备返回
    GameEvent.MONEY_TYPE_CHANGE = "MONEY_TYPE_CHANGE"; //货币变更
    GameEvent.UP_CHAT = "UP_CHAT"; //新加聊天信息
    //红点提示
    GameEvent.RED_MAIN_TASK = "RED_MAIN_TASK";
    GameEvent.RED_DAY_TASK = "RED_DAY_TASK";
    GameEvent.RED_ACHEIEVEMENT = "RED_ACHEIEVEMENT";
    GameEvent.RED_SKILL = "RED_SKILL";
    GameEvent.RED_ARTIFACE = "RED_ARTIFACE";
    GameEvent.RED_STRENG = "RED_STRENG";
    GameEvent.RED_EQUIP_LVL = "RED_EQUIP_LVL";
    GameEvent.RED_GEM_LVL = "RED_GEM_LVL";
    GameEvent.RED_EMAIL = "RED_EMAIL";
    GameEvent.RED_BAG_RED = "RED_BAG_RED";
    GameEvent.RED_ACTIVETY = "RED_ACTIVETY";
    return GameEvent;
}());
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map