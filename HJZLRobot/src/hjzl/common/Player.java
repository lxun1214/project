package hjzl.common;


public class Player {
	private long playerId;

	private long userId;

	private String uuid;

	private String account;

	private String playerName;

	private int gold;

	private int diamond;

	/** 卡牌碎片数量 */
	private int fragmentNum;

	/** 勋章数量 */
	private int medalNum;

	/** 竞技场等�? */
	private int arenaLevel;

	/** 当前参战的角色卡牌id */
	private int curRoleCardId;

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public int getGold() {
		return gold;
	}

	public void setGold(int gold) {
		this.gold = gold;
	}

	public int getDiamond() {
		return diamond;
	}

	public void setDiamond(int diamond) {
		this.diamond = diamond;
	}

	public int getFragmentNum() {
		return fragmentNum;
	}

	public void setFragmentNum(int fragmentNum) {
		this.fragmentNum = fragmentNum;
	}

	public int getMedalNum() {
		return medalNum;
	}

	public void setMedalNum(int medalNum) {
		this.medalNum = medalNum;
	}

	public int getArenaLevel() {
		return arenaLevel;
	}

	public void setArenaLevel(int arenaLevel) {
		this.arenaLevel = arenaLevel;
	}

	public int getCurRoleCardId() {
		return curRoleCardId;
	}

	public void setCurRoleCardId(int curRoleCardId) {
		this.curRoleCardId = curRoleCardId;
	}
}
