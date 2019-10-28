package cn.springmvc.model.poster;

import java.util.Date;

public class PosterInfor {
	
	private Integer pageNo;
	
	private Integer pageSize;
	
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
     * This field corresponds to the database column poster_infor.infor_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Long inforId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.category_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Integer categoryId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.user_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Long userId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.account
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String account;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.phone
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String phone;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.images
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String images;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.address
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String address;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.browse_num
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Integer browseNum;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.create_date
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Date createDate;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.launch_type
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Integer launchType;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.launch_data
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String launchData;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.address_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private Integer addressId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.category_name
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String categoryName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column poster_infor.content
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    private String content;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.infor_id
     *
     * @return the value of poster_infor.infor_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Long getInforId() {
        return inforId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.infor_id
     *
     * @param inforId the value for poster_infor.infor_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setInforId(Long inforId) {
        this.inforId = inforId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.category_id
     *
     * @return the value of poster_infor.category_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Integer getCategoryId() {
        return categoryId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.category_id
     *
     * @param categoryId the value for poster_infor.category_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.user_id
     *
     * @return the value of poster_infor.user_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.user_id
     *
     * @param userId the value for poster_infor.user_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.account
     *
     * @return the value of poster_infor.account
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getAccount() {
        return account;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.account
     *
     * @param account the value for poster_infor.account
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setAccount(String account) {
        this.account = account;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.phone
     *
     * @return the value of poster_infor.phone
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getPhone() {
        return phone;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.phone
     *
     * @param phone the value for poster_infor.phone
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.images
     *
     * @return the value of poster_infor.images
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getImages() {
        return images;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.images
     *
     * @param images the value for poster_infor.images
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setImages(String images) {
        this.images = images;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.address
     *
     * @return the value of poster_infor.address
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getAddress() {
        return address;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.address
     *
     * @param address the value for poster_infor.address
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.browse_num
     *
     * @return the value of poster_infor.browse_num
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Integer getBrowseNum() {
        return browseNum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.browse_num
     *
     * @param browseNum the value for poster_infor.browse_num
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setBrowseNum(Integer browseNum) {
        this.browseNum = browseNum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.create_date
     *
     * @return the value of poster_infor.create_date
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Date getCreateDate() {
        return createDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.create_date
     *
     * @param createDate the value for poster_infor.create_date
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.launch_type
     *
     * @return the value of poster_infor.launch_type
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Integer getLaunchType() {
        return launchType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.launch_type
     *
     * @param launchType the value for poster_infor.launch_type
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setLaunchType(Integer launchType) {
        this.launchType = launchType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.launch_data
     *
     * @return the value of poster_infor.launch_data
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getLaunchData() {
        return launchData;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.launch_data
     *
     * @param launchData the value for poster_infor.launch_data
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setLaunchData(String launchData) {
        this.launchData = launchData;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.address_id
     *
     * @return the value of poster_infor.address_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public Integer getAddressId() {
        return addressId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.address_id
     *
     * @param addressId the value for poster_infor.address_id
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.category_name
     *
     * @return the value of poster_infor.category_name
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getCategoryName() {
        return categoryName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.category_name
     *
     * @param categoryName the value for poster_infor.category_name
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column poster_infor.content
     *
     * @return the value of poster_infor.content
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public String getContent() {
        return content;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column poster_infor.content
     *
     * @param content the value for poster_infor.content
     *
     * @mbggenerated Tue Jun 26 21:04:18 CST 2018
     */
    public void setContent(String content) {
        this.content = content;
    }
}