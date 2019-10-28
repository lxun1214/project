class ErrorMgr extends BaseClass{
	public constructor() {
		super();
		this.ErrorCode = [];
		this.ErrorCode[0] = "系统错误!";
		this.ErrorCode[1] = "角色不存在";
		this.ErrorCode[2] = "角色名称长度应为1-8";
		this.ErrorCode[3] = "角色名称含有特殊字符";
		this.ErrorCode[4] = "角色名称包含屏蔽字";
		this.ErrorCode[5] = "已经有角色了不可以再创建了";
		
		this.ErrorCode[7] = "登陆游戏token异常";
		this.ErrorCode[8] = "登陆游戏token超时了";

		this.ErrorCode[10] = "名字已存在";
		this.ErrorCode[11] = "重生次数不足";
		this.ErrorCode[12] = "竞技场次数不足";
		this.ErrorCode[13] = "自己正在战斗中";
		this.ErrorCode[14] = "对方正在战斗中";
		this.ErrorCode[15] = "对方不存在";
		this.ErrorCode[16] = "奖励不存在";
		this.ErrorCode[17] = "任务没达成，不能领取奖励";
		this.ErrorCode[18] = "已领取过奖励";
		this.ErrorCode[19] = "无法领取";
		this.ErrorCode[20] = "已领取过月卡奖励";
		this.ErrorCode[21] = "没有月卡信息";
		this.ErrorCode[22] = "激活码无效";
		this.ErrorCode[23] = "激活码有效时间已过";
		this.ErrorCode[24] = "同组激活码只能使用一次";
		this.ErrorCode[25] = "激活码已使用过";
		this.ErrorCode[26] = "投资计划已购买过，无法购买";
	}
	public static ins(...args:any[]):ErrorMgr{
		return super.ins(args) as ErrorMgr;
	}
	private ErrorCode:Array<string>;

	public showError(dx:number=-1,s:string=""):void
	{
		if(dx != -1)
			s = this.ErrorCode[dx];
		UserTips.ins().showTipsBigToSmall(s);
	}
}