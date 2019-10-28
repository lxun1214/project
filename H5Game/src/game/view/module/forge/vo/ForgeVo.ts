class ForgeVo extends BaseClass{
	public equipAttr:any;
	public constructor() {
		super();
	}
	public static ins():ForgeVo
	{
		return super.ins();
	}
	public initEvent(): void{
		// DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20003,this.baglist,this);
		// DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20008,this.WearEquipRequest,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20008,this.WearEquipRequest,this);
		// DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20010,this.reinforcedEquipResponse,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20031,this.takeOffEquipResponse,this);
		
	}
	/**
	 * 穿戴装备返回
	 */
	private WearEquipRequest(e:egret.Event): void{
		// BagVo.ins().removeBagItem( e.data.bagChangeInfo.bagChangeItems);
		// UserVo.ins.fightPower = e.data.fightPower;
		UserTips.ins().showTipsBigToSmall("穿戴成功",false);
		this.updateEquip(e.data.bagChangeInfo.bagChangeItems[0],e.data.loc);

		DataEventDispatcher.dispatchEventWith(GameEvent.WEAR_EQUIPS);
	}
	/**
	 * 穿戴更换装备
	 */
	public updateEquip(itemInfo: ItemInfo,dx:number): void{
		let eCfg = ForgeVo.ins().getEquipID(itemInfo.itemId);
		if(!eCfg)return;
		for(var i:number=0;i<this.equipAttr.length;i++)
		{
			if(this.equipAttr[i])
				AttributeUtlis.attributeMgr(this.equipAttr[i],false);
		}
		UserVo.ins.Columns[dx].itemInfo = itemInfo;
		this.setEquipAttr();
	}
	// public reinforcedEquipResponse(e:egret.Event): void{
	// 	if(e.data.isSuccess){
			
	// 	}
	// }
	/**
	 * 卸下装备返回
	 */
	private takeOffEquipResponse(e:egret.Event): void{
		if(e.data.isSuccess){
			UserVo.ins.Columns[e.data.loc].itemInfo = null;
			if(this.equipAttr[e.data.loc])
				AttributeUtlis.attributeMgr(this.equipAttr[e.data.loc],false);
			this.equipAttr[e.data.loc] = null;
			// AttributeUtlis.InitAttributeDerive(UserVo.ins);
			DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_PLAYER_WIN,-1);
		}
	}
	/**
	 * 根据道具ID获取装备等级配置
	 */
	public getEquipID(id: number): EquipConfing{
		return ConfigMgr.gameConfig["equip"][id];
	}
	/**
	 * 根据等级获取消耗所需金币
	 */
	public getUpEquipGold(lv: number):number{
		let info = ConfigMgr.gameConfig["equipGrow"][lv];
		return info?info.gold:0;
	}
	/**
	 * 设置装备属性
	 */
	public setEquipAttr(info?:UserVo): void{

		var local:boolean = info?info == UserVo.ins:true;
		info = info?info:UserVo.ins;

		let addTypeName = [];
		for(let i = 0; i < info.Columns.length; i++){
			let itemInfo: ItemInfo = info.Columns[i].itemInfo;
			if(!itemInfo)continue;
			let eCfg = ForgeVo.ins().getEquipID(itemInfo.itemId);
			let obj: Object = {};
			for(let key in eCfg){
				if(info.playerAttrInfo[key] == undefined)
					continue;
				obj[key] = eCfg[key];
				if(AttributeUtlis.BaseAttributeII.indexOf(key) != -1){
					obj[key] *= (itemInfo.level + 1);
				}
			}
			AttributeUtlis.attributeMgr(obj,true,info.playerAttrInfo,info.jobId);
			addTypeName[i] = obj;
		}
		if(local)
			this.equipAttr = addTypeName;
	}


	public strengthenItem:ItemInfo;
	public strengthenBack(data:any):void
	{
		if(data.isSuccess)
		{
			this.strengthenItem.level ++;
			for(var i:number=0;i<this.equipAttr.length;i++)
			{
				if(this.equipAttr[i])
					AttributeUtlis.attributeMgr(this.equipAttr[i],false);
			}
			this.setEquipAttr();
			DataEventDispatcher.dispatchEventWith(GameEvent.UP_STRENGTH,data);
		}
	}

	public advanceItem:ItemInfo;
	public advanceBack(data:any):void
	{
		if(data.isSuccess)
		{
			// this.advanceItem.itemId ++;
			for(var i:number=0;i<this.equipAttr.length;i++)
			{
				if(this.equipAttr[i])
					AttributeUtlis.attributeMgr(this.equipAttr[i],false);
			}
			this.setEquipAttr();
			DataEventDispatcher.dispatchEventWith(GameEvent.UP_ADVANCE,data);
		}
	}
}