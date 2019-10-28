class ServerPacket {
	public constructor() {
	}
	//错误提示
	public static C_10: string = "ErrorMessage_10";//错误提示

	public static LOGIN_URL: string = "LoginServer/user.login";
	public static C_2002: string = "UserLoginResponse_2002";//注册或登陆成功返回
	public static C_2003: string = "GetServerListResponse_2003";//服务器列表返回
	public static C_2004: string = "GetServerUrlResponse_2004";//返回服务器地址
	public static C_2005: string = "SDKUserLoginResponse_2005";//返回服务器地址

	public static LOGIC_URL: string;
	static C_20000:string = "HeartBeatResponse_20000";//心跳返回
	public static C_20001: string = "LoginResponse_20001";//进入游戏返回
	public static C_20002: string = "CreatePlayerResponse_20002";//创建角色返回
	public static C_20003: string = "GetBagResponse_20003";	//道具列表
	public static C_20004: string = "ClearanceResponse_20004";//关卡验证返回
	public static C_20005: string = "PlayerDieResponse_20005";//返回上一关id
	public static C_20006: string = "UpgradeSkillResponse_20006";//技能升级返回
	static C_20007: string = "ChangeColumnSkillResponse_20007";//技能更换返回
	public static C_20008: string = "WearEquipResponse_20008";//穿戴装备返回
	public static C_20009: string = "UpgradeEquipResponse_20009"//装备升级返回
	public static C_20010: string = "ReinforcedEquipResponse_20010";//装备升阶返回
	static C_20011:string = "RebirthResponse_20011";//重生请求返回
	public static C_20012: string = "DecomposeEquipmentResponse_20012";//装备熔炼分解返回

	public static C_20013: string = "BuyGoodsResponse_20013";//商城购买商品返回（如果是限制购买次数的商品，购买后需要客户端自行储存添加）

	public static C_20014: string = "GemMountResponse_20014";//宝石镶嵌（替换）返回
	public static C_20015: string = "GemRemoveResponse_20015";//宝石摘除
	public static C_20016: string = "GemComposeInBagResponse_20016";//合成宝石背包数据变化
	public static C_20017:string = "GemComposeInGrooveResponse_20017";//合成镶嵌在宝石槽中宝石

	public static C_20018: string = "ActivationArtifactResponse_20018";////激活神器返回
	public static C_20019: string = "ReinforcedArtifactResponse_20019";//升级神器返回

	static C_20020: string = "EnterArenaResponse_20020";//进入竞技场返回
	static C_20021: string = "PurchaseChallengeNumResponse_20021";//购买竞技场挑战次数返回
	static C_20022: string = "LaunchChallengeResponse_20022";//竞技场发起挑战返回
	static C_20023: string = "FightSettlementResponse_20023";//竞技场战斗结算返回
	static C_20024: string = "GetRankingsResponse_20024";//请求竞技场排行榜返回
	static C_20025: string = "GetRankingsPowerResponse_20025";//请求战力排行榜返回
	static C_20026: string = "ReceiveArenaRewardResponse_20026"//请求领取竞技场排行奖励返回
	static C_20027:string = "ReceiveTaskRewardResponse_20027";//领取成就任务返回
	static C_20028:string = "ChallengePartResponse_20028";//进入副本返回
	static C_20029:string = "PartSettlementResponse_20029";//副本结算返回

	static C_20030:string = "RefreshArenaResponse_20030";//刷新竞技人物返回
	public static C_20031: string = "TakeOffEquipResponse_20031";//脱装备返回
	public static C_20032: string = "ReceiveActivityRewardResponse_20032"//领取活动奖励返回）
	public static C_20034: string = "GenerateRechargeOrderInfoResponse_20034";//购买钻石返回（客户端自行储存购买次数）
	static C_20035:string = "OpenBoxResponse_20035";//使用成功
	static C_20037:string = "ReadEmailResponse_20037";//读取邮件返回
	static C_20039:string = "ReceiveEmailAwardChangeResponse_20039";//领取邮件奖励，一键领取统一返回地方
	static C_20041:String = "AllDelEmailResponse_20041";//删除邮件，一键删除邮件统一返回
	static C_20042:string = "DrawCardResponse_20042";//抽卡返回
	static C_20044:string = "ReceiveMonthCardResponse_20044";//领取月卡奖励返回
	static C_20043:string = "ReceiveVipRewardResponse_20043" //领取vip奖励返回
	static C_20046:string = "PurchaseInvestmentResponse_20046";//购买投资计划返回

	static C_30001:string = "RankingRewardChangeResponse_30001"//服务器通知客户端可以领取排行奖励
	public static C_30002: string = "ItemChangeResponse_30002";////道具变化
	static C_30003:string = "PlayerTaskChangeResponse_30003";//成就任务
	static C_30004:string = "PlayerFightPowerChangeResponse_30004";//战力变化推送
	static C_30005:string = "PlayerCurrencyChangeResponse_30005";//货币变化推送
	public static C_30006:string = "PlayerActivityInfoChangeResponse_30006"//活动完成 主动推送
	static C_30007:string = "RefreshStorePurchaseInfoResponse_30007";//0点推送商城限购次数刷新
	static C_30008:string = "PlayerEmailChangeInfoResponse_30008";//邮件推送
	static C_30009:string = "PlayerVipLevelChangeResponse_30009";//vip等级变化推送
	static C_30010:string = "MonthCardChangeResponse_30010";//月卡购买成功返回


	static C_40000:string = "chatMessageResponse_40000";//聊天消息
	static C_40001:string = "GetRankingsLevelResponse_40001";//等级榜返回
	static C_40002:string = "GetRankingsMoneyResponse_40002";//土豪榜返回
}