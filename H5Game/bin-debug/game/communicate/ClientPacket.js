var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClientPacket = (function () {
    function ClientPacket() {
    }
    //GM
    ClientPacket.S_100 = "GmRequest_100";
    ClientPacket.s_10000 = "HeartBeatRequest_10000"; //心跳
    //pb_user
    ClientPacket.S_1002 = "UserLoginRequest_1002"; //用户登陆
    ClientPacket.S_1003 = "GetServerListRequest_1003"; //请求服务器列表
    ClientPacket.S_1004 = "GetServerUrlRequest_1004"; //请求服务器地址
    ClientPacket.S_1005 = "SDKUserLoginRequest_1005"; //登录
    //pb_player
    ClientPacket.S_10001 = "LoginRequest_10001"; //正式请求进入游戏
    ClientPacket.S_10002 = "CreatePlayerRequest_10002"; //创角色	
    ClientPacket.S_10003 = "GetBagRequest_10003"; //请求背包列表
    ClientPacket.S_10004 = "ClearanceRequest_10004"; //过关
    ClientPacket.S_10005 = "PlayerDieRequest_10005"; //死亡
    ClientPacket.S_10006 = "UpgradeSkillRequest_10006"; //升级技能
    ClientPacket.S_10007 = "ChangeColumnSkillRequest_10007"; //替换技能
    ClientPacket.S_10008 = "WearEquipRequest_10008"; //穿戴装备
    ClientPacket.S_10009 = "UpgradeEquipRequest_10009"; //装备升级，必须装备以后才可以升级（策划需求）
    ClientPacket.S_10010 = "ReinforcedEquipRequest_10010"; //装备升阶，必须装备以后才可以升阶（策划需求）
    ClientPacket.S_10012 = "DecomposeEquipmentRequest_10012"; //装备熔炼分解
    ClientPacket.S_10031 = "TakeOffEquipRequest_10031"; //脱装备
    ClientPacket.S_10013 = "BuyGoodsRequest_10013"; //商城购买商品
    ClientPacket.S_10014 = "GemMountRequest_10014"; //宝石镶嵌(包含替换)
    ClientPacket.S_10015 = "GemRemoveRequest_10015"; //宝石摘除
    ClientPacket.S_10016 = "GemComposeInBagRequest_10016"; //合成背包中宝石
    ClientPacket.S_10017 = "GemComposeInGrooveRequest_10017"; //合成镶嵌在宝石槽中宝石
    ClientPacket.S_10018 = "ActivationArtifactRequest_10018"; //激活神器
    ClientPacket.S_10019 = "ReinforcedArtifactRequest_10019"; //神器升阶
    ClientPacket.S_10020 = "EnterArenaRequest_10020"; //进入竞技场
    ClientPacket.S_10021 = "PurchaseChallengeNumRequest_10021"; //购买竞技场挑战次数
    ClientPacket.S_10022 = "LaunchChallengeRequest_10022"; //竞技场发起挑战
    ClientPacket.S_10023 = "FightSettlementRequest_10023"; //竞技场战斗结算
    ClientPacket.S_10024 = "GetRankingsRequest_10024"; //请求竞技场排行榜
    ClientPacket.S_10025 = "GetRankingsPowerRequest_10025"; //请求战力排行榜
    ClientPacket.S_10026 = "ReceiveArenaRewardRequest_10026"; //请求领取竞技场排行奖励
    ClientPacket.S_10027 = "ReceiveTaskRewardRequest_10027"; //领取成就任务奖励
    ClientPacket.S_10028 = "ChallengePartRequest_10028"; //请求进入副本
    ClientPacket.S_10029 = "PartSettlementRequest_10029"; //副本结算
    ClientPacket.S_10030 = "RefreshArenaRequest_10030"; //刷新对手
    ClientPacket.S_10034 = "GenerateRechargeOrderInfoRequest_10034"; //购买钻石
    ClientPacket.S_10035 = "OpenBoxRequest_10035"; //使用物品
    ClientPacket.S_10036 = "SaveGuideRequest_10036"; //引导保存
    ClientPacket.S_10032 = "ReceiveActivityRewardRequest_10032"; //活动相关
    ClientPacket.S_10037 = "ReadEmailRequest_10037"; //读取邮件
    ClientPacket.S_10038 = "ReceiveEmailAwardRequest_10038"; //领取邮件奖励(和一键领取走同一个返回)
    ClientPacket.S_10039 = "AllReceiveEmailAwardRequest_10039"; //领取邮件奖励，一键领取统一返回地方
    ClientPacket.S_10040 = "DelEmailRequest_10040"; //删除邮件(和一键删除走同一个返回)
    ClientPacket.S_10041 = "AllDelEmailRequest_10041"; //一键删除邮件（只会删掉未领取奖励的邮件）
    ClientPacket.S_10011 = "RebirthRequest_10011"; //重生请求
    ClientPacket.S_10043 = "ReceiveVipRewardRequest_10043"; //领取vip奖励 
    ClientPacket.S_10042 = "DrawCardRequest_10042"; //抽卡（请做好钻石验证  单抽耗费50钻石，10连耗费450钻石）
    ClientPacket.S_10044 = "ReceiveMonthCardRequest_10044"; //领取月卡奖励
    ClientPacket.S_10045 = "UseGiftCodeRequest_10045"; //兑换激活码
    ClientPacket.S_10046 = "PurchaseInvestmentRequest_10046"; //购买投资计划
    ClientPacket.S_30000 = "sendChat_30000"; //发送聊天
    ClientPacket.S_30001 = "GetRankingsLevelRequest_30001"; //等级榜
    ClientPacket.S_30002 = "GetRankingsMoneyRequest_30002"; //充值榜
    return ClientPacket;
}());
__reflect(ClientPacket.prototype, "ClientPacket");
//# sourceMappingURL=ClientPacket.js.map