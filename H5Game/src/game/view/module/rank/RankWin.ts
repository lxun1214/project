class RankWin extends BaseEuiView{
	r0:eui.Label;
	cpArr:Array<string>;
	spArr:Array<string>;
	lbs:Array<any>;
	public constructor() {
		super();
		this.skinName = "RankSkin";
		this.dg.itemRenderer = RankRender;
		this.cpArr = [ClientPacket.S_10025,ClientPacket.S_30001,ClientPacket.S_30002,ClientPacket.S_10024];
		this.spArr = [ServerPacket.C_20025,ServerPacket.C_40001,ServerPacket.C_40002,ServerPacket.C_20024];
		this.lbs = [["排名","名字","等级","战力"],["排名","名字","等级","重生"],["排名","名字","vip","战力"],["排名","名字","等级","战力"]];
	}
	currBtn:eui.ToggleButton;
	protected euiCompete():void
	{
		super.euiCompete();
		for(var i:number=0;i<4;i++)
		{
			this["btn"+i].name = i+"";
			this["btn"+i].addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
				if(this.currBtn)
					this.currBtn.selected = false;
				HttpMgr.ins.sendMessage(this.cpArr[parseInt(e.currentTarget.name)],{},ServerPacket.LOGIC_URL,true);
				this.currBtn = e.currentTarget;
				this.currBtn.selected = true;
				var c:Array<string> = this.lbs[parseInt(e.currentTarget.name)];
				for(var j:number=0;j<4;j++)
				{
					this["l"+j].text = c[j];
				}
			},this);
		}
	}

	dg:eui.DataGroup;
	public open(...param: any[]): void{
		super.open();
		for(var j:number=0;j<this.spArr.length;j++)
		{
			this.addEvent(this.spArr[j],DataEventDispatcher.dispatcher,this.upData);
		}
		var d:eui.ToggleButton = this.currBtn?this.currBtn:this["btn0"];
		d.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
	}
	private upData(e:egret.Event):void
	{
		if(this.spArr.indexOf(e.type) + ""==  this.currBtn.name)
		{
			this.dg.dataProvider = new eui.ArrayCollection(e.data.rankingsInfos);
			this.r0.text = "我的排名:" + (e.data.rankings == -1?"未上榜":e.data.rankings);
		}
	}
}
ViewManager.ins().reg(RankWin, LayerManager.UI_MainUI);