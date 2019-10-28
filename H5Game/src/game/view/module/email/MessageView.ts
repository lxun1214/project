class MessageView extends BaseEuiView{
	static dataList:Array<any> = [
		["玩家名:"],
		["最高关卡层数:"],
		["重生次数:"],
		["战力:"],
		["装备战力:"],
		["宝石战力:"],
		["技能战力:"],
		["成就完成度:"]
	]
	btn0:eui.Button;
	rc:eui.Rect;
	public constructor() {
		super();
		this.skinName = "MessageSkin";
	}
	public open(...param: any[]): void{
		super.open(param);
		var s:string;
		var v:number ;
		var d:string;
		for(var i:number=0;i<MessageView.dataList.length;i++)
		{
			switch(i)
			{
				case 0:
					s = UserVo.ins.playerName;
					break;
				case 1:
					s = UserVo.ins.points + "";
					d = this.getLvl(1,UserVo.ins.points);
					break;
				case 2:
					s = UserVo.ins.rebirthNum + "";
					d = this.getLvl(2,UserVo.ins.rebirthNum);
					break;
				case 3:
					s = UserVo.ins.fightPower + "";
					d = this.getLvl(3,UserVo.ins.fightPower);
					break;
				case 4:
					v = this.getEquipsPower();
					s = v + "";
					d = this.getLvl(4,v);
					break;
				case 5:
					v = this.getEquipsPower(1);
					s = v + "";
					d = this.getLvl(5,v);
					break;
				case 6:
					v = this.skillPower();
					s = v + "";
					d = this.getLvl(6,v);
					break;
				case 7:
					v = this.AchievementProgress();
					s = v + "%";
					d = this.getLvl(7,v);
					break;
			}
			this["l"+i].text = MessageView.dataList[i] + s;

			if(i != 0)
				this["l"+(i+7)].text = d;
		}
		this.addTouchEvent(this.btn0,this.onTap);
		this.addTouchEvent(this.rc,this.onTap);
	}

	private getLvl(id:number,val:number):string
	{
		var obj:any = ConfigMgr.gameConfig["info"][id];
		var s:Array<string> = ["D","C","B","A","S","SS","SSS"];
		for(var i:number=0;i<s.length;i++)
		{
			if(i == s.length -1)
				return s[i];
			else
			{
				if(val >= obj["Class" + s[i]] && val < obj["Class" + s[i+1]])
					return s[i];
			}
		}
	}

	private onTap(e:egret.TouchEvent):void
	{
			ViewManager.ins().close(this);
	}
	private getEquipsPower(t:number=0):number
	{
		var val:number = 0;
		for(var i:number=0;i<UserVo.ins.Columns.length;i++)
		{
			if(t == 0)
			{
				let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
				if(!itemInfo) continue;
				let userEquip = ConfigMgr.gameConfig["equip"][itemInfo.itemId];
				val += userEquip.initialScore + itemInfo.level * userEquip.growScore; 
			}else
			{
				let equipGem = UserVo.ins.Columns[i].gemGrooves.gemGrooves;
				for (let key in equipGem) {
					let info = equipGem[key];
					if(info.gemId > 0)
					{
						var gemcfg:any = ConfigMgr.gameConfig["gemAttr"][info.gemId];
						val += gemcfg.initialScore;
					}
				}
			}
		}
		return val;
	}

	private skillPower():number
	{
		var val:number = 0;
		for(var i:number=0;i<Human.ins.useingSkill.length;i++)
		{
			val += Human.ins.useingSkill[i].stdSkill.initialScore;
		}
		return val;
	}

	private AchievementProgress():number
	{
		var dd:Array<any> = [[],[],[]];
		var a:Array<any> = TaskMgr.ins().typeTask[3];
		var c:Array<any> = UserVo.ins.getTaskInfo(3);
		for(var j:number=0;j<a.length;j++)
		{
			a[j].completeNum = 0;
			a[j].isReceive = 1;
			for(var i:number=0;i<c.length;i++)
			{
				if(a[j].taskId == c[i].taskId)
				{
					a[j].completeNum = c[i].completeNum;//0已领 2 可领  1 未完成
					a[j].isReceive = c[i].isReceive?0:(
						c[i].completeNum >= a[j].taskTime && 
						(a[j].lastTaskId == 0 || AchievementWin.isReceive(a[j].lastTaskId,3))?2:1);
					break;
				}
			}
			dd[a[j].isReceive].push(a[j]);
		}
		return Math.floor((1 - (dd[1].length/a.length))*100);
	}
}
ViewManager.ins().reg(MessageView,LayerManager.UI_Popup)