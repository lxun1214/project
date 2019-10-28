class SystemOpenMgr {
	public constructor() {
	}












	static VIEW_Arr:Array<any> = [null,PVEWin,PVEWin,PVEWin,EmailView,TaskWin,null,ShopWin,PVPWin,ReborthWin,AchievementWin,ArtifactWin,GemWin];
	static checkOpen(cs:any,showTip:boolean=false,dx?:number):boolean
	{
		var type:number;
		if(cs)
			type = SystemOpenMgr.VIEW_Arr.indexOf(cs);
		else
			type = dx;
		if(type == -1)
			return true;
		var c:any = ConfigMgr.gameConfig["unlockFunction"][type + ""];
		if(!c)
			return true;
		if(c.playerLvl > UserVo.ins.rebirthNum
		|| c.vipLvl > UserVo.ins.vipLevel
		|| c["层数"] > UserVo.ins.MAX_POINTS)
		{
			if(showTip)
				UserTips.ins().showTipsBigToSmall(c.lockDesc);
			return false;
		}
		return true;
	}

	static getOpenCondition(cs:any):any
	{
		var type:number = SystemOpenMgr.VIEW_Arr.indexOf(cs);
		return ConfigMgr.gameConfig["unlockFunction"][type + ""];
	}
}