class ActivityWin extends BaseEuiView{

	public tabBar:eui.Group;
	public viewStack:eui.Group;
	public continueLogin : ContinueLogin;
	public stageAward : StageAward;
	public investPlan : InvestPlan;
	public consumeGift : ConsumeGift;

	public constructor() {
		super();
		this.skinName = "ActivitySkin";		
	}
	public open(...param: any[]): void{
		super.open(param);
		this.checkRed();
		this.addEvent(GameEvent.RED_ACTIVETY,DataEventDispatcher.dispatcher,this.checkRed);
	}

	private checkRed():void
	{
		var a:BaseActivityPanel;
		for(var i:number=0;i<4;i++)
		{
			a = this.viewStack.getChildAt(i) as BaseActivityPanel;
			ViewManager.redToTarge(this.tabBar.getChildAt(i),RemindMgr.activetyAwards[a.activetyID + ""].length);
		}
	}

	public createChildren(): void{
		super.createChildren();
		var btn:eui.ToggleButton;
		for(var i:number=0;i<this.tabBar.numChildren;i++)
		{
			btn = this.tabBar.getChildAt(i) as eui.ToggleButton;
			btn.name = i + ""
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
					this.switchPage(e,parseInt(e.currentTarget.name));
			},this);
			if(i==0)
				btn.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
		}
	}


	public switchPage(e:egret.TouchEvent,idx:number): void{
		this.viewStack.$children.forEach((e,i)=>{
			e.visible = i == idx;
		});

		this.tabBar.$children.forEach((e,i)=>{
			let btn:eui.ToggleButton = <eui.ToggleButton>e;
			btn.currentState = i == idx?"down":"up";
		})
	}



}
ViewManager.ins().reg(ActivityWin, LayerManager.UI_MainUI);
