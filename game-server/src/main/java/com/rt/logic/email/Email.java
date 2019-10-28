package com.rt.logic.email;

import java.util.HashMap;
import java.util.Map;

public class Email {

	/**邮件ID*/
	private long emailId;
	
	/**邮件标题*/
	private String emailTitle;
	
	/**邮件内容*/
	private String emailContent;
	
	/**邮件里的物品*/
	private Map<Integer,Integer> items = new HashMap<Integer,Integer>();
	
	/**读取状态*/
	private int readState;
	
	/**邮件物品领取状态*/
	private int itemState;
	
	/**邮件生成时间*/
	private long createTime;
	
	

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

	public String getEmailContent() {
		return emailContent;
	}

	public void setEmailContent(String emailContent) {
		this.emailContent = emailContent;
	}

	public Map<Integer, Integer> getItems() {
		return items;
	}

	public void setItems(Map<Integer, Integer> items) {
		this.items = items;
	}

	public int getReadState() {
		return readState;
	}

	public void setReadState(int readState) {
		this.readState = readState;
	}

	public int getItemState() {
		return itemState;
	}

	public void setItemState(int itemState) {
		this.itemState = itemState;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}
}
