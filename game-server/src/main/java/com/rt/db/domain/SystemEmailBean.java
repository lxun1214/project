package com.rt.db.domain;

public class SystemEmailBean {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column system_email.email_id
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    private Long emailId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column system_email.email_value
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    private String emailValue;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column system_email.email_id
     *
     * @return the value of system_email.email_id
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    public Long getEmailId() {
        return emailId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column system_email.email_id
     *
     * @param emailId the value for system_email.email_id
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    public void setEmailId(Long emailId) {
        this.emailId = emailId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column system_email.email_value
     *
     * @return the value of system_email.email_value
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    public String getEmailValue() {
        return emailValue;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column system_email.email_value
     *
     * @param emailValue the value for system_email.email_value
     *
     * @mbggenerated Mon Jul 02 23:17:50 CST 2018
     */
    public void setEmailValue(String emailValue) {
        this.emailValue = emailValue;
    }
}