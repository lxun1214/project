class GameEvent {
	public constructor() {
	}
	static CHANGE_MINIMAP:string = "CHANGE_MINIMAP";//更新小地图
	static SKILL_UP_LVL:string = "SKILL_UP_LVL";//技能升级
	static UP_PLAYER_PROPERTY:string = "UP_PLAYER_PROPERTY";//人物属性变更 propertyType
	static MONSTER_COUNT_CHANGE:string = "MONSTER_COUNT_CHANGE";//怪物数量变更
	static SELECT_SKILL:string = "SELECT_SKILL";//选择技能
	static INIT_ROLE:string = "INIT_ROLE";//初始化人物
	static UPDATE_BAG_DATA: string = "UPDATE_BAG_DATA";//更新背包数据
	static UPDATE_GEM_DATA: string = "UPDATE_GEM_DATA";//更新宝石界面数据
	static UPDATE_PLAYER_WIN:string = "UPDATE_PLAYER_WIN";//角色界面
	static UPDATE_ARTIFACT_WIN:string = "UPDATE_ARTIFACT_WIN";//神器

	// static UP_TASK:string = "UP_TASK";//更新任务

	static UP_STRENGTH:string = "UP_STRENGTH";//更新强化
	static UP_ADVANCE:string = "UP_ADVANCE";//升阶返回

	static UP_SHOP_BUY:string = "UP_SHOP_BUY";//次数刷新


	static ADD_EMAIL:string = "ADD_EMAIL";//添加邮件
	static REMOVE_EMAIL:string = "REMOVE_EMAIL";//移除邮件
	static UP_EMAIL_STATUS:string = "UP_EMAIL_STATUS";//更新状态

	static STUDY_SKILL:string = "STUDY_SKILL";//学习新技能

	static WEAR_EQUIPS:string = "WEAR_EQUIPS";//穿戴装备返回

	static MONEY_TYPE_CHANGE:string = "MONEY_TYPE_CHANGE";//货币变更

	static UP_CHAT:string = "UP_CHAT";//新加聊天信息

	//红点提示
	static RED_MAIN_TASK:string = "RED_MAIN_TASK";
	static RED_DAY_TASK:string = "RED_DAY_TASK";
	static RED_ACHEIEVEMENT:string = "RED_ACHEIEVEMENT";
	static RED_SKILL:string = "RED_SKILL";
	static RED_ARTIFACE:string = "RED_ARTIFACE";
	static RED_STRENG:string = "RED_STRENG";
	static RED_EQUIP_LVL:string = "RED_EQUIP_LVL";
	static RED_GEM_LVL:string = "RED_GEM_LVL";
	static RED_EMAIL:string = "RED_EMAIL";
	static RED_BAG_RED:string = "RED_BAG_RED";
	static RED_ACTIVETY:string = "RED_ACTIVETY";
}