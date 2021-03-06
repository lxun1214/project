package com.rt.db.domain;

import java.util.ArrayList;
import java.util.List;

public class ServerInfoBeanExample {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	protected String orderByClause;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	protected boolean distinct;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	protected List<Criteria> oredCriteria;

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public ServerInfoBeanExample() {
		oredCriteria = new ArrayList<Criteria>();
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public boolean isDistinct() {
		return distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public List<Criteria> getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public Criteria or() {
		Criteria criteria = createCriteriaInternal();
		oredCriteria.add(criteria);
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public void clear() {
		oredCriteria.clear();
		orderByClause = null;
		distinct = false;
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	protected abstract static class GeneratedCriteria {
		protected List<Criterion> criteria;

		protected GeneratedCriteria() {
			super();
			criteria = new ArrayList<Criterion>();
		}

		public boolean isValid() {
			return criteria.size() > 0;
		}

		public List<Criterion> getAllCriteria() {
			return criteria;
		}

		public List<Criterion> getCriteria() {
			return criteria;
		}

		protected void addCriterion(String condition) {
			if (condition == null) {
				throw new RuntimeException("Value for condition cannot be null");
			}
			criteria.add(new Criterion(condition));
		}

		protected void addCriterion(String condition, Object value, String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property + " cannot be null");
			}
			criteria.add(new Criterion(condition, value));
		}

		protected void addCriterion(String condition, Object value1, Object value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property + " cannot be null");
			}
			criteria.add(new Criterion(condition, value1, value2));
		}

		public Criteria andServerIdIsNull() {
			addCriterion("server_id is null");
			return (Criteria) this;
		}

		public Criteria andServerIdIsNotNull() {
			addCriterion("server_id is not null");
			return (Criteria) this;
		}

		public Criteria andServerIdEqualTo(Integer value) {
			addCriterion("server_id =", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdNotEqualTo(Integer value) {
			addCriterion("server_id <>", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdGreaterThan(Integer value) {
			addCriterion("server_id >", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdGreaterThanOrEqualTo(Integer value) {
			addCriterion("server_id >=", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdLessThan(Integer value) {
			addCriterion("server_id <", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdLessThanOrEqualTo(Integer value) {
			addCriterion("server_id <=", value, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdIn(List<Integer> values) {
			addCriterion("server_id in", values, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdNotIn(List<Integer> values) {
			addCriterion("server_id not in", values, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdBetween(Integer value1, Integer value2) {
			addCriterion("server_id between", value1, value2, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerIdNotBetween(Integer value1, Integer value2) {
			addCriterion("server_id not between", value1, value2, "serverId");
			return (Criteria) this;
		}

		public Criteria andServerNameIsNull() {
			addCriterion("server_name is null");
			return (Criteria) this;
		}

		public Criteria andServerNameIsNotNull() {
			addCriterion("server_name is not null");
			return (Criteria) this;
		}

		public Criteria andServerNameEqualTo(String value) {
			addCriterion("server_name =", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameNotEqualTo(String value) {
			addCriterion("server_name <>", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameGreaterThan(String value) {
			addCriterion("server_name >", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameGreaterThanOrEqualTo(String value) {
			addCriterion("server_name >=", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameLessThan(String value) {
			addCriterion("server_name <", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameLessThanOrEqualTo(String value) {
			addCriterion("server_name <=", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameLike(String value) {
			addCriterion("server_name like", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameNotLike(String value) {
			addCriterion("server_name not like", value, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameIn(List<String> values) {
			addCriterion("server_name in", values, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameNotIn(List<String> values) {
			addCriterion("server_name not in", values, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameBetween(String value1, String value2) {
			addCriterion("server_name between", value1, value2, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerNameNotBetween(String value1, String value2) {
			addCriterion("server_name not between", value1, value2, "serverName");
			return (Criteria) this;
		}

		public Criteria andServerIpIsNull() {
			addCriterion("server_ip is null");
			return (Criteria) this;
		}

		public Criteria andServerIpIsNotNull() {
			addCriterion("server_ip is not null");
			return (Criteria) this;
		}

		public Criteria andServerIpEqualTo(String value) {
			addCriterion("server_ip =", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpNotEqualTo(String value) {
			addCriterion("server_ip <>", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpGreaterThan(String value) {
			addCriterion("server_ip >", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpGreaterThanOrEqualTo(String value) {
			addCriterion("server_ip >=", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpLessThan(String value) {
			addCriterion("server_ip <", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpLessThanOrEqualTo(String value) {
			addCriterion("server_ip <=", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpLike(String value) {
			addCriterion("server_ip like", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpNotLike(String value) {
			addCriterion("server_ip not like", value, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpIn(List<String> values) {
			addCriterion("server_ip in", values, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpNotIn(List<String> values) {
			addCriterion("server_ip not in", values, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpBetween(String value1, String value2) {
			addCriterion("server_ip between", value1, value2, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerIpNotBetween(String value1, String value2) {
			addCriterion("server_ip not between", value1, value2, "serverIp");
			return (Criteria) this;
		}

		public Criteria andServerPortIsNull() {
			addCriterion("server_port is null");
			return (Criteria) this;
		}

		public Criteria andServerPortIsNotNull() {
			addCriterion("server_port is not null");
			return (Criteria) this;
		}

		public Criteria andServerPortEqualTo(Integer value) {
			addCriterion("server_port =", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortNotEqualTo(Integer value) {
			addCriterion("server_port <>", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortGreaterThan(Integer value) {
			addCriterion("server_port >", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortGreaterThanOrEqualTo(Integer value) {
			addCriterion("server_port >=", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortLessThan(Integer value) {
			addCriterion("server_port <", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortLessThanOrEqualTo(Integer value) {
			addCriterion("server_port <=", value, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortIn(List<Integer> values) {
			addCriterion("server_port in", values, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortNotIn(List<Integer> values) {
			addCriterion("server_port not in", values, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortBetween(Integer value1, Integer value2) {
			addCriterion("server_port between", value1, value2, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerPortNotBetween(Integer value1, Integer value2) {
			addCriterion("server_port not between", value1, value2, "serverPort");
			return (Criteria) this;
		}

		public Criteria andServerAddressIsNull() {
			addCriterion("server_address is null");
			return (Criteria) this;
		}

		public Criteria andServerAddressIsNotNull() {
			addCriterion("server_address is not null");
			return (Criteria) this;
		}

		public Criteria andServerAddressEqualTo(String value) {
			addCriterion("server_address =", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressNotEqualTo(String value) {
			addCriterion("server_address <>", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressGreaterThan(String value) {
			addCriterion("server_address >", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressGreaterThanOrEqualTo(String value) {
			addCriterion("server_address >=", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressLessThan(String value) {
			addCriterion("server_address <", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressLessThanOrEqualTo(String value) {
			addCriterion("server_address <=", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressLike(String value) {
			addCriterion("server_address like", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressNotLike(String value) {
			addCriterion("server_address not like", value, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressIn(List<String> values) {
			addCriterion("server_address in", values, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressNotIn(List<String> values) {
			addCriterion("server_address not in", values, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressBetween(String value1, String value2) {
			addCriterion("server_address between", value1, value2, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andServerAddressNotBetween(String value1, String value2) {
			addCriterion("server_address not between", value1, value2, "serverAddress");
			return (Criteria) this;
		}

		public Criteria andOpenTimeIsNull() {
			addCriterion("open_time is null");
			return (Criteria) this;
		}

		public Criteria andOpenTimeIsNotNull() {
			addCriterion("open_time is not null");
			return (Criteria) this;
		}

		public Criteria andOpenTimeEqualTo(Long value) {
			addCriterion("open_time =", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeNotEqualTo(Long value) {
			addCriterion("open_time <>", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeGreaterThan(Long value) {
			addCriterion("open_time >", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeGreaterThanOrEqualTo(Long value) {
			addCriterion("open_time >=", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeLessThan(Long value) {
			addCriterion("open_time <", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeLessThanOrEqualTo(Long value) {
			addCriterion("open_time <=", value, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeIn(List<Long> values) {
			addCriterion("open_time in", values, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeNotIn(List<Long> values) {
			addCriterion("open_time not in", values, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeBetween(Long value1, Long value2) {
			addCriterion("open_time between", value1, value2, "openTime");
			return (Criteria) this;
		}

		public Criteria andOpenTimeNotBetween(Long value1, Long value2) {
			addCriterion("open_time not between", value1, value2, "openTime");
			return (Criteria) this;
		}
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table server_list
	 * @mbg.generated  Sat Feb 03 21:00:08 CST 2018
	 */
	public static class Criterion {
		private String condition;
		private Object value;
		private Object secondValue;
		private boolean noValue;
		private boolean singleValue;
		private boolean betweenValue;
		private boolean listValue;
		private String typeHandler;

		public String getCondition() {
			return condition;
		}

		public Object getValue() {
			return value;
		}

		public Object getSecondValue() {
			return secondValue;
		}

		public boolean isNoValue() {
			return noValue;
		}

		public boolean isSingleValue() {
			return singleValue;
		}

		public boolean isBetweenValue() {
			return betweenValue;
		}

		public boolean isListValue() {
			return listValue;
		}

		public String getTypeHandler() {
			return typeHandler;
		}

		protected Criterion(String condition) {
			super();
			this.condition = condition;
			this.typeHandler = null;
			this.noValue = true;
		}

		protected Criterion(String condition, Object value, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.typeHandler = typeHandler;
			if (value instanceof List<?>) {
				this.listValue = true;
			} else {
				this.singleValue = true;
			}
		}

		protected Criterion(String condition, Object value) {
			this(condition, value, null);
		}

		protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.secondValue = secondValue;
			this.typeHandler = typeHandler;
			this.betweenValue = true;
		}

		protected Criterion(String condition, Object value, Object secondValue) {
			this(condition, value, secondValue, null);
		}
	}

	/**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table server_list
     *
     * @mbg.generated do_not_delete_during_merge Sat Feb 03 16:52:11 CST 2018
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }
}