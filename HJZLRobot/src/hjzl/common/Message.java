package hjzl.common;

/**
 * 基础消息
 * @author MaHaiDong
 *
 */
public class Message {

	/** 消息编号 */
	private int cmd;

	/** PB消息�? */
	private Object body;

	private long userId;

	private long playerId;
	
	private String UUID;

	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	@SuppressWarnings("unchecked")
	public <T> T getBody() {
		return (T) body;
	}

	public void setBody(Object body) {
		this.body = body;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(long playerId) {
		this.playerId = playerId;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
	}

}
