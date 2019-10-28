class ClientPacket {
	public constructor() {
	}
	//GM
	public static S_100: string = "GmRequest_100";

	static s_10000:string = "HeartBeatRequest_10000";//心跳
	//pb_user
	public static S_1002: string = "UserLoginRequest_1002";//用户登陆
	public static S_1003: string = "GetServerListRequest_1003";//请求服务器列表
	public static S_1004: string = "GetServerUrlRequest_1004";//请求服务器地址
	public static S_1005: string = "SDKUserLoginRequest_1005";//登录
	//pb_player
	public static S_10001: string = "LoginRequest_10001";//正式请求进入游戏
	public static S_10002: string = "CreatePlayerRequest_10002";//创角色	
	public static S_10003 = "GetBagRequest_10003";//请求背包列表
	public static S_10004 = "ClearanceRequest_10004";//过关
	public static S_10005 = "PlayerDieRequest_10005";//死亡

	public static S_10006 = "UpgradeSkillRequest_10006";//升级技能
	static S_10007 = "ChangeColumnSkillRequest_10007";//替换技能

	public static S_10008 = "WearEquipRequest_10008";//穿戴装备
	public static S_10009 = "UpgradeEquipRequest_10009";//装备升级，必须装备以后才可以升级（策划需求）
	public static S_10010 = "ReinforcedEquipRequest_10010";//装备升阶，必须装备以后才可以升阶（策划需求）
	public static S_10012 = "DecomposeEquipmentRequest_10012";//装备熔炼分解
	public static S_10031 = "TakeOffEquipRequest_10031";//脱装备

	public static S_10013: string = "BuyGoodsRequest_10013";//商城购买商品

	public static S_10014 = "GemMountRequest_10014";//宝石镶嵌(包含替换)
	public static S_10015 = "GemRemoveRequest_10015";//宝石摘除
	public static S_10016 = "GemComposeInBagRequest_10016";//合成背包中宝石
	public static S_10017 = "GemComposeInGrooveRequest_10017";//合成镶嵌在宝石槽中宝石

	public static S_10018: string = "ActivationArtifactRequest_10018";//激活神器
	public static S_10019: string = "ReinforcedArtifactRequest_10019";//神器升阶


	static S_10020: string = "EnterArenaRequest_10020";//进入竞技场
	static S_10021: string = "PurchaseChallengeNumRequest_10021";//购买竞技场挑战次数
	static S_10022: string = "LaunchChallengeRequest_10022";//竞技场发起挑战
	static S_10023: string = "FightSettlementRequest_10023";//竞技场战斗结算
	static S_10024: string = "GetRankingsRequest_10024";//请求竞技场排行榜
	static S_10025: string = "GetRankingsPowerRequest_10025";//请求战力排行榜
	static S_10026:string = "ReceiveArenaRewardRequest_10026";//请求领取竞技场排行奖励
	static S_10027:string = "ReceiveTaskRewardRequest_10027";//领取成就任务奖励
	static S_10028:string = "ChallengePartRequest_10028";//请求进入副本
	static S_10029:string = "PartSettlementRequest_10029";//副本结算
	static S_10030: string = "RefreshArenaRequest_10030";//刷新对手

	public static S_10034: string = "GenerateRechargeOrderInfoRequest_10034"//购买钻石

	static S_10035:string = "OpenBoxRequest_10035";//使用物品

	static S_10036:string = "SaveGuideRequest_10036";//引导保存


	static S_10032:string = "ReceiveActivityRewardRequest_10032";//活动相关


	static S_10037:string = "ReadEmailRequest_10037";//读取邮件
	static S_10038:string = "ReceiveEmailAwardRequest_10038";//领取邮件奖励(和一键领取走同一个返回)
	static S_10039:string = "AllReceiveEmailAwardRequest_10039";//领取邮件奖励，一键领取统一返回地方
	static S_10040:string = "DelEmailRequest_10040";//删除邮件(和一键删除走同一个返回)
	static S_10041:string = "AllDelEmailRequest_10041";//一键删除邮件（只会删掉未领取奖励的邮件）

	static S_10011:string = "RebirthRequest_10011";//重生请求

	static S_10043:string = "ReceiveVipRewardRequest_10043" //领取vip奖励 

	static S_10042:string = "DrawCardRequest_10042" //抽卡（请做好钻石验证  单抽耗费50钻石，10连耗费450钻石）
	static S_10044:string = "ReceiveMonthCardRequest_10044" //领取月卡奖励
	static S_10045:string = "UseGiftCodeRequest_10045";//兑换激活码
	static S_10046:string = "PurchaseInvestmentRequest_10046" //购买投资计划
	

	static S_30000:string = "sendChat_30000";//发送聊天
	static S_30001:string = "GetRankingsLevelRequest_30001";//等级榜
	static S_30002:string = "GetRankingsMoneyRequest_30002";//充值榜
}