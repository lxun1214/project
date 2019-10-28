var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerPacket = (function () {
    function ServerPacket() {
    }
    //错误提示
    ServerPacket.C_10 = "ErrorMessage_10"; //错误提示
    ServerPacket.LOGIN_URL = "LoginServer/user.login";
    ServerPacket.C_2002 = "UserLoginResponse_2002"; //注册或登陆成功返回
    ServerPacket.C_2003 = "GetServerListResponse_2003"; //服务器列表返回
    ServerPacket.C_2004 = "GetServerUrlResponse_2004"; //返回服务器地址
    ServerPacket.C_2005 = "SDKUserLoginResponse_2005"; //返回服务器地址
    ServerPacket.C_20000 = "HeartBeatResponse_20000"; //心跳返回
    ServerPacket.C_20001 = "LoginResponse_20001"; //进入游戏返回
    ServerPacket.C_20002 = "CreatePlayerResponse_20002"; //创建角色返回
    ServerPacket.C_20003 = "GetBagResponse_20003"; //道具列表
    ServerPacket.C_20004 = "ClearanceResponse_20004"; //关卡验证返回
    ServerPacket.C_20005 = "PlayerDieResponse_20005"; //返回上一关id
    ServerPacket.C_20006 = "UpgradeSkillResponse_20006"; //技能升级返回
    ServerPacket.C_20007 = "ChangeColumnSkillResponse_20007"; //技能更换返回
    ServerPacket.C_20008 = "WearEquipResponse_20008"; //穿戴装备返回
    ServerPacket.C_20009 = "UpgradeEquipResponse_20009"; //装备升级返回
    ServerPacket.C_20010 = "ReinforcedEquipResponse_20010"; //装备升阶返回
    ServerPacket.C_20011 = "RebirthResponse_20011"; //重生请求返回
    ServerPacket.C_20012 = "DecomposeEquipmentResponse_20012"; //装备熔炼分解返回
    ServerPacket.C_20013 = "BuyGoodsResponse_20013"; //商城购买商品返回（如果是限制购买次数的商品，购买后需要客户端自行储存添加）
    ServerPacket.C_20014 = "GemMountResponse_20014"; //宝石镶嵌（替换）返回
    ServerPacket.C_20015 = "GemRemoveResponse_20015"; //宝石摘除
    ServerPacket.C_20016 = "GemComposeInBagResponse_20016"; //合成宝石背包数据变化
    ServerPacket.C_20017 = "GemComposeInGrooveResponse_20017"; //合成镶嵌在宝石槽中宝石
    ServerPacket.C_20018 = "ActivationArtifactResponse_20018"; ////激活神器返回
    ServerPacket.C_20019 = "ReinforcedArtifactResponse_20019"; //升级神器返回
    ServerPacket.C_20020 = "EnterArenaResponse_20020"; //进入竞技场返回
    ServerPacket.C_20021 = "PurchaseChallengeNumResponse_20021"; //购买竞技场挑战次数返回
    ServerPacket.C_20022 = "LaunchChallengeResponse_20022"; //竞技场发起挑战返回
    ServerPacket.C_20023 = "FightSettlementResponse_20023"; //竞技场战斗结算返回
    ServerPacket.C_20024 = "GetRankingsResponse_20024"; //请求竞技场排行榜返回
    ServerPacket.C_20025 = "GetRankingsPowerResponse_20025"; //请求战力排行榜返回
    ServerPacket.C_20026 = "ReceiveArenaRewardResponse_20026"; //请求领取竞技场排行奖励返回
    ServerPacket.C_20027 = "ReceiveTaskRewardResponse_20027"; //领取成就任务返回
    ServerPacket.C_20028 = "ChallengePartResponse_20028"; //进入副本返回
    ServerPacket.C_20029 = "PartSettlementResponse_20029"; //副本结算返回
    ServerPacket.C_20030 = "RefreshArenaResponse_20030"; //刷新竞技人物返回
    ServerPacket.C_20031 = "TakeOffEquipResponse_20031"; //脱装备返回
    ServerPacket.C_20032 = "ReceiveActivityRewardResponse_20032"; //领取活动奖励返回）
    ServerPacket.C_20034 = "GenerateRechargeOrderInfoResponse_20034"; //购买钻石返回（客户端自行储存购买次数）
    ServerPacket.C_20035 = "OpenBoxResponse_20035"; //使用成功
    ServerPacket.C_20037 = "ReadEmailResponse_20037"; //读取邮件返回
    ServerPacket.C_20039 = "ReceiveEmailAwardChangeResponse_20039"; //领取邮件奖励，一键领取统一返回地方
    ServerPacket.C_20041 = "AllDelEmailResponse_20041"; //删除邮件，一键删除邮件统一返回
    ServerPacket.C_20042 = "DrawCardResponse_20042"; //抽卡返回
    ServerPacket.C_20044 = "ReceiveMonthCardResponse_20044"; //领取月卡奖励返回
    ServerPacket.C_20043 = "ReceiveVipRewardResponse_20043"; //领取vip奖励返回
    ServerPacket.C_20046 = "PurchaseInvestmentResponse_20046"; //购买投资计划返回
    ServerPacket.C_30001 = "RankingRewardChangeResponse_30001"; //服务器通知客户端可以领取排行奖励
    ServerPacket.C_30002 = "ItemChangeResponse_30002"; ////道具变化
    ServerPacket.C_30003 = "PlayerTaskChangeResponse_30003"; //成就任务
    ServerPacket.C_30004 = "PlayerFightPowerChangeResponse_30004"; //战力变化推送
    ServerPacket.C_30005 = "PlayerCurrencyChangeResponse_30005"; //货币变化推送
    ServerPacket.C_30006 = "PlayerActivityInfoChangeResponse_30006"; //活动完成 主动推送
    ServerPacket.C_30007 = "RefreshStorePurchaseInfoResponse_30007"; //0点推送商城限购次数刷新
    ServerPacket.C_30008 = "PlayerEmailChangeInfoResponse_30008"; //邮件推送
    ServerPacket.C_30009 = "PlayerVipLevelChangeResponse_30009"; //vip等级变化推送
    ServerPacket.C_30010 = "MonthCardChangeResponse_30010"; //月卡购买成功返回
    ServerPacket.C_40000 = "chatMessageResponse_40000"; //聊天消息
    ServerPacket.C_40001 = "GetRankingsLevelResponse_40001"; //等级榜返回
    ServerPacket.C_40002 = "GetRankingsMoneyResponse_40002"; //土豪榜返回
    return ServerPacket;
}());
__reflect(ServerPacket.prototype, "ServerPacket");
//# sourceMappingURL=ServerPacket.js.map