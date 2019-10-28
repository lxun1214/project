class BagVo extends BaseClass{

	public static EQUIP_MAX:number = 10;

	//物品类型(1宝石2装备3神器4道具）
	/**1宝石 */
	public static ITEM_TYPE_GEM: number = 1
	/** 2装备*/
	public static ITEM_TYPE_EQUIP:number = 2;
	/**3神器 */
	public static ITEM_TYPE_ARTIFACT:number = 3;
	/**4道具 */
	public static ITEM_TYPE_OTHER: number = 4;


	/**背包道具列表 */
	public bagList: ItemInfo[];

	public static ins():BagVo
	{
		return super.ins() as BagVo;
	}
	public constructor() {
		super();
		this.bagList = [];
		
	}
	public initEvent(): void{
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20003,this.setBaglist,this);
		
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20012,this.smeltResponse,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_30002, this.itemChange, this);
	}
	private setBaglist(e:egret.Event): void{
		BagVo.ins().bagList = e.data.items;
	}
	/**
	 * 根据道具ID获取配置数据
	 */
	public getItem(id: number) :any{
		return ConfigMgr.gameConfig["item"][id];
	}
	/**
	 * 道具增删
	 */
	public itemChange(e: egret.Event): void{
		if(!this.bagList)this.bagList = [];
		let list: ItemInfo[] = e.data.bagChangeInfo.bagChangeItems;
		let flag: boolean = false;
		var vo:ItemInfo;
		var add:number = 0;
		var s:string;
		for (let key in list) {
			add = 0;
			let element = list[key];
			let cfg = this.getItem(element.itemId);
			// if(element.itemNum > 0){
			// 	let cfg = this.getItem(element.itemId);
				// UserTips.ins().showTips(`获得|S:28&C:${ColorUtlis.QUALITY_COLOR[cfg.rank]}&T:${cfg.name}x${element.itemNum}`);
			// }
			
			flag = false;
			for(let i = 0; i < this.bagList.length ; i++){
				vo = this.bagList[i];
				if(element.uuid == vo.uuid){
					flag = true;
					if(element.itemNum > 0){
						this.bagList[i] = element;
					}else{
						this.bagList.splice(i,1);
					}
					add = element.itemNum - vo.itemNum;
					break;
				}
			}
			if(!flag){
				this.bagList.push(element);
				add = element.itemNum;
			}
			s = add > 0?'获得':'失去';
			// add = Math.abs(add);
			// if(add > 0)
			// 	UserTips.ins().showTips(s + `|S:28&C:${ColorUtlis.QUALITY_COLOR[cfg.rank]}&T:${cfg.name}x${add}`);
			// else
			if(add > 0)
				UserTips.ins().showitemTips(s + `|S:28&C:${ColorUtlis.QUALITY_COLOR[cfg.rank]}&T:${cfg.name}x${add}`);
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_BAG_DATA,-1);
	}
	/**
	 * 装备熔炼返回
	 */
	private smeltResponse(e: egret.Event): void{
		// this.bagList = e.data.bagChangeInfo;
		// let list: ItemInfo[] = e.data.bagChangeInfo.bagChangeItems;
		// this.removeBagItem(list);
		// UserVo.ins.reinforcedEquipmentStone = e.data.fenjieEquipmentStone;
		if(e.data.isSuccess){
			UserTips.ins().showTipsBigToSmall("熔炼完成",false);
		}

		// DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_BAG_DATA,-1);
	}
	/**
	 * 删除背包多个物品
	 */
	public removeBagItem(list: ItemInfo[]): void{
		for (let key in list) {
			let element = list[key];
			for(let i = 0; i < this.bagList.length ; i++){
				if(element.uuid == this.bagList[i].uuid){
					this.bagList.splice(i,1);
					break;
				}
			}
		}
	}
	/**
	 * 获取熔炼列表
	 */
	public getSmeltList(): ItemInfo[]{
		let semltList: ItemInfo[] = [];
		for (let key in this.bagList) {
			let info = this.bagList[key];
			let cfg = this.getItem(info.itemId);
			if(cfg.itemType != 2)continue;
			let bagEquip = ConfigMgr.gameConfig["equip"][info.itemId];
			for(let i = 0; i < UserVo.ins.Columns.length; i++){
				let itemInfo: ItemInfo = UserVo.ins.Columns[i].itemInfo;
				if(!itemInfo) continue;
				let userEquip = ConfigMgr.gameConfig["equip"][itemInfo.itemId];
				if(bagEquip.itemQuality <= userEquip.itemQuality && bagEquip.equipCoordinate == userEquip.equipCoordinate){
					semltList.push(info);
				}
			}
		}
		
		return semltList;
	}
	/**
	 * 根据品质等级获取熔炼列表
	 */
	public getQualitySmeltList(nubType: number[]): ItemInfo[]{
		let semltList: ItemInfo[] = this.getSmeltList();
		let newInfo: ItemInfo[] = [];
		for (let key in semltList) {
			let info = semltList[key];
			for(let i = 0; i < nubType.length; i++){
				if(nubType[i] == 0){
					return semltList;
				}
				let cfg =  ConfigMgr.gameConfig["equip"][info.itemId];
				if(cfg && cfg.rank == nubType[i]){
					newInfo.push(info);
				}
			}
		}
		return newInfo;
	}
	/**
	 * 根据道具类型获取列表
	 * @param type 物品类型(1宝石2装备3神器4道具）
	 */
	public getTypeItemList(type: number): ItemInfo[]{
		let list:ItemInfo[] = [];
		for (let key in this.bagList) {
			let info = this.bagList[key];
			let cfg = this.getItem(info.itemId);
			if(cfg.itemType == type){
				list.push(info);
			}
		}
		if(type == 2)
		{
			list.sort(function(a:ItemInfo,b:ItemInfo):number
			{
				var aitemCfg:any = ConfigMgr.gameConfig["equip"][a.itemId];
				var bitemCfg:any = ConfigMgr.gameConfig["equip"][b.itemId];
				if(aitemCfg.initialScore + aitemCfg.growScore*a.level > bitemCfg.initialScore + bitemCfg.growScore*b.level)
					return 1;
				return -1
			});
		}else if(type == 1)
		{
			list.sort(function(a:ItemInfo,b:ItemInfo):number
			{
				var aitemCfg:any = ConfigMgr.gameConfig["gemAttr"][a.itemId];
				var bitemCfg:any = ConfigMgr.gameConfig["gemAttr"][b.itemId];
				if(aitemCfg.initialScore > bitemCfg.initialScore)
					return 1;
				return -1
			});
		}
		return list;
	}
	/**
	 * 根据道具ID获取背包道具数据
	 */
	public getIdItem(id: number): ItemInfo{
		for (let key in this.bagList) {
			let info = this.bagList[key];
			if(info.itemId == id)
				return info;
		}
		return null;
	}
	/**
	 * 获取背包宝石列表
	 */
	public getBagGemList(): ItemInfo[]{
		let list:ItemInfo[] = [];
		for (let key in this.bagList) {
			let info = this.bagList[key];
			let cfg = this.getItem(info.itemId);
			if(cfg.itemType != 1)continue;
			list.push(info);
		}
		return list.sort(this.gemListSort);
	}
	public gemListSort(a:ItemInfo,b:ItemInfo): number{
		if(a.itemId > b.itemId)
			return -1;
		else if(a.itemId < b.itemId)
			return 1;
		return 0;
	}
	/**
	 * 根据装备位置获取背包中该部位的装备
	 */
	public getPosEquipList(pos: number): ItemInfo[]{
		let list:ItemInfo[] = [];
		for (let key in this.bagList) {
			let info = this.bagList[key];
			let itemCfg = this.getItem(info.itemId);
			if(itemCfg.itemType != 2 || itemCfg.heroType != UserVo.ins.jobId)continue;
			let cfg =  ConfigMgr.gameConfig["equip"][info.itemId];
			if(cfg.equipCoordinate == pos || (cfg.equipCoordinate == 4 && (pos == 4 || pos ==5)) ||  (cfg.equipCoordinate == 6 && (pos == 6 || pos ==7)) )
				list.push(info);
		}
					list.sort(function(a:ItemInfo,b:ItemInfo):number
			{
				var aitemCfg:any = ConfigMgr.gameConfig["equip"][a.itemId];
				var bitemCfg:any = ConfigMgr.gameConfig["equip"][b.itemId];
				if(aitemCfg.equipScore > bitemCfg.equipScore)
					return -1;
				return 1
			});
		return list;
	}
}