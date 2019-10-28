class GemVo extends BaseClass {
	public static GEM_TYPE: string[] = ["powerQuality", "intellectQuality", "alacrityQuality", "physiqueQuality", "attackInit", "armorInit", "magicAttack", "magicArmorInit", "critRate", "critDamage", "blood"];
	public static GEM_TYPE_VALUE: string[] = ["力量资质", "智力资质", "敏捷资质", "体力资质", "物理攻击", "物理防御", "魔法攻击", "魔法防御", "暴击率", "暴击伤害", "生命值"];
	public equipPos: number = -1;
	public gemPos: number = -1;
	public constructor() {
		super();
	}
	public static ins(): GemVo {
		return super.ins();
	}
	public initEvent(): void {
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20014, this.gemMountResponse, this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20017, this.onGemComposeInGrooveResponse, this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20015, this.onGemRemoveResponse, this);
	}
	/**
	 * 宝石镶嵌(包含替换)
	 */
	public sendGemMountRequest(uuid: number, upPos: number = -1): void {
		let pos: number = upPos;
		if (upPos == -1)
			pos = this.getGemPos(this.equipPos);
		this.gemPos = pos;
		if (pos == -1) return;
		let data = { columnLoc: this.equipPos, grooveLoc: pos, uuid: uuid };
		HttpMgr.ins.sendMessage(ClientPacket.S_10014, data, ServerPacket.LOGIC_URL, true);
	}
	/**
	 * 宝石镶嵌(包含替换)返回
	 */
	private gemMountResponse(e: egret.Event): void {
		if (e.data.isSuccess) {
			// BagVo.ins().removeBagItem( e.data.bagChangeInfo.bagChangeItems);
			// UserVo.ins.fightPower = e.data.fightPower;
			this.updateCurrEquipGem(e.data.itemId);


		}
	}
	/**
	 * 宝石摘除
	 */
	public sendGemRemoveRequest(gemPos: number): void {
		HttpMgr.ins.sendMessage(ClientPacket.S_10015, { columnLoc: this.equipPos, grooveLoc: gemPos }, ServerPacket.LOGIC_URL);
	}
	/**
	 * 宝石摘除返回
	 */
	private onGemRemoveResponse(e: egret.Event): void {
		if (e.data.isSuccess) {
			UserTips.ins().showTipsBigToSmall("成功卸下宝石",false);
			this.equipPos = e.data.columnLoc;
			this.gemPos = e.data.grooveLoc;
			this.updateCurrEquipGem(0);
			// DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA,-1);
		}
	}
	/**
	 * //合成镶嵌在宝石槽中宝石
	 */
	public sendGemComposeInGrooveResponse(equipPos: number, gemPos: number): void {
		HttpMgr.ins.sendMessage(ClientPacket.S_10017, { columnLoc: equipPos, grooveLoc: gemPos }, ServerPacket.LOGIC_URL);
	}
	public onGemComposeInGrooveResponse(e: egret.Event): void {
		if (e.data.isSuccess) {
			UserTips.ins().showTipsBigToSmall("宝石升级成功",false);
			this.updateCurrEquipGem(e.data.gemId,e.data.columnLoc,e.data.grooveLoc);
			// DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA, -1);
		}
	}
	public getGemPos(equipPos: number): number {
		let equipGem = UserVo.ins.Columns[equipPos].gemGrooves.gemGrooves;
		let pos: number = 0;
		for (let key in equipGem) {
			let info = equipGem[key];
			if (info.gemId == 0 && info.isOpen)
				break;
			if (!info.isOpen) {
				UserTips.ins().showTipsBigToSmall("没有开启的宝石槽");
				pos = -1;
				break;
			}

			pos++;
		}
		return pos;
	}
	/**
	 * 镶嵌成功，更新当前装备宝石列表
	 */
	public updateCurrEquipGem(itemId: number, ePos: number = this.equipPos, gPos: number = this.gemPos): void {
		let equipGem = UserVo.ins.Columns[ePos].gemGrooves.gemGrooves;
		for (let key in equipGem) {
			let info = equipGem[key];
			if (info.loc == gPos) {
				//检测删除之前的属性
				if(this.gemAtts[ePos] && this.gemAtts[ePos][gPos])
					AttributeUtlis.attributeMgr(this.gemAtts[ePos][gPos],false);
				info.gemId = itemId;
				if(itemId >　0)
				{
					var gemcfg:any = ConfigMgr.gameConfig["gemAttr"][itemId];
					if(!this.gemAtts[ePos])
						this.gemAtts[ePos] = [];
					this.gemAtts[ePos][gPos] = gemcfg;
					AttributeUtlis.attributeMgr(gemcfg,true);
				}
				else
				{
					if(this.gemAtts[ePos])
					{
						this.gemAtts[ePos][gPos] = null;
					}
				}
				break;
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_GEM_DATA, -1);
	}

	private gemAtts:Array<any> = [];

	public addGemAtts(info?:UserVo):void
	{
		var local:boolean = info?info == UserVo.ins:true;
		info = info?info:UserVo.ins;
		var a:Array<any> = info.Columns;
		for(let i = 0; i < a.length; i++)
		{
			if(local)
				this.gemAtts[i] = [];
			let gemData:Array<any> = a[i].gemGrooves.gemGrooves;
			if(!gemData)continue;
			for(var j:number = 0;j<gemData.length;j++)
			{
				if(gemData[j].gemId != 0)
				{
					var gemcfg:any = ConfigMgr.gameConfig["gemAttr"][gemData[i].gemId];
					if(local)
						this.gemAtts[i][j] = gemcfg;
					AttributeUtlis.attributeMgr(gemcfg,true,info.playerAttrInfo,info.jobId);
				}else
				{
					if(local)
						this.gemAtts[i][j] = null;
				}
			}
		}
	}
	/**
	 * 根据宝石ID获取宝石等级
	 */
	public getGemLv(gemId: number): number {
		let data = this.getGemAttr(gemId)
		return (gemId - 1000) - (data.AttrType - 100) * 10 + 1;

	}
	/**
	 * 根据宝石ID获取宝石属性配置
	 */
	public getGemAttr(gemId: number): any {
		let cfg = ConfigMgr.gameConfig["gemAttr"];
		let data;
		for (let key in cfg) {
			if (cfg[key].id == gemId) {
				data = cfg[key];
				break;
			}
		}
		return data;
	}
	/**
	 * 升级宝石
	 */
	public upGem(data: any): void {
		let bagGemList: ItemInfo[] = BagVo.ins().getBagGemList();
		// if (bagGemList.length == 0) {
		// 	UserTips.ins().showTips("背包无宝石");
		// 	return;
		// }
		// if (data.gemId == 0) {
		// 	for (let key in bagGemList) {
		// 		if (!this.isEquipGem(bagGemList[key].itemId)) {
		// 			this.sendGemMountRequest(bagGemList[key].uuid, data.loc);
		// 			return;
		// 		}
		// 	}
		// 	UserTips.ins().showTips("只能镶嵌不同属性的宝石");
		// 	return;
		// }
		//升级
		var a:any = this.getGemAttr(data.gemId);
		if(a.nextId == 0)
			return UserTips.ins().showTipsBigToSmall("已达到最高等级");
		let curType: number = a.AttrType;
		for (let key in bagGemList) {
			let info = bagGemList[key];
			let type: number = this.getGemAttr(info.itemId).AttrType;
			if (curType == type){
				if(info.itemNum >= a.compose-1) 
				{
					this.sendGemComposeInGrooveResponse(this.equipPos,data.loc);
					// this.sendGemMountRequest(info.uuid, data.loc);
					return;
				}
			}
		}
		UserTips.ins().showTipsBigToSmall("所需宝石数量不足");

	}
	/**
	 * 是否该装备已经装备该类型宝石
	 */
	public isEquipGem(itmeId: number): number {
		let data = this.getGemAttr(itmeId);
		let equipGem = UserVo.ins.Columns[this.equipPos].gemGrooves.gemGrooves;
		let pos: number = 0;
		for (let key in equipGem) {
			let info = this.getGemAttr(equipGem[key].gemId);
			if (info && info.AttrType == data.AttrType) {
				return info.loc;
			}
		}
		return -1;
	}
	public getGemType(id: number): string {
		let info = this.getGemAttr(id);
		let str: string = "";
		for (let i = 0; i < GemVo.GEM_TYPE.length; i++) {
			if (info[GemVo.GEM_TYPE[i]] > 0) {
				str += GemVo.GEM_TYPE_VALUE[i] + "+" + info[GemVo.GEM_TYPE[i]] + "\n";
			}
		}
		return str;
	}
}