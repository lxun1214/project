package com.rt.logic.bag;

import java.util.ArrayList;
import java.util.List;

import com.rt.cache.ConfigCache;
import com.rt.common.GameConst;
import com.rt.logic.item.Item;
import com.rt.pb.PbPlayer.PbEquipColumnInfo;
import com.rt.pb.PbPlayer.PbGemGrooveInfo;
import com.rt.pb.PbPlayer.PbGemGrooveInfos;

public class Column {

	int loc;

	/** 装备 */
	Item item;

	/** 宝石槽 */
	GemGroove[] grooves = new GemGroove[GameConst.GEM_GROOVE_SIZE];
	
	/**
	 * 是否可以镶嵌宝石
	 * @param grooveLoc
	 * @param gemType
	 * @return
	 */
	public boolean canMountGem(int grooveLoc,int gemType) {
		GemGroove groove = grooves[grooveLoc];
		//没有解锁该宝石槽
		if(!groove.isOpen) {
			return false;
		}
		//是否有同类宝石
		for(int i = 0;i < grooves.length;i++) {
			if(i == grooveLoc) {
				continue;
			}
			GemGroove gg = grooves[i];
			if(ConfigCache.gemAttrConfigMap.get(gg.gemId).AttrType == gemType) {
				return false;
			}
		}
		return true;
	}

	public void initGroove() {
		for (int i = 0; i < GameConst.GEM_GROOVE_SIZE; i++) {
			GemGroove groove = new GemGroove();
			groove.setLoc(i);
			grooves[i] = groove;
		}
	}
	
	public PbEquipColumnInfo.Builder showEquipColumInfo(){
		PbEquipColumnInfo.Builder builder = PbEquipColumnInfo.newBuilder();
		builder.setLoc(loc);
		if(item != null) {
			builder.setItemInfo(item.showItemInfo());
		}
		PbGemGrooveInfos.Builder gemGrooveInfosBuilder = PbGemGrooveInfos.newBuilder();
		List<PbGemGrooveInfo> grooveInfoList = new ArrayList<>();
		for(int i = 0;i < grooves.length;i++) {
			GemGroove groove = grooves[i];
			grooveInfoList.add(groove.showGemGrooveInfo().build());
		}
		gemGrooveInfosBuilder.addAllGemGrooves(grooveInfoList);
		builder.setGemGrooves(gemGrooveInfosBuilder);
		return builder;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public GemGroove[] getGrooves() {
		return grooves;
	}

	public void setGrooves(GemGroove[] grooves) {
		this.grooves = grooves;
	}

	public int getLoc() {
		return loc;
	}

	public void setLoc(int loc) {
		this.loc = loc;
	}

}
