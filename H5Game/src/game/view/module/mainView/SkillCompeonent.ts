class SkillCompeonent extends eui.Component{
	icon:eui.Image;
	_shape:egret.Shape;
	// _shapeII:egret.Shape;
	sname:eui.Label;
	public constructor() {
		super();
		this.skinName = "SkillCompeonentSkin";
		// DataEventDispatcher.dispatcher.addEventListener(SkillVo.SKILL_DOWN_CD,this.UpCd,this);
		var shape: egret.Shape = this._shape = new egret.Shape();
        // shape.x = 54;
        // shape.y = 54;
        this.addChildAt(shape,3);

		// this._shapeII = new egret.Shape();
		// this._shapeII.graphics.beginFill(0x0,0.5);
		// this._shapeII.graphics.drawRect(0,0,102,102);
		// this._shapeII.graphics.endFill();
		// this._shapeII.visible = false;
        // this.addChildAt(this._shapeII,5);
		this.myTime = new egret.Timer(200);
		this.myTime.addEventListener(egret.TimerEvent.TIMER,this.downCD,this);

		// DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,this.upSkill,this);
	}
	myTime:egret.Timer;
	radiu:number = 51;
 	private changeGraphics(angle:number):void {
		 var shape: egret.Shape = this._shape;
            shape.graphics.clear();

            shape.graphics.beginFill(0x0, 0.5);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(this.radiu, 0);
            shape.graphics.drawArc(0, 0, this.radiu, 0, angle * Math.PI / 180,true);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
    }
	// private upSkill():void
	// {
	// 	// if(this.vo)
	// 	// 	this.setData(this.vo);
	// }

	private vo:SkillVo;
	private w1:eui.Image;
	// private w2:eui.Image;
	// private w3:eui.Image;
	private cd:eui.Label;
	private isMaxSkill:boolean = false;
	private suo:eui.Image;
	// rc:eui.Rect;
	private ss:boolean;
	public setData(v:SkillVo,)
	{
		this.vo = v;
		if((v.level == 0 )||!v)
		{
			this.suo.visible = true;
			//this.rc.visible = false;
			this.icon.source = !v?null:(this.openCD?null:ResMgr.skillIcon(v.stdSkill.skillIcon));
			// this.w1.visible  = false;
			this.sname.text = "";
			//大招需要显示背景
			if(v)
				this.isMaxSkill = SkillMgr.ins.isMaxSkill(this.vo);
			// if(SkillMgr.ins.isMaxSkill(this.vo) && this.openCD)
			// 	this.w1.visible = true;
		}
		else
		{
			/*this.rc.visible = */this.suo.visible = false;
			this.icon.source = ResMgr.skillIcon(v.stdSkill.skillIcon);
			if(this.openCD)
			{
				this.isMaxSkill = SkillMgr.ins.isMaxSkill(this.vo);
				if(this.isMaxSkill)
				{
					// this.w1.visible =  true;
					// this.cd.visible = false;
					this.sname.text = v.stdSkill.name;
				}else
				{
					// this.w1.visible =  false;
					this.sname.text = v.stdSkill.name;
				}
				if(!this.vo.canUse)
					this.UpCd(null);
			}else
			{
				// this.w1.visible =  false;
				this.sname.text = "";
				this.suo.visible = v.level == 0;
				/*this.rc.visible = */this.suo.visible;
			}
		}
		this.w1.source = this.isMaxSkill?"ww1":"ww2";
		if(this.isMaxSkill)
		{
			this.icon.scaleX = this.icon.scaleY = 1.2;
//			this._shape.scaleX = this._shape.scaleY = 1.2;
			this.icon.verticalCenter = -5;
			this.icon.horizontalCenter = -1;
			this._shape.x = 87;
        	this._shape.y = 65;
		}else
		{
			this._shape.x = 56;
        	this._shape.y = 58;
		}
	}
	private UpCd(e:egret.Event):void
	{
		if(!e || e.data == this.vo)
		{
			if(this.isMaxSkill)
			{
				// this.w3.mask = this._shape;
				this.radiu = 54;
			}
			else
			{
				// this.w3.mask = null;
				this.radiu = 44.5;
				// this._shapeII.visible = true;
				// this._shape.mask = this._shapeII;
			}
			this.myTime.stop();
			this.downCD();
			this.myTime.reset();
			this.myTime.start();
		}
	}

	private downCD():void
	{
		if(this.vo)
		{
			if(this.vo.canUse)
			{
				// this._shapeII.visible = false;
				this.changeGraphics(0);
				// this.w3.mask = null;
				this._shape.mask = null;
				this.cd.text = "";
				this.myTime.stop();
			}
			else
			{
				var d:number = this.vo._currentCD - GameLogic.ins.gameRunTick;
				this.cd.text = Math.floor(d/100)+  "";
				// if(!this.isMaxSkill)
					this.changeGraphics((this.vo.stdSkill.CD-d) / this.vo.stdSkill.CD * 360);
				// else
					// this.changeGraphics(d / this.vo.stdSkill.CD * 360);
			}
		}
	}

	public get data():SkillVo
	{
		return this.vo;
	}

	public get canClick():boolean
	{
		if(!this.vo)
			return false;
		return this.vo.level != 0;
	}

	private openCD:boolean = false;
	public set monitorCD(val:boolean)
	{
		this.openCD = val;
		if(val)
			DataEventDispatcher.dispatcher.addEventListener(SkillVo.SKILL_DOWN_CD,this.UpCd,this);
		else
			DataEventDispatcher.dispatcher.removeEventListener(SkillVo.SKILL_DOWN_CD,this.UpCd,this);	
	} 
}