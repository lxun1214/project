/**
 * 角色界面
 */
class PlayerWin extends BaseEuiView{
	public btnForge:eui.Button;
	public btnGem:eui.Button;
	public btnArtifact:eui.Button;
	public equipGrp:eui.Group;
	public equip0:PlayerEquipItem;
	public equip1:PlayerEquipItem;
	public equip2:PlayerEquipItem;
	public equip3:PlayerEquipItem;
	public heroImg:eui.Image;
	public labTypes:eui.Label;
	f:eui.BitmapLabel;
	private static HERO_TYPE:string[] = ["attackInit","armorInit","magicAttack","magicArmorInit","critRate","critDamage","blood"];
	dg:eui.DataGroup;
	role:eui.Image;
	public constructor() {
		super();
		this.skinName = "PlayerSkin";
	}
	public createChildren(): void{
		super.createChildren();
		this.dg.itemRenderer = PropertyRender;
		this.role.source = "h_" + UserVo.ins.sex + "_png";
	}
	public open(...param: any[]): void{
		super.open(param);
		this.update();
		for(let i = 0; i < UserVo.ins.Columns.length; i++){
			this.addTouchEvent(this["equip"+i] , this.onEquip);
			this["equip"+i].name = i + "";
		}
		this.addTouchEvent(this.labTypes, this.onTap);
		this.addTouchEvent(this.btnGem, this.onTap);
		this.addTouchEvent(this.btnForge, this.onTap);
		this.addTouchEvent(this.btnArtifact, this.onTap);

		this.addEvent(GameEvent.UPDATE_PLAYER_WIN,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UPDATE_BAG_DATA,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UP_STRENGTH,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UP_ADVANCE,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UPDATE_ARTIFACT_WIN,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UPDATE_GEM_DATA,DataEventDispatcher.dispatcher,this.update);
		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.level,DataEventDispatcher.dispatcher,this.update);

		this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.fightPower,DataEventDispatcher.dispatcher,this.upPower);
		UIDmgr.bindingUID(this.btnForge,uid.forgeBtn0);
		UIDmgr.bindingUID(this.btnArtifact,uid.af0);
		UIDmgr.bindingUID(this.btnGem,uid.bs0);
		this.upPower();
		// var c:clips.BmpClip = ModelResMgr.getOtherEffect(2022);
		// c.play(-1);
		// this["g0"].addChild(c);

		this.addEvent(GameEvent.RED_ARTIFACE,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_STRENG,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_EQUIP_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_GEM_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_GEM_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.upRed(null);
	}
	private upPower():void
	{
		this.f.text = UserVo.ins.fightPower + "";
	}

	private upRed(e:egret.Event):void
	{
		if(!e|| e.type == GameEvent.RED_ARTIFACE)
			ViewManager.redToTarge(this.btnArtifact,(RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1));
		if(!e|| e.type == GameEvent.RED_STRENG || GameEvent.RED_EQUIP_LVL)
				ViewManager.redToTarge(this.btnForge,(RemindMgr.StrengEquips.length > 0) || (RemindMgr.upEquipsLvl.length > 0));
		if(!e|| e.type == GameEvent.RED_GEM_LVL)
				ViewManager.redToTarge(this.btnGem,(RemindMgr.GEM));
	}

	public close(...param: any[]): void{
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_PLAYER_WIN,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_STRENGTH,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_ADVANCE,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_ARTIFACT_WIN,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_GEM_DATA,this.update,this);
		DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level,this.update,this);
	}
	private update(): void{
		if(!UserVo.ins.Columns)return;
		for(let i = 0; i < UserVo.ins.Columns.length; i++){
			let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
			this["equip"+i].data = itemInfo?itemInfo:null;
		}
		
		var a:Array<any> = []
		for(let j = 0; j < 12; j++){
			if(!PlayerWin.HERO_TYPE[j])
				continue;
			else
			{
				a.push([ConfigMgr.gameConfig["attributeName"][PlayerWin.HERO_TYPE[j]].value,Math.floor(UserVo.ins.playerAttrInfo[PlayerWin.HERO_TYPE[j]])]);
			}
		}
		this.dg.dataProvider = new eui.ArrayCollection(a);
	}
	private onTap(e: egret.TouchEvent): void{
		let uiView: UIView = ViewManager.ins().getView(UIView) as UIView;
		switch(e.currentTarget){
			case this.labTypes:
				ViewManager.ins().open(PlayerTypesView);
				break;
			case this.btnForge:
				ViewManager.ins().open(ForgeWin);
				break;
			case this.btnGem:
				ViewManager.ins().open(GemWin);
				break;
			case this.btnArtifact:
				ViewManager.ins().open(ArtifactWin);
				break;
		}
	}
	private onEquip(e: egret.TouchEvent): void{
		let equip:PlayerEquipItem = e.currentTarget;
		let index: number = parseInt(equip.name);
		// if(!equip.data){
			ViewManager.ins().open(PlayerEquipReplaceView,equip.data,index);
		// }else{
		// 	ViewManager.ins().open(PlayerEquipReplaceView,equip.data,index);
		// }
	}
}
ViewManager.ins().reg(PlayerWin, LayerManager.UI_MainUI);