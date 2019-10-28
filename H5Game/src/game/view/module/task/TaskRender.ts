class TaskRender extends eui.ItemRenderer{
	btn:eui.Button;//未达标
	// btn0:eui.Button;//已领取
	btn1:eui.Button;//领取
	l1:eui.Label;
	l2:eui.Label;
	l0:eui.Label;
	items:BaseItem;
	public constructor() {
			super();
			this.skinName = "AchieveRenderSkin";
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
					HttpMgr.ins.sendMessage(ClientPacket.S_10027,{taskId:this.data.taskId},ServerPacket.LOGIC_URL,true);
			},this);
			this.items.labName.visible = false;
	}
	g0:eui.Group;
	public dataChanged():void
	{
		super.dataChanged();
		while(this.g0.numChildren)
		{
			this.g0.removeChildAt(0);
		}
		this.l1.text = this.data.taskTarget;
		var s:Array<any> = this.getitems();
		// this.l2.text = s[1];
		this.items.data = s[0];
		if(this.data.isReceive == 0)//已领取
		{
			this.btn1.label = "已领取";
			this.btn1.visible = true;
			this.btn.visible = this.btn1.enabled = false;
		}else if(this.data.isReceive == 2)//领取
		{
			this.btn.visible = false;
			this.btn1.label = "领取奖励";
			this.btn1.enabled = this.btn1.visible = true;
		}else{
			this.btn1.enabled = this.btn1.visible = false;
			this.btn.visible = true;
		}
		if(this.itemIndex == 0)
		{
			if(this.data.taskType == 1)
				UIDmgr.bindingUID(this.btn1,uid.rw1);
			else
				UIDmgr.bindingUID(this.btn1,uid.cj1);
		}
		this.l0.text = this.data.name;	
	}

	private getitems():Array<any>
	{
		var s:string = "奖励:";
		var a:Array<string> = (<string>this.data.awardGoods).split("#");
		var l:Array<string>;
		var oj:any;
		var vo:ItemInfo;
		if(a && this.data.awardGoods != "")
		{

			while(a.length)
			{
				l = a.shift().split(":");
				s += BagVo.ins().getItem(parseInt(l[0])).name;
				s += "X";
				s += l[1]?l[1]:1;
				s += "  ";
				if(!vo)
				{
					vo = new ItemInfo();
					vo.itemId = parseInt(l[0]);
					vo.itemNum = l[1]?parseInt(l[1]):1;
				}
			}
		}
		a = (<string>this.data.awardCurrency).split("#");
		if(a && this.data.awardCurrency != "")
		{

			var awardRender:AwardShow;
			while(a.length)
			{
				l = a.shift().split(":");
				awardRender = new AwardShow();
				awardRender.data = [l[0],l[1]?parseInt(l[1]):1];
				this.g0.addChild(awardRender);
				// s += MoneyUtils.getMoneyName(l[0])
				// s += "X";
				// s += l[1]?l[1]:1;
				// s += "  ";
				if(!vo)
				{
					vo = new ItemInfo();
					vo.moneyType = l[0];
					vo.itemNum = 0;
				}
			}
		}
		return [vo,s];
	}
}