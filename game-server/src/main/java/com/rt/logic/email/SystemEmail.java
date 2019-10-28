package com.rt.logic.email;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 系统邮件
 * @author MaHaiDong
 * 2018年7月1日
 *
 */
public class SystemEmail {
	
	/**系统邮件ID*/
	private long emailId;
	/**标题*/
	private String emailTitle;
	/**内容*/
	private String content;
	/**邮件类型，1系统邮件，2 具体用户邮件*/
	private int emailType;
	/**具体用户(存角色名)*/
	private List<String> playerNameList = new ArrayList<String>();
	/**已领取获取邮件用户（存ID）*/
	private List<Long> receivePlayerIdList = new ArrayList<>();
	/**邮件奖励*/
	private Map<Integer,Integer> items = new HashMap<Integer,Integer>();
	/**邮件开始时间*/
	private Date startTime;
	/**邮件到期时间*/
	private Date endTime;
	
	
	public long getEmailId() {
		return emailId;
	}
	public void setEmailId(long emailId) {
		this.emailId = emailId;
	}
	public String getEmailTitle() {
		return emailTitle;
	}
	public void setEmailTitle(String emailTitle) {
		this.emailTitle = emailTitle;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getEmailType() {
		return emailType;
	}
	public void setEmailType(int emailType) {
		this.emailType = emailType;
	}
	public List<String> getPlayerNameList() {
		return playerNameList;
	}
	public void setPlayerNameList(List<String> playerNameList) {
		this.playerNameList = playerNameList;
	}
	public List<Long> getReceivePlayerIdList() {
		return receivePlayerIdList;
	}
	public void setReceivePlayerIdList(List<Long> receivePlayerIdList) {
		this.receivePlayerIdList = receivePlayerIdList;
	}
	public Map<Integer, Integer> getItems() {
		return items;
	}
	public void setItems(Map<Integer, Integer> items) {
		this.items = items;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
}
