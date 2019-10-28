package cn.springmvc.model.sys;

import java.util.ArrayList;
import java.util.List;

public class Dictionary {
	private String text;
	private String icon;
	private String parentId;
	private List<Dictionary>  children = new ArrayList<Dictionary>();
	private String state;
	private boolean selected;
	
	private int displayType;
	
	private String englishName;
	
	private String img;
	
	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public int getDisplayType() {
		return displayType;
	}

	public void setDisplayType(int displayType) {
		this.displayType = displayType;
	}

	public String getEnglishName() {
		return englishName;
	}

	public void setEnglishName(String englishName) {
		this.englishName = englishName;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	private boolean  checked;
	
    public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public List<Dictionary> getChildren() {
		return children;
	}

	public void setChildren(List<Dictionary> children) {
		this.children = children;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private Integer id;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.typeid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private Integer typeid;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.typename
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private String typename;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.kindid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private Integer kindid;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.kindname
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private String kindname;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.fid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private Integer fid;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column dictionary.order_id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	private Integer orderId;

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.id
	 * @return  the value of dictionary.id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.id
	 * @param id  the value for dictionary.id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.typeid
	 * @return  the value of dictionary.typeid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public Integer getTypeid() {
		return typeid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.typeid
	 * @param typeid  the value for dictionary.typeid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.typename
	 * @return  the value of dictionary.typename
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public String getTypename() {
		return typename;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.typename
	 * @param typename  the value for dictionary.typename
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setTypename(String typename) {
		this.typename = typename;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.kindid
	 * @return  the value of dictionary.kindid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public Integer getKindid() {
		return kindid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.kindid
	 * @param kindid  the value for dictionary.kindid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setKindid(Integer kindid) {
		this.kindid = kindid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.kindname
	 * @return  the value of dictionary.kindname
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public String getKindname() {
		return kindname;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.kindname
	 * @param kindname  the value for dictionary.kindname
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setKindname(String kindname) {
		this.kindname = kindname;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.fid
	 * @return  the value of dictionary.fid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public Integer getFid() {
		return fid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.fid
	 * @param fid  the value for dictionary.fid
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setFid(Integer fid) {
		this.fid = fid;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column dictionary.order_id
	 * @return  the value of dictionary.order_id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public Integer getOrderId() {
		return orderId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column dictionary.order_id
	 * @param orderId  the value for dictionary.order_id
	 * @mbggenerated  Fri May 12 15:27:43 CST 2017
	 */
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
}