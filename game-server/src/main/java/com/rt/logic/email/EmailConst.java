package com.rt.logic.email;

public class EmailConst {

	/**策划定的最多保存20封邮件，超出的不予考虑，（包含已领取，但未删除的邮件）。*/
	public static final int emailMaxSize = 20;
	
	/**20天*/
	public static final int delTime = 1000 * 60 * 60 * 24 * 20;
	
	/**所有用户邮件*/
	public static final int ALL_EMAIL = 1;
	/**具体用户邮件*/
	public static final int PALERY_LIMIT = 2;
}
