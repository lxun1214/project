/**
 * 主页面
 */
class UIView extends BaseEuiView{
	private roleBtn:eui.ToggleButton;
	private bagBtn:eui.ToggleButton;
	private gemBtn:eui.ToggleButton;
	private skillBtn:eui.ToggleButton;

	public riskBtn:eui.ToggleButton;
	public achieveBtn:eui.ToggleButton;
	g0:eui.Group;

	private btnGroup:eui.Group;
	private roleGroup:eui.Group;
	private mailBtn:eui.Button;
	private rankBtn:eui.Button;
	private taskBtn:eui.Button;
	private shopBtn:eui.Button;
	private noticeBtn:eui.Button;
	private newsBtn:eui.Button;
	private arenaBtn:eui.Button;
	private copyBtn:eui.Button;



	private navBtn: eui.ToggleButton[];
	private viewAr: any[];
	pro:PProgress;
	private colorFlilter:egret.ColorMatrixFilter;

	public constructor() {
		super();
		this.skinName = "UIViewSkin";
		this.touchEnabled = false;
	}
	public createChildren(): void{
		super.createChildren();
	}
	public open(...param:any[]):void{
		// this.riskBtn.currentState = "up";
		this.navBtn = [this.roleBtn,this.bagBtn,this.riskBtn,this.skillBtn,this.achieveBtn];
		this.viewAr = [PlayerWin,BagWin,null,SkillWin,AchievementWin];
		for(let i = 0; i < this.navBtn.length; i++){
			this.addTouchEvent(this.navBtn[i], this.onClick);
		}

		this.addTouchEvent(this.arenaBtn, this.onOpenBtn);
		this.addTouchEvent(this.copyBtn, this.onOpenBtn);
		this.addTouchEvent(this.mailBtn, this.onOpenBtn);
		this.addTouchEvent(this.rankBtn, this.onOpenBtn);
		this.addTouchEvent(this.taskBtn, this.onOpenBtn);
		this.addTouchEvent(this.shopBtn, this.onOpenBtn);
		this.addTouchEvent(this.noticeBtn, this.onOpenBtn);
		this.addTouchEvent(this.newsBtn, this.onOpenBtn);

		DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE,this.updateRoleData,this);
		this.updateRoleData();
		UIDmgr.bindingUID(this.roleBtn,uid.roleBtn);
		UIDmgr.bindingUID(this.bagBtn,uid.bag);
		UIDmgr.bindingUID(this.taskBtn,uid.rw0);
		UIDmgr.bindingUID(this.copyBtn,uid.fb0);
		UIDmgr.bindingUID(this.skillBtn,uid.jn0);
		UIDmgr.bindingUID(this.arenaBtn,uid.p0);
		UIDmgr.bindingUID(this.achieveBtn,uid.cj0);
		UIDmgr.bindingUID(this.riskBtn,uid.back1);

		this.addEvent(GameEvent.RED_MAIN_TASK,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_DAY_TASK,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_ACHEIEVEMENT,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_SKILL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_ARTIFACE,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_STRENG,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_EQUIP_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_GEM_LVL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_EMAIL,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.RED_BAG_RED,DataEventDispatcher.dispatcher,this.upRed);
		this.addEvent(GameEvent.STUDY_SKILL,DataEventDispatcher.dispatcher,this.upRed);
		this.upRed(null);

		if(!param[0]){
			return;
		}
		ViewManager.ins().open(param[0],param[1]);
	}
	private upRed(e:egret.Event):void
	{
			//成就、任务
			ViewManager.redToTarge(this.achieveBtn,RemindMgr.taskGetSatus[3] == true);
			ViewManager.redToTarge(this.taskBtn,RemindMgr.taskGetSatus[1] == true || RemindMgr.taskGetSatus[2] == true);
			//技能
			ViewManager.redToTarge(this.skillBtn,RemindMgr.CAN_UP_SKILL.length > 0 || SkillMgr.NEW_STUDY.length > 0);
			//神器激活、升级
			// ViewManager.redToTarge(this.roleBtn,(RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1));
			//强化
			ViewManager.redToTarge(this.roleBtn,(RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1) || (RemindMgr.StrengEquips.length > 0) || (RemindMgr.upEquipsLvl.length > 0) ||  (RemindMgr.GEM));
			//邮件有可读的提示
			ViewManager.redToTarge(this.mailBtn,RemindMgr.HAVE_READ_EMAIL);
			//背包
			ViewManager.redToTarge(this.bagBtn,RemindMgr.hasOtherItem);
	}


	public close(...param:any[]):void{
		DataEventDispatcher.dispatcher.removeEventListener(BaseMap.LOAD_MAP_COMPLETE,this.updateRoleData,this);
	}
	/**
	 * 更新角色信息
	 */
	private updateRoleData(): void{
		let obj:any = ConfigMgr.gameConfig["pointInfo"][UserVo.ins.points + ""];
	}

	private onClick(e:egret.TouchEvent):void{
		let btn = e.currentTarget;
		if(btn == this.riskBtn){
			ViewManager.ins().closeTopLevel()
			ViewManager.ins().close(this);
		}else{
			this.selectView(btn)
		}
		UIDmgr.bindingUID(this.riskBtn,uid.back1);
	}
	private onOpenBtn(e:egret.TouchEvent): void{
		switch(e.currentTarget){
			case this.arenaBtn:
				ViewManager.ins().open(PVPWin);
				break;
			case this.copyBtn:
				ViewManager.ins().open(PVEWin);
				break;
			case this.shopBtn:
				ViewManager.ins().open(ShopWin);
				break;
			case this.rankBtn:
				ViewManager.ins().open(RankWin);
				break;
			case this.taskBtn:
				ViewManager.ins().open(TaskWin);
				break;
			case this.mailBtn:
				ViewManager.ins().open(EmailView);
				break;
			case this.noticeBtn:
				ViewManager.ins().open(NoticeView);
				break;
			case this.newsBtn:
				ViewManager.ins().open(MessageView);
				break;
			default:
				UserTips.ins().showTipsBigToSmall("敬请期待");
		}
	}
	private selectView(btn:eui.ToggleButton): boolean{
	  	let btnIndex = this.navBtn.indexOf(btn);
		var d:any = this.viewAr[btnIndex]?ViewManager.ins().open(this.viewAr[btnIndex]):null;
		if(!d)
			return false;
		return true;
	}
	
}
ViewManager.ins().reg(UIView, LayerManager.UI_Main);