class RemindMgr extends BaseClass{
	public constructor() {
		super();
		var vo:any;
		//任务、成就、技能、神器、装备强化、装备升阶、宝石升级、邮件、活动、首充、月卡、宝盒
		var systems:Array<any> = [TaskWin,AchievementWin,SkillWin,ArtifactWin,ForgeWin,ForgeWin,GemWin,EmailView,BagWin,
		ActivityWin,FirstCharge,MonthCard,LimitCard];
		var call:Array<any> = [this.upTask,this.upAchievement,this.upSkillLvl,this.checkArtifact,this.checkEquipStreng,this.checkEquipLvl,this.checkGem,this.checkEmail,
		this.checkBag,this.upActivety,this.upActivety,this.upActivety,this.upActivety];
		for(var i:number=0;i<systems.length;i++)
		{
			 if(!SystemOpenMgr.checkOpen(systems[i]))
			 {
				 vo = SystemOpenMgr.getOpenCondition(systems[i]);
				 if(vo.playerLvl >0)
					 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,call[i],this);
				 if(vo.vipLvl >0)
				 	DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,call[i],this);
				 if(vo["层数"] >0)
				 	DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points,call[i],this);
			 }

			 if(i == 2)
			 {
				  DataEventDispatcher.dispatcher.addEventListener(GameEvent.SKILL_UP_LVL,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.STUDY_SKILL,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,call[i],this);
			 }else if(i == 3)
			 {
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_ARTIFACT_WIN,call[i],this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,call[i],this);
			 }else if(i == 4)
			 {
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.WEAR_EQUIPS,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_STRENGTH,call[i],this); 
			 }else if(i == 5)
			 {
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.MONEY_TYPE_CHANGE,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.WEAR_EQUIPS,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN,call[i],this); 
				DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_ADVANCE,call[i],this); 
			 }else if(i == 6)
			 {
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_PLAYER_WIN,this.checkGem,this); 
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_GEM_DATA,this.checkGem,this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,this.checkGem,this);
			 }else if(i == 7)
			 {
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.ADD_EMAIL,this.checkEmail,this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_EMAIL_STATUS,this.checkEmail,this);
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.REMOVE_EMAIL,this.checkEmail,this);
			 }else if(i == 8)
			 {
				 DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_BAG_DATA,call[i],this);
			 }else if(i<13)
			 {
				DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20032,this.upActivety,this);
				DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30006,this.upActivety,this);
			 }
			 call[i].apply(this);
		}
		
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,this.checkArtifact,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,this.checkArtifact,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points,this.checkArtifact,this);
	}

	static activetyAwards:any = {};
	static activetyRED:boolean = false;
	private upActivety(e:egret.Event=null):void
	{
		if(!e)
		{
			ActivetyMgr.ins();
			for(var i:number = 1000;i<ActivetyMgr.MAX_ACTIVE;i++)
			{
				RemindMgr.activetyAwards[i+""] = [];
			}
			var aaa:Array<any> = UserVo.ins.activityInfos;
			for(i=0;i<aaa.length;i++)
			{
					var b:Array<any> = aaa[i].completedActivityInfos;
					for(var j:number=0;j<b.length;j++)
					{
						if(!b[j].isReward)
							RemindMgr.activetyAwards[aaa[i].activityId + ""].push(b[j].activityIndex);
					}
			}
		}else{
			if(e.type == ServerPacket.C_20032)//领取返回
			{
				if(e.data.isSuccess){
					var a:Array<number> = RemindMgr.activetyAwards[e.data.activityId];
					var dx:number = a.indexOf(e.data.activityIndex);
					if(dx != -1)
						a.splice(dx,1);
					else
						egret.log("活动错误!");
				}
			}else
			{
				RemindMgr.activetyAwards[e.data.activityId].push(e.data.activityIndex);
			}
		}
		RemindMgr.activetyRED = false;
			for(var k in RemindMgr.activetyAwards)
			{
				if(k != ActivetyMgr.FIRST_CHARGE + "" 
				&& k != ActivetyMgr.MONTH_CARD + "" &&
				k != ActivetyMgr.LIMIT_CARD + "")
				{
					if(RemindMgr.activetyAwards[k].length > 0)
					{
						RemindMgr.activetyRED = true;
						break;
					}
				}
			}
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACTIVETY);
	}




	static hasOtherItem:boolean = false;
	private checkBag():void
	{
		var a:Array<any> = BagVo.ins().getTypeItemList(BagVo.ITEM_TYPE_OTHER);
		var c:boolean = a.length != 0;
		if(c == RemindMgr.hasOtherItem)
			return;
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_BAG_RED);
	}

	//邮件是否有可读
	static HAVE_READ_EMAIL:boolean = false;
	private checkEmail():void
	{
		var isOpen:boolean = SystemOpenMgr.checkOpen(EmailView);
		if(!isOpen)
			return;
		var sb:boolean = RemindMgr.HAVE_READ_EMAIL;
		var xb:boolean = false;
		var d:Array<any> = UserVo.ins.emailInfos;
		for(var i:number=0;i<d.length;i++)
		{
			if(d[i].readState == 0 || (d[i].itemState == 0 && d[i].itemList && d[i].itemList.length >0))
			{
				xb = true;
				break;
			}
		}
		if(RemindMgr.HAVE_READ_EMAIL == xb)
			return;
		RemindMgr.HAVE_READ_EMAIL = xb;
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_EMAIL);
	}




	//宝石升级检测
	static GEM_CAN_UP:Array<any> = [];
	static GEM:boolean = false;
	private checkGem():void
	{
		var isOpen:boolean = SystemOpenMgr.checkOpen(GemWin);
		if(!isOpen)
			return;
		var a:Array<any>;
		var bagGemList: ItemInfo[] = BagVo.ins().getBagGemList();
		RemindMgr.GEM_CAN_UP.length = 0;
		RemindMgr.GEM = false;
		for(var i:number=0;i<4;i++)
		{
			RemindMgr.GEM_CAN_UP[i] = [];
			a = UserVo.ins.Columns[i].gemGrooves.gemGrooves;
			for(var j:number=0;j<a.length;j++)
			{
				if(a[j].isOpen && a[j].gemId > 0)
				{
					var c:any = GemVo.ins().getGemAttr(a[j].gemId);
					if(c.nextId == 0)
						continue;
					let curType: number = c.AttrType;
					for (let key in bagGemList) {
						let info = bagGemList[key];
						let type: number = GemVo.ins().getGemAttr(info.itemId).AttrType;
						if (curType == type){
							if(info.itemNum >= c.compose-1) 
							{
								RemindMgr.GEM_CAN_UP[i][c.loc] = c;
								RemindMgr.GEM  = true;
								break;
							}
						}
					}
				}
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_GEM_LVL);
	}




















	//装备升阶
	static upEquipsLvl:Array<any> = [];
	private checkEquipLvl():void
	{
		if(!UserVo.ins.Columns)return;
		var isOpen:boolean = SystemOpenMgr.checkOpen(ForgeWin);
		if(!isOpen)
			return;
		RemindMgr.upEquipsLvl = [];
		var vo:any;
		var c:number = UserVo.ins.reinforcedEquipmentStone;
		for(let i = 0; i < UserVo.ins.Columns.length; i++){
			let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
			if(!itemInfo)
				continue;
			vo = ForgeVo.ins().getEquipID(itemInfo.itemId);
			if(c >= vo.reinforcedEquipmentStone && vo.reinforcedEquipmentStone  != 0)
			{
				RemindMgr.upEquipsLvl[i] = itemInfo;
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_EQUIP_LVL);
	}
	//装备强化
	static StrengEquips:Array<any> = []
	private checkEquipStreng():void
	{
		if(!UserVo.ins.Columns)return;
		var isOpen:boolean = SystemOpenMgr.checkOpen(ForgeWin);
		if(!isOpen)
			return;
		RemindMgr.StrengEquips = [];
		var c:number = MoneyUtils.getMoneyNum(MoneyUtils.M_2);
		for(let i = 0; i < UserVo.ins.Columns.length; i++){
			let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
			if(!itemInfo)
				continue;
			if(c >= ForgeVo.ins().getUpEquipGold(itemInfo.level))
			{
				RemindMgr.StrengEquips[i] = itemInfo;
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_STRENG);
	}
	//神器可激活、升级
	static artifactTips:Array<number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//1激活 2升级 0无
	private artifaceLists:Array<any>;
	private checkArtifact():void
	{
		var isOpen:boolean = SystemOpenMgr.checkOpen(ArtifactWin);
		if(!isOpen)
			return;
		if(!this.artifaceLists)
		{
			this.artifaceLists = []
			for (let i = 1; i < 100; i++) {
				let id: number = 40001 + i * 100;
				let cfg = ConfigMgr.gameConfig["artifact"][id];
				if (!cfg) break;
				this.artifaceLists.push(cfg);
				RemindMgr.artifactTips[i-1] = 0;
			}
		}
		var allOpen:boolean = true;
		var artList:Array<any> = UserVo.ins.artifactInfos;
		var vo:any;
		var hav:boolean = false;
		var c:number =  MoneyUtils.getMoneyNum(MoneyUtils.M_6);
		for(var i:number = 0;i<this.artifaceLists.length;i++)
		{
			hav = false;
			for(var j:number=0;j<artList.length;j++)
			{
				vo = ConfigMgr.gameConfig["artifact"][artList[j]];
				if(this.artifaceLists[i].artifactType == vo.artifactType)
				{
					hav = true;
					if(c >= vo.strengthenArtifactStone && vo.strengthenArtifactStone != 0)
					{
						RemindMgr.artifactTips[i] = 2;
					}else
						RemindMgr.artifactTips[i] = 0;
				}
			}
			if(!hav)
			{
				allOpen = false;
				//检测是否激活
				var canActivate:boolean = false;
				switch(this.artifaceLists[i].access)
				{
					case 1:
						canActivate = UserVo.ins.MAX_POINTS >= this.artifaceLists[i].btainConditions;
						break;
					case 2:
						canActivate = UserVo.ins.rebirthNum >= this.artifaceLists[i].btainConditions;
						break;
					case 3:
						canActivate = UserVo.ins.vipLevel >= this.artifaceLists[i].btainConditions;
						break;
					case 4:
						canActivate = BagVo.ins().getIdItem(this.artifaceLists[i].itemId)?true:false;
						break;
					case 5:
						canActivate = BagVo.ins().getIdItem(this.artifaceLists[i].itemId)?true:false;
						break;
				}
				RemindMgr.artifactTips[i] = canActivate?1:0;
			}
		}
		if(allOpen)
		{
			DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,this.checkArtifact,this);
			DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,this.checkArtifact,this);
			DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.points,this.checkArtifact,this);
		}

		DataEventDispatcher.dispatchEventWith(GameEvent.RED_ARTIFACE);
	}


	//技能检测
	static CAN_UP_SKILL:Array<any> = [];
	public upSkillLvl():void
	{
		var skills:any= SkillMgr.ins.skillGroup[UserVo.ins.jobId];
		var i:number = 0;
		var a:Array<any>;
		var count:number = MoneyUtils.getMoneyNum(MoneyUtils.M_5);
		var vo:SkillVo;
		RemindMgr.CAN_UP_SKILL = [];
		for(var key in skills)
		{
			a = skills[key]
			for(var i:number=0;i<a.length;i++)
			{
				vo = SkillMgr.ins.getRoleSkill(a[i].secondarySkill_id);
				if(vo && vo.level > 0)
				{
					if(count >= vo.stdSkill.upgrade_money && UserVo.ins.levelLimit(vo.stdSkill.need_role_lzs,vo.stdSkill.need_role_lvl)/*UserVo.ins.rebirthNum >= vo.stdSkill.need_role_lzs && UserVo.ins.level >= vo.stdSkill.need_role_lvl*/)
					{
						RemindMgr.CAN_UP_SKILL.push(vo);
					}
				}
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.RED_SKILL);
	}

	public static ins(...args:any[]):RemindMgr{
		return super.ins(args);
	}
	private upTask():void
	{
		this.checkTask(0);
	}
	private upAchievement():void
	{
		this.checkTask(3);
	}

	private clearCall(call:any):void
	{
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,call,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.vipLevel,call,this);
		DataEventDispatcher.dispatcher.addEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.rebirthNum,call,this);
	}
	//主线、每日、成就
	static taskArr:Array<any> = [[],[],[],[]];
	static taskGetSatus:Array<boolean> = [false,false,false,false];
	public checkTask(t:number=0):void
	{
		var isOpen:boolean = SystemOpenMgr.checkOpen(TaskWin);
		var isOpenII:boolean = SystemOpenMgr.checkOpen(AchievementWin);
		var a:Array<any>;
		var c:Array<any>;
		if((!t || t == 1) && isOpen)
		{
			this.clearCall(this.upTask);
			this.taskChange(1)
			DataEventDispatcher.dispatchEventWith(GameEvent.RED_MAIN_TASK);
		}

		if((!t || t == 2) && isOpen)
		{
			this.taskChange(2)
			DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACHEIEVEMENT);
		}

		if(!t || t == 3)
		{
			if(!isOpenII)
				return;
			else
				this.clearCall(this.upAchievement);
			this.taskChange(3)
			DataEventDispatcher.dispatchEventWith(GameEvent.RED_ACHEIEVEMENT);
		}
	}

	private taskChange(type:number):void
	{
		var newdd:Array<any> = [];
		var a:Array<any> = TaskMgr.ins().typeTask[type];
		var c:Array<any> = UserVo.ins.getTaskInfo(type);
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
						(a[j].lastTaskId == 0 || AchievementWin.isReceive(a[j].lastTaskId,type))?2:1);
					break;
				}
			}
			if(newdd[a[j].taskWin])//检测可领优先、未完成、完成
			{
				if(a[j].isReceive > newdd[a[j].taskWin].isReceive)
					newdd[a[j].taskWin] = a[j];
			}else
				newdd[a[j].taskWin] = a[j];
		}
 		for(i=newdd.length-1;i>=0;i--)
		{
			if(!newdd[i])
				newdd.splice(i,1);
		}
		newdd.sort(this.sortTask);
		RemindMgr.taskArr[type] = newdd;

		RemindMgr.taskGetSatus[type] = RemindMgr.taskArr[type][0].isReceive == 2;
	}


	private sortTask(a:any,b:any):number
	{
		if(a.isReceive < b.isReceive)
			return 1;
		else
			return -1;
	}
}