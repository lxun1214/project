// TypeScript file
class InvestPlan extends BaseActivityPanel{
	public getBtn:eui.Button;
	public constructor() {
		super();
		this.skinName = "InvestPlanSkin";
	}

		public createChildren(): void{
		super.createChildren();
		this.activetyID = ActivetyMgr.INVEST_PLAN;

      let actdata = UserVo.ins.activityInfos.filter((e)=>{
          return e.activityId == "1004";
      });

     if(UserVo.ins.purchaseInvestment == 0){
       this.getBtn.enabled = true;

     } else{
        this.getBtn.enabled = false;
       
     }

     DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20046,(e)=>{
			console.log('----ServerPacket.C_20046----',e.data);
        if(e.data.code == 0){
           this.getBtn.enabled = false;
         }
		},this);

	  //购买投资计划
     this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
        if(UserVo.ins.diamond < 500){
          	ViewManager.ins().open(TipsWin,"确定","钻石不足，请充值","提示","",()=>{},null,this)
        }
         HttpMgr.ins.sendMessage(ClientPacket.S_10046,{},ServerPacket.LOGIC_URL,true);
		},this);
	}


	// public dataChanged(activityIndex,isReward):void{
	// 		var tabItem:ActivityItem = <ActivityItem>this.dg.$children[activityIndex-1];
	// 		tabItem.upStatus(isReward);
	// }
}