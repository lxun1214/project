class CreateRole extends eui.Component implements IDispose{
	private b1:eui.Button;
	private b2:eui.Button;
	private b3:eui.Button;
	private b4:eui.Button;
	private b5:eui.Button;
	private b6:eui.ToggleButton;
	private b7:eui.ToggleButton;
	private job:number;
	private t1:eui.TextInput;
	public constructor() {
			super();
		this.skinName = "createRoleSkin";
		this.horizontalCenter = 0;
		for(var i:number=1;i<=7;i++)
		{
			this["b" + i].name = i + "";
			this["b" + i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		}
		var obj:Array<any> = ConfigMgr.gameConfig["surnametype"][0];
		this.name1 = obj["surname"].split("\n");
		this.name2 = obj["name"].split("\n");
		this.randomJob();
		this.randomName();
	}

	private randomJob():void
	{
		this.b2.touchEnabled = this.b3.touchEnabled = false;
		this.job = 1//Math.floor(Math.random()*3) + 1;
		this.role.source = ResMgr.getGameOtherPng("h_"+this.job);
		this.sex = Math.floor(Math.random()*2) + 1;
	}

	private name1:Array<string>;
	private name2:Array<string>;
	private randomName():void
	{
		var s:string;
		s = this.name1[Math.floor(Math.random()*this.name1.length)];
		s += this.name2[Math.floor(Math.random()*this.name1.length)];
		this.t1.text = s;
	}
	role:eui.Image;
	private onClick(e:egret.TouchEvent):void
	{
		var n:number = parseInt(e.target.name);
		switch(n)
		{
			case 1:
			case 2:
			case 3:
				this.job = n;
				this.role.source = ResMgr.getGameOtherPng("h_"+n);
				break;
			case 4:
				if(this.t1.text == "")
				{
					UserTips.ins().showTipsBigToSmall("请输入名字!");
					return;
				}
				var data:Object = {
            		playerName:this.t1.text,
            		jobId:this.job,
					sex:this.sex
        		}
				HttpMgr.ins.sendMessage(ClientPacket.S_10002,data,ServerPacket.LOGIC_URL);
				break;
			case 5:
				this.randomName();
				break;
			case 6:
				this.sex = 1;
				break;
			case 7:
				this.sex = 2;
				break;
		}
	}

	
	private _sex : number;
	public get sex() : number {
		return this._sex;
	}
	public set sex(v : number) {
		this._sex = v;
		this.b6.selected = v == 1;
		this.b7.selected = v != 1;
		this.role.source = "h_" + v + "_png"
	}
	
	public dispose():void
	{
		if(this.parent)
			this.parent.removeChild(this);
		for(var i:number=1;i<=5;i++)
		{
			this["b" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		}
	}
}