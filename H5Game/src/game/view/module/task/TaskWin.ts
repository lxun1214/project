class TaskWin extends BaseEuiView{
	dg0:eui.DataGroup;
	dg1:eui.DataGroup;
	btn1:eui.ToggleButton;
	btn2:eui.ToggleButton;
	vs:eui.ViewStack;

	// bb0:eui.Button;
	// bb1:eui.Button;
	// bb2:eui.Label;

	// static COUNT:number = 5;
	public constructor() {
		super();
		this.skinName = "TaskSkin";
		this.dg0.itemRenderer = TaskRender;
		this.dg1.itemRenderer = TaskRender;
		this.vs.selectedIndex = 0;
		this.btn1.selected = true;
		this.btn2.selected = false;
		// this.total = Math.ceil(RemindMgr.taskArr[1].length/TaskWin.COUNT);
	}

	// dx:number = 1;
	// total:number;
	public open(...param: any[]): void{
		super.open();
		// this.dg.dataProvider = new eui.ArrayCollection(TaskMgr.ins().typeTask[1]);
		this.addTouchEvent(this.btn1,this.tapCall);
		this.addTouchEvent(this.btn2,this.tapCall);
		// this.addTouchEvent(this.bb0,this.tapCall);
		// this.addTouchEvent(this.bb1,this.tapCall);

		this.addEvent(GameEvent.RED_MAIN_TASK,DataEventDispatcher.dispatcher,this.updata);
		this.addEvent(GameEvent.RED_DAY_TASK,DataEventDispatcher.dispatcher,this.updata);
		this.updata();
		// this.dx = 1;
		// this.bb2.text = this.dx + "/" + this.total ;
		UIDmgr.bindingUID(this,uid.rwParent);
	}
	protected updata(t:egret.Event = null):void
	{
		// this.upMainTask();
		this.dg0.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[1]);
		this.dg1.dataProvider = new eui.ArrayCollection(RemindMgr.taskArr[2]);
		ViewManager.redToTarge(this.btn1,RemindMgr.taskGetSatus[1] == true);
		ViewManager.redToTarge(this.btn2,RemindMgr.taskGetSatus[2] == true);
	}
	// private upMainTask():void
	// {
		// var sdx:number = (this.dx - 1)*TaskWin.COUNT;
		// var c:Array<any> = [];
		// for(var i:number = sdx;i<sdx + TaskWin.COUNT;i++)
		// {
		// 	c.push(RemindMgr.taskArr[1][i]);
		// }
	// 	this.dg0.dataProvider = new eui.ArrayCollection(c);
	// }
	private tapCall(e:egret.TouchEvent):void
	{
		switch(e.currentTarget)
		{
			// case this.bb0:
			// 	if(this.dx == 1)
			// 		return;
			// 	this.dx --;
			// 	this.bb2.text = this.dx + "/" + this.total;
			// 	this.upMainTask();
			// 	break;
			// case this.bb1:
			// 	if(this.dx >= this.total)
			// 		return;
			// 	this.dx ++;
			// 	this.bb2.text = this.dx + "/" + this.total;
			// 	this.upMainTask();
			// 	break;
			case this.btn1:
				this.vs.selectedIndex = 0;
				this.btn1.selected = true;
				this.btn2.selected = false;
				break;
			default:
				this.vs.selectedIndex = 1;
				this.btn2.selected = true;
				this.btn1.selected = false;
				break;
		}
	}
}
ViewManager.ins().reg(TaskWin, LayerManager.UI_MainUI);