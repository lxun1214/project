class PVPRender extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(!this.vo)
				return UserTips.ins().showTipsBigToSmall("无数据信息,无法挑战!");
			if(!GameMap.ins().onHookMap)
				return UserTips.ins().showTipsBigToSmall("非挂机地图,无法挑战!");
			if(UserVo.ins.challengeNum != 0)
			{
				ViewManager.ins().close(UIView);
				ViewManager.ins().close(PVPWin);
				HttpMgr.ins.sendMessage(ClientPacket.S_10022,{otherPlayerId:this.vo.otherPlayerId},ServerPacket.LOGIC_URL,true);
			}else 
			{
				   var a:Array<any> = PVPMgr.ins().buyCount;
				   ViewManager.ins().open(TipsWin,"确定","是否花费" + a[0] + "购买挑战一次数!","提示","取消",()=>{
					   	 if(a[1])
        				 	HttpMgr.ins.sendMessage(ClientPacket.S_10021,{otherPlayerId:this.vo.otherPlayerId},ServerPacket.LOGIC_URL,true);
						  else
						  	UserTips.ins().showTipsBigToSmall(MoneyUtils.getMoneyName(MoneyUtils.M_3) + "不足,无法购买!");
					},null,this)
			}
		},this);
	}
	rname:eui.Label;
	power:eui.Label;
	rank:eui.Label;
	icon:eui.Image;
	role:eui.Image;
	eff:eui.Image;
	vo:any;
	public set data(val:any)
	{
		this.vo = val;
		if(!val)
		{
			this.rname.text = this.power.text = this.rank.text = "";
			this.eff.source = this.icon.source = this.role.source = null;
			this.role.source = null;
		}else
		{
			this.rname.text = val.otherPlayerName;
			this.power.text = "战斗力" + val.otherFightPower;
			this.rank.text = "第" + val.otherRankings + "名";
			this.role.source = "h_" + val.sex + "_png";
			this.icon.source = val.otherRankings <4?"pvp0"+(4+val.otherRankings):null;
			this.eff.source = val.otherRankings <4?"pvp"+(9+val.otherRankings):null;
			// this.icon.source = null;
		}
	}
}