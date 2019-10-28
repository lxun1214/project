class PProgress extends eui.Component{
	public constructor() {
			super();
			// this.skinName = "PProgressSkin";
	}

	public createChildren():void
	{
		super.createChildren();
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONSTER_COUNT_CHANGE,this.challengeStatus,this);
		DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE,()=>{
			var obj:any = ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""];
			this.pp = UserVo.ins.points % 3 == 2;
			var b:number = UserVo.ins.points - (this.pp?1:0);
			this.l0000.text = b + "";
			this.l1111.text = (b + 1 ) + "";
		},this);
	}
	l0000:eui.Label;
	l1111:eui.Label;
	hp:eui.ProgressBar;
	pp:boolean = false;
	private challengeStatus(e:egret.Event):void
	{
		//-2  隐藏按钮  判断进度条显示
		if(e.data == -2)
		{
			// this.challenge.visible = false;
			this.hp.value = 0;
			// this.pro.visible = GameMap.ins().onHookMap;
		}
		else if(e.data == -1)
		{
			// this.challenge.visible = true;
		}else
		{
			this.pp = UserVo.ins.points % 3 == 2;
			var val:number = e.data / GameLogic.SKILL_MONSTER_COUNT;
			val = val > 1?1:val;
			val *= 0.5;
			val += this.pp?0.5:0;
			// this.proTxt.text = Math.floor(val * 100) + "%";
			this.hp.value = val*100;
		}
	}
}