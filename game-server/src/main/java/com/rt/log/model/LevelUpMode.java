package com.rt.log.model;

public class LevelUpMode extends BaseLogModel {

	private int startLevel;

	private int endLevel;

	public LevelUpMode(int startLevel, int endLevel) {
		this.startLevel = startLevel;
		this.endLevel = endLevel;
	}

	public int getStartLevel() {
		return startLevel;
	}

	public void setStartLevel(int startLevel) {
		this.startLevel = startLevel;
	}

	public int getEndLevel() {
		return endLevel;
	}

	public void setEndLevel(int endLevel) {
		this.endLevel = endLevel;
	}

}
