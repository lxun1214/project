package com.rt.logic.bag;

import com.rt.pb.PbPlayer.PbGemGrooveInfo;

/**
 * 宝石槽位
 */
public class GemGroove {

	/** 槽位(从0开始) */
	int loc;

	/** 是否开启 */
	boolean isOpen;

	/** 镶嵌的宝石id */
	int gemId;
	
	public PbGemGrooveInfo.Builder showGemGrooveInfo(){
		PbGemGrooveInfo.Builder builder = PbGemGrooveInfo.newBuilder();
		builder.setLoc(loc);
		builder.setIsOpen(isOpen);
		builder.setGemId(gemId);
		
		return builder;
	}

	public int getLoc() {
		return loc;
	}

	public void setLoc(int loc) {
		this.loc = loc;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

	public int getGemId() {
		return gemId;
	}

	public void setGemId(int gemId) {
		this.gemId = gemId;
	}

}
