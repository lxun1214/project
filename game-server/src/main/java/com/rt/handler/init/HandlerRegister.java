package com.rt.handler.init;

import com.rt.chat.ChatHandler;
import com.rt.common.C2SMessageNum;
import com.rt.gloable.GloableService;
import com.rt.gloable.impl.IHandler;
import com.rt.gm.GMHandler;
import com.rt.logic.activity.handler.DrawCardHandler;
import com.rt.logic.activity.handler.PurchaseFortuneCatHandler;
import com.rt.logic.activity.handler.PurchaseInvestmentHandler;
import com.rt.logic.activity.handler.ReceiveActivityRewardHandler;
import com.rt.logic.arena.handler.EnterArenaHandler;
import com.rt.logic.arena.handler.FightSettlementHandler;
import com.rt.logic.arena.handler.GetRankingMoneyHandler;
import com.rt.logic.arena.handler.GetRankingsHandler;
import com.rt.logic.arena.handler.GetRankingsLevelHandler;
import com.rt.logic.arena.handler.GetRankingsPowerHandler;
import com.rt.logic.arena.handler.LaunchChallengeHandler;
import com.rt.logic.arena.handler.PurchaseChallengeNumHandler;
import com.rt.logic.arena.handler.ReceiveArenaRewardHandler;
import com.rt.logic.arena.handler.RefreshArenaHandler;
import com.rt.logic.artifact.handler.ActivationArtifactHandler;
import com.rt.logic.artifact.handler.ReinforcedArtifactHandler;
import com.rt.logic.bag.handler.DecomposeEquipmentHandler;
import com.rt.logic.bag.handler.GemComposeInBagHandler;
import com.rt.logic.bag.handler.GemComposeInGrooveHandler;
import com.rt.logic.bag.handler.GemMountHandler;
import com.rt.logic.bag.handler.GemRemoveHandler;
import com.rt.logic.bag.handler.GetBagHandler;
import com.rt.logic.bag.handler.OpenBoxHandler;
import com.rt.logic.bag.handler.ReinforcedEquipmentHandler;
import com.rt.logic.bag.handler.TakeOffEquipHandler;
import com.rt.logic.bag.handler.UpgradeEquipmentHandler;
import com.rt.logic.bag.handler.WearEquipmentHandler;
import com.rt.logic.email.handler.AllDelEmailHandler;
import com.rt.logic.email.handler.AllReceiveEmailAwardHandler;
import com.rt.logic.email.handler.DelEmailHandler;
import com.rt.logic.email.handler.ReadEmailHandler;
import com.rt.logic.email.handler.ReceiveEmailAwardHandler;
import com.rt.logic.part.handler.ChallengePartHandler;
import com.rt.logic.part.handler.PartSettlementHandler;
import com.rt.logic.player.handler.CreatePlayerHandler;
import com.rt.logic.player.handler.HeartBeatHandler;
import com.rt.logic.player.handler.LoginHandler;
import com.rt.logic.player.handler.PlayerDieHandler;
import com.rt.logic.player.handler.RebirthHandler;
import com.rt.logic.player.handler.ReceiveVipRewardHandler;
import com.rt.logic.player.handler.SaveGuideHandler;
import com.rt.logic.player.handler.UseGiftCodeHandler;
import com.rt.logic.points.handler.ClearanceHandler;
import com.rt.logic.recharge.handler.GenerateRechargeOrderInfoHandler;
import com.rt.logic.recharge.handler.ReceiveMonthCardHandler;
import com.rt.logic.shop.handler.BuyGoodsHandler;
import com.rt.logic.skill.handler.ChangeColumnSkillHandler;
import com.rt.logic.skill.handler.UpGradeSkillHandler;
import com.rt.logic.task.handler.ReceiveTaskRewardHandler;

public class HandlerRegister {

	public static void init(GloableService service) {

		initHandler(service, C2SMessageNum.GM, new GMHandler());

		// initHandler(service, C2SMessageNum.HEARTBEAT, new
		// HeartbeatHandler());

		initHandler(service, C2SMessageNum.HEARTBEAT, new HeartBeatHandler());
		initHandler(service, C2SMessageNum.LOGIN, new LoginHandler());
		initHandler(service, C2SMessageNum.CREATE_PLAYER, new CreatePlayerHandler());
		initHandler(service, C2SMessageNum.GET_BAG, new GetBagHandler());
		initHandler(service, C2SMessageNum.CLEARANCE, new ClearanceHandler());
		initHandler(service, C2SMessageNum.PLAYER_DIE, new PlayerDieHandler());
		initHandler(service, C2SMessageNum.UPGRADE_SKILL, new UpGradeSkillHandler());
		initHandler(service, C2SMessageNum.CHANGE_COLUMN_SKILL, new ChangeColumnSkillHandler());
		initHandler(service, C2SMessageNum.WEAR_EQUIPMENT, new WearEquipmentHandler());
		initHandler(service, C2SMessageNum.UPGRADE_EQUIP, new UpgradeEquipmentHandler());
		initHandler(service, C2SMessageNum.REINFORCED_EQUIP, new ReinforcedEquipmentHandler());
		initHandler(service, C2SMessageNum.REBIRTH, new RebirthHandler());
		initHandler(service, C2SMessageNum.EQUIPMENT_DECOMPOSE, new DecomposeEquipmentHandler());
		initHandler(service, C2SMessageNum.BUY_SHOP_GOODS, new BuyGoodsHandler());
		initHandler(service, C2SMessageNum.GEM_MOUNT, new GemMountHandler());
		initHandler(service, C2SMessageNum.GEM_REMOVE, new GemRemoveHandler());
		initHandler(service, C2SMessageNum.GEM_COMPOSE_IN_BAG, new GemComposeInBagHandler());
		initHandler(service, C2SMessageNum.GEM_COMPOSE_IN_GROOVE, new GemComposeInGrooveHandler());
		initHandler(service, C2SMessageNum.ACTIVATION_ARTIFACT, new ActivationArtifactHandler());
		initHandler(service, C2SMessageNum.REINFORCED_ARTIFACT, new ReinforcedArtifactHandler());
		initHandler(service, C2SMessageNum.ENTER_ARENA, new EnterArenaHandler());
		initHandler(service, C2SMessageNum.PURCHASE_CHALLENGE_NUM, new PurchaseChallengeNumHandler());
		initHandler(service, C2SMessageNum.LAUNCH_CHALLENGE, new LaunchChallengeHandler());
		initHandler(service, C2SMessageNum.FIGHT_SETTLEMENT, new FightSettlementHandler());
		initHandler(service, C2SMessageNum.GET_RANKINGS, new GetRankingsHandler());
		initHandler(service, C2SMessageNum.GET_POWER_RANKINGS, new GetRankingsPowerHandler());
		initHandler(service, C2SMessageNum.RECEIVE_ARENA_REWARD, new ReceiveArenaRewardHandler());
		initHandler(service, C2SMessageNum.RECEIVE_TASK_REWARD, new ReceiveTaskRewardHandler());
		initHandler(service, C2SMessageNum.CHALLENGE_PART, new ChallengePartHandler());
		initHandler(service, C2SMessageNum.PART_SETTLEMENT, new PartSettlementHandler());
		initHandler(service, C2SMessageNum.REFRESH_ARENA, new RefreshArenaHandler());
		initHandler(service, C2SMessageNum.TAKE_OFF_EQUIP, new TakeOffEquipHandler());
		
		initHandler(service, C2SMessageNum.RECEIVE_ACTIVITY_REWARD, new ReceiveActivityRewardHandler());
		initHandler(service, C2SMessageNum.PURCHASE_FORTUNE_CAT, new PurchaseFortuneCatHandler());
		initHandler(service, C2SMessageNum.GENERATE_RECHARGE_ORDER_INFO, new GenerateRechargeOrderInfoHandler());
		initHandler(service, C2SMessageNum.OPEN_BOX, new OpenBoxHandler());
		initHandler(service, C2SMessageNum.SAVE_GUIDE, new SaveGuideHandler());
		
		initHandler(service, C2SMessageNum.READ_EMAIL, new ReadEmailHandler());
		initHandler(service, C2SMessageNum.RECEIVE_EMAIL, new ReceiveEmailAwardHandler());
		initHandler(service, C2SMessageNum.RECEIVE_ALL_EMAIL, new AllReceiveEmailAwardHandler());
		initHandler(service, C2SMessageNum.DEL_EMAIL, new DelEmailHandler());
		initHandler(service, C2SMessageNum.DEL_ALL_EMAIL, new AllDelEmailHandler());
		initHandler(service, C2SMessageNum.DRAW_CARD, new DrawCardHandler());
		initHandler(service, C2SMessageNum.RECEIVE_VIP_REWARD, new ReceiveVipRewardHandler());
		initHandler(service, C2SMessageNum.RECIEVE_MONTH_REARD, new ReceiveMonthCardHandler());
		initHandler(service, C2SMessageNum.USE_GIFT_CODE, new UseGiftCodeHandler());
		initHandler(service, C2SMessageNum.PURCHASE_INVESTMENT, new PurchaseInvestmentHandler());
		
		initHandler(service, C2SMessageNum.CHAT, new ChatHandler());
		initHandler(service, C2SMessageNum.LEVEL_RANK, new GetRankingsLevelHandler());
		initHandler(service, C2SMessageNum.MONEY_RANK, new GetRankingMoneyHandler());
	}

	@SuppressWarnings({ "unchecked" })
	private static void initHandler(GloableService service, int cmd, IHandler handler) {
		service.getHandlerManager().addHandler(cmd, handler);
		service.getPbMessageManager().addMessageCla(cmd, (Class<IHandler>) handler.initBodyClass());
	}

}
