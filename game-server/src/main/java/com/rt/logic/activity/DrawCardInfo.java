package com.rt.logic.activity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.logic.activity.config.data.ExtractInfoConfig;
import com.rt.logic.activity.config.loader.ExtractInfoConfigLoader;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.player.CoinConst;
import com.rt.logic.player.CurrencyConst;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.PbDrawCardInfo;
import com.rt.utils.NumberUtils;

/**
 * 抽卡信息
 * @author MaHaiDong
 * 2018年7月5日
 *
 */
public class DrawCardInfo {

	/**当前已抽卡次数*/
	private int drawCardNum;
	
	/**历史抽卡次数*/
	private int historyDrawCardNum;

	
	
	/**
	 * 抽卡
	 * @param player
	 * @param drawType
	 */
	public synchronized void drawCard(IPlayer player,int drawType){
		int diamond = 0;
		if(drawType == 1){
			diamond = ActivityConst.DRAW_CARD_SINGLE;
		}else{
			diamond = ActivityConst.DRAW_CARD_MANY;
		}
		if(player.getDiamond()<diamond){
			return;
		}
		//扣除钻石
		player.addDelDiamond(-diamond, CoinConst.CONSUME_LUCK_DRAW);
		List<Integer> extractIdList = getItemAward(drawType, player);
		//打乱顺序
		Collections.shuffle(extractIdList);
		ActivityMsg.sendDrawCardMsg(player.getPlayerId(), true, this.drawCardNum, extractIdList);
		
	}
	
	
	
	public List<Integer> getItemAward(int drawType,IPlayer player) {
		List<Integer> extractIdList = new ArrayList<>();
		int count = 1;
		if(drawType!=1){
			count = 10;
		}
		int i;
		int j;
		int d;
		for(j=0;j<count;j++){
			this.drawCardNum++;
		    this.historyDrawCardNum++;
		    
		    ExtractInfoConfig config = null;
		    for(i=ExtractInfoConfigLoader.extractTimesList.size()-1;i>=0;i--)
		    {
		    	if(this.historyDrawCardNum % ExtractInfoConfigLoader.extractTimesList.get(i) == 0)
		    	{
		    		//满足次数 然后再随机0.5
		    		if(Math.random()*1 >= 0.5)
		    		{
		    			List <ExtractInfoConfig> l = ExtractInfoConfigLoader.extractTimesObj.get(ExtractInfoConfigLoader.extractTimesList.get(i));
		    			d = (int)Math.floor(Math.random()*l.size());
		    			config = l.get(d);//随机一项
		    			continue;
		    		}
		    	}
		    }
		    if(config == null)//随机其他的
		    {
		    	int sumRandomNum = 0;
				for(ExtractInfoConfig cfgI:ConfigCache.extractInfoConfigMap.values()){
					if(this.historyDrawCardNum>=cfgI.extractTimes){
						sumRandomNum+=cfgI.weight;
					}
				}
				int randomNum = NumberUtils.getRandomNum(sumRandomNum, 0);
				for(ExtractInfoConfig cfgII:ConfigCache.extractInfoConfigMap.values()){
					randomNum -= cfgII.weight;
					if (randomNum <= 0) {
						config = cfgII;
						break;
					}
				}
		    }
		    config.randomAward();
		    extractIdList.add(config.extractId);
			//添加奖励
			if(config.award_type == null){
				BagMsg.sendItemChangeMsg(player.getPlayerId(), player.getBag().addItem(config.itemList,ItemConst.ITEM_GET_ACTIVITY));
			}else
				for(String currencyType:config.currencyMap.keySet()){
					int num = config.currencyMap.get(currencyType);
					if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
						player.addDelGold(num,CoinConst.GET_ACTIVITY);
					} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
						player.addDelDiamond(num,CoinConst.GET_ACTIVITY);
					} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
						player.addDelSportsMoney(num,CoinConst.GET_ACTIVITY);
					} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
						player.addDelUpgradeSkillsJade(num,CoinConst.GET_ACTIVITY);
					} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
						player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
					} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
						player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
					}
				}
				
			}
			
			//总权重值
//			int sumRandomNum = 0;
//			for(ExtractInfoConfig config:ConfigCache.extractInfoConfigMap.values()){
//				if(this.drawCardNum == ActivityConst.MAX_VAL){
//					//如果正好是第十次，取区间为1的
//					if(config.interval == 0){
//						continue;
//					}
//				}else{
//					//其他取区间为0的
//					if(config.interval == 1){
//						continue;
//					}
//				}
//				if(this.historyDrawCardNum>=config.extractTimes){
//					sumRandomNum+=config.weight;
//				}
//			}
//			int randomNum = NumberUtils.getRandomNum(sumRandomNum, 0);
//			for(ExtractInfoConfig config:ConfigCache.extractInfoConfigMap.values()){
//				if(this.drawCardNum == ActivityConst.MAX_VAL){
//					//如果正好是第十次，取区间为1的
//					if(config.interval == 0){
//						continue;
//					}
//				}else{
//					//其他取区间为0的
//					if(config.interval == 1){
//						continue;
//					}
//				}
//				randomNum -= config.weight;
//				if (randomNum <= 0) {
//					extractIdList.add(config.extractId);
//					//添加奖励
//					if(config.itemList.size()>0){
//						BagMsg.sendItemChangeMsg(player.getPlayerId(), player.getBag().addItem(config.itemList,ItemConst.ITEM_GET_ACTIVITY));
//					}
//					//货币
//					if(config.currencyMap.size()>0){
//						for(String currencyType:config.currencyMap.keySet()){
//							int num = config.currencyMap.get(currencyType);
//							if (currencyType.equals(CurrencyConst.STORE_GOLD)) {
//								player.addDelGold(num,CoinConst.GET_ACTIVITY);
//							} else if (currencyType.equals(CurrencyConst.STORE_DIAMOND)) {
//								player.addDelDiamond(num,CoinConst.GET_ACTIVITY);
//							} else if (currencyType.equals(CurrencyConst.STORE_SPORTS_MONEY)) {
//								player.addDelSportsMoney(num,CoinConst.GET_ACTIVITY);
//							} else if (currencyType.equals(CurrencyConst.STORE_UPGRADE_SKILLS_JADE)) {
//								player.addDelUpgradeSkillsJade(num,CoinConst.GET_ACTIVITY);
//							} else if (currencyType.equals(CurrencyConst.STORE_STRENGTHEN_ARTIFACT_STONE)) {
//								player.addDelStrengthenArtifactStone(num,CoinConst.GET_ACTIVITY);
//							} else if (currencyType.equals(CurrencyConst.STORE_RES)) {
//								player.addDelReinforcedEquipmentStone(num,CoinConst.GET_ACTIVITY);
//							}
//						}
//						
//					}
//					break;
//				}
//			}
			if(this.drawCardNum>=ActivityConst.MAX_VAL){
				this.drawCardNum = 0;
			}
//		}
		return extractIdList;
	}
	
	
	public PbDrawCardInfo.Builder createPbDrawCardInfo(){
		PbDrawCardInfo.Builder builder = PbDrawCardInfo.newBuilder();
		builder.setDrawCardNum(drawCardNum);
		return builder;
	}
	
	
	public int getHistoryDrawCardNum() {
		return historyDrawCardNum;
	}

	public void setHistoryDrawCardNum(int historyDrawCardNum) {
		this.historyDrawCardNum = historyDrawCardNum;
	}

	public int getDrawCardNum() {
		return drawCardNum;
	}

	public void setDrawCardNum(int drawCardNum) {
		this.drawCardNum = drawCardNum;
	}
}
