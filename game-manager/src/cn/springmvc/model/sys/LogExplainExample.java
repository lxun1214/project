package cn.springmvc.model.sys;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LogExplainExample {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	protected String orderByClause;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	protected boolean distinct;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	protected List<Criteria> oredCriteria;

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public LogExplainExample() {
		oredCriteria = new ArrayList<Criteria>();
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public boolean isDistinct() {
		return distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public List<Criteria> getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public Criteria or() {
		Criteria criteria = createCriteriaInternal();
		oredCriteria.add(criteria);
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
	 */
	public void clear() {
		oredCriteria.clear();
		orderByClause = null;
		distinct = false;
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
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

		public Criteria andIdIsNull() {
			addCriterion("id is null");
			return (Criteria) this;
		}

		public Criteria andIdIsNotNull() {
			addCriterion("id is not null");
			return (Criteria) this;
		}

		public Criteria andIdEqualTo(Integer value) {
			addCriterion("id =", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotEqualTo(Integer value) {
			addCriterion("id <>", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdGreaterThan(Integer value) {
			addCriterion("id >", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdGreaterThanOrEqualTo(Integer value) {
			addCriterion("id >=", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdLessThan(Integer value) {
			addCriterion("id <", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdLessThanOrEqualTo(Integer value) {
			addCriterion("id <=", value, "id");
			return (Criteria) this;
		}

		public Criteria andIdIn(List<Integer> values) {
			addCriterion("id in", values, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotIn(List<Integer> values) {
			addCriterion("id not in", values, "id");
			return (Criteria) this;
		}

		public Criteria andIdBetween(Integer value1, Integer value2) {
			addCriterion("id between", value1, value2, "id");
			return (Criteria) this;
		}

		public Criteria andIdNotBetween(Integer value1, Integer value2) {
			addCriterion("id not between", value1, value2, "id");
			return (Criteria) this;
		}

		public Criteria andAdminIdIsNull() {
			addCriterion("admin_id is null");
			return (Criteria) this;
		}

		public Criteria andAdminIdIsNotNull() {
			addCriterion("admin_id is not null");
			return (Criteria) this;
		}

		public Criteria andAdminIdEqualTo(Integer value) {
			addCriterion("admin_id =", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdNotEqualTo(Integer value) {
			addCriterion("admin_id <>", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdGreaterThan(Integer value) {
			addCriterion("admin_id >", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdGreaterThanOrEqualTo(Integer value) {
			addCriterion("admin_id >=", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdLessThan(Integer value) {
			addCriterion("admin_id <", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdLessThanOrEqualTo(Integer value) {
			addCriterion("admin_id <=", value, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdIn(List<Integer> values) {
			addCriterion("admin_id in", values, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdNotIn(List<Integer> values) {
			addCriterion("admin_id not in", values, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdBetween(Integer value1, Integer value2) {
			addCriterion("admin_id between", value1, value2, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminIdNotBetween(Integer value1, Integer value2) {
			addCriterion("admin_id not between", value1, value2, "adminId");
			return (Criteria) this;
		}

		public Criteria andAdminNameIsNull() {
			addCriterion("admin_name is null");
			return (Criteria) this;
		}

		public Criteria andAdminNameIsNotNull() {
			addCriterion("admin_name is not null");
			return (Criteria) this;
		}

		public Criteria andAdminNameEqualTo(String value) {
			addCriterion("admin_name =", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameNotEqualTo(String value) {
			addCriterion("admin_name <>", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameGreaterThan(String value) {
			addCriterion("admin_name >", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameGreaterThanOrEqualTo(String value) {
			addCriterion("admin_name >=", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameLessThan(String value) {
			addCriterion("admin_name <", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameLessThanOrEqualTo(String value) {
			addCriterion("admin_name <=", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameLike(String value) {
			addCriterion("admin_name like", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameNotLike(String value) {
			addCriterion("admin_name not like", value, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameIn(List<String> values) {
			addCriterion("admin_name in", values, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameNotIn(List<String> values) {
			addCriterion("admin_name not in", values, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameBetween(String value1, String value2) {
			addCriterion("admin_name between", value1, value2, "adminName");
			return (Criteria) this;
		}

		public Criteria andAdminNameNotBetween(String value1, String value2) {
			addCriterion("admin_name not between", value1, value2, "adminName");
			return (Criteria) this;
		}

		public Criteria andExplainContentIsNull() {
			addCriterion("explain_content is null");
			return (Criteria) this;
		}

		public Criteria andExplainContentIsNotNull() {
			addCriterion("explain_content is not null");
			return (Criteria) this;
		}

		public Criteria andExplainContentEqualTo(String value) {
			addCriterion("explain_content =", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentNotEqualTo(String value) {
			addCriterion("explain_content <>", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentGreaterThan(String value) {
			addCriterion("explain_content >", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentGreaterThanOrEqualTo(String value) {
			addCriterion("explain_content >=", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentLessThan(String value) {
			addCriterion("explain_content <", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentLessThanOrEqualTo(String value) {
			addCriterion("explain_content <=", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentLike(String value) {
			addCriterion("explain_content like", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentNotLike(String value) {
			addCriterion("explain_content not like", value, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentIn(List<String> values) {
			addCriterion("explain_content in", values, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentNotIn(List<String> values) {
			addCriterion("explain_content not in", values, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentBetween(String value1, String value2) {
			addCriterion("explain_content between", value1, value2, "explainContent");
			return (Criteria) this;
		}

		public Criteria andExplainContentNotBetween(String value1, String value2) {
			addCriterion("explain_content not between", value1, value2, "explainContent");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIsNull() {
			addCriterion("create_time is null");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIsNotNull() {
			addCriterion("create_time is not null");
			return (Criteria) this;
		}

		public Criteria andCreateTimeEqualTo(Date value) {
			addCriterion("create_time =", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotEqualTo(Date value) {
			addCriterion("create_time <>", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeGreaterThan(Date value) {
			addCriterion("create_time >", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
			addCriterion("create_time >=", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeLessThan(Date value) {
			addCriterion("create_time <", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
			addCriterion("create_time <=", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIn(List<Date> values) {
			addCriterion("create_time in", values, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotIn(List<Date> values) {
			addCriterion("create_time not in", values, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeBetween(Date value1, Date value2) {
			addCriterion("create_time between", value1, value2, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
			addCriterion("create_time not between", value1, value2, "createTime");
			return (Criteria) this;
		}
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table log_explain
	 * @mbggenerated  Tue Dec 20 17:36:07 CST 2016
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
     * This class corresponds to the database table log_explain
     *
     * @mbggenerated do_not_delete_during_merge Thu Dec 15 15:31:54 CST 2016
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }
}