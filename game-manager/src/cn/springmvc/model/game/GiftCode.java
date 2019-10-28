package cn.springmvc.model.game;

import java.util.Date;

public class GiftCode {
	
	private String starTime_1;
	
	private String endTime_1;

    private Integer pageNo;
	
	private Integer pageSize;
	
    public String getStarTime_1() {
		return starTime_1;
	}

	public void setStarTime_1(String starTime_1) {
		this.starTime_1 = starTime_1;
	}

	public String getEndTime_1() {
		return endTime_1;
	}

	public void setEndTime_1(String endTime_1) {
		this.endTime_1 = endTime_1;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.gift_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private String giftName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.gift_type
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Integer giftType;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.item_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private String itemId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.code_count
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Integer codeCount;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.star_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Date starTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.end_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Date endTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.create_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.admin_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Integer adminId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.admin_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private String adminName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.server_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private String serverId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.server_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private String serverName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gift_code.download_last_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    private Integer downloadLastTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.id
     *
     * @return the value of gift_code.id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.id
     *
     * @param id the value for gift_code.id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.gift_name
     *
     * @return the value of gift_code.gift_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public String getGiftName() {
        return giftName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.gift_name
     *
     * @param giftName the value for gift_code.gift_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setGiftName(String giftName) {
        this.giftName = giftName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.gift_type
     *
     * @return the value of gift_code.gift_type
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Integer getGiftType() {
        return giftType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.gift_type
     *
     * @param giftType the value for gift_code.gift_type
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setGiftType(Integer giftType) {
        this.giftType = giftType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.item_id
     *
     * @return the value of gift_code.item_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public String getItemId() {
        return itemId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.item_id
     *
     * @param itemId the value for gift_code.item_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.code_count
     *
     * @return the value of gift_code.code_count
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Integer getCodeCount() {
        return codeCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.code_count
     *
     * @param codeCount the value for gift_code.code_count
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setCodeCount(Integer codeCount) {
        this.codeCount = codeCount;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.star_time
     *
     * @return the value of gift_code.star_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Date getStarTime() {
        return starTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.star_time
     *
     * @param starTime the value for gift_code.star_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setStarTime(Date starTime) {
        this.starTime = starTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.end_time
     *
     * @return the value of gift_code.end_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Date getEndTime() {
        return endTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.end_time
     *
     * @param endTime the value for gift_code.end_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.create_time
     *
     * @return the value of gift_code.create_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.create_time
     *
     * @param createTime the value for gift_code.create_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.admin_id
     *
     * @return the value of gift_code.admin_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Integer getAdminId() {
        return adminId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.admin_id
     *
     * @param adminId the value for gift_code.admin_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.admin_name
     *
     * @return the value of gift_code.admin_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public String getAdminName() {
        return adminName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.admin_name
     *
     * @param adminName the value for gift_code.admin_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.server_id
     *
     * @return the value of gift_code.server_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public String getServerId() {
        return serverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.server_id
     *
     * @param serverId the value for gift_code.server_id
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setServerId(String serverId) {
        this.serverId = serverId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.server_name
     *
     * @return the value of gift_code.server_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public String getServerName() {
        return serverName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.server_name
     *
     * @param serverName the value for gift_code.server_name
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gift_code.download_last_time
     *
     * @return the value of gift_code.download_last_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public Integer getDownloadLastTime() {
        return downloadLastTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gift_code.download_last_time
     *
     * @param downloadLastTime the value for gift_code.download_last_time
     *
     * @mbggenerated Tue Jul 24 18:11:40 CST 2018
     */
    public void setDownloadLastTime(Integer downloadLastTime) {
        this.downloadLastTime = downloadLastTime;
    }
}