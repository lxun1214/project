class ArtifactVo extends BaseClass {
	public equipPos :number = -1;
	public gemPos: number = -1;
	public constructor() {
		super();
	}
	public static ins(): ArtifactVo {
		return super.ins();
	}
	public initEvent(): void {
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20018,this.onActivation,this);
		DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20019,this.onReinforced,this);
	}
	/**
	 * 请求神器激活
	 */
	public sendActivation(itemId: number): void{
		let data = { itemId: itemId };
		HttpMgr.ins.sendMessage(ClientPacket.S_10018, data, ServerPacket.LOGIC_URL,true);
	}
	/**
	 * 神器激活返回
	 */
	private onActivation(e:egret.Event): void{
		if(e.data.isSuccess){
			UserTips.ins().showTipsBigToSmall("神器激活成功！",false);
			this.updateArtList(e.data.itemId);
			// DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN,-1);
		}
	}
	/**
	 * 请求神器升级
	 */
	public sendReinforced(itemId: number): void{
		let data = { itemId: itemId };
		HttpMgr.ins.sendMessage(ClientPacket.S_10019, data, ServerPacket.LOGIC_URL,true);
	}
	/**
	 * 神器升级返回
	 */
	private onReinforced(e: egret.Event): void{
		if(e.data.isSuccess){
			UserTips.ins().showTipsBigToSmall("神器升级成功！",false);
			this.updateArtList(e.data.itemId);
			// DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN,-1);
		}
	}
	/**
	 * 更新神器列表
	 */
	public updateArtList(itemId: number): void{
		var Acfg:any = ConfigMgr.gameConfig["artifact"];
		if(!UserVo.ins.artifactInfos){
			UserVo.ins.artifactInfos = [];
			UserVo.ins.artifactInfos.push(itemId);
			AttributeUtlis.attributeMgr(Acfg[itemId],true);
		}else{
			let flag: boolean = false;
			for(let i = 0; i < UserVo.ins.artifactInfos.length; i++){
				let id: number = UserVo.ins.artifactInfos[i];
				let cfg = Acfg[id];
				if(cfg.artifactType == Acfg[itemId].artifactType){
					AttributeUtlis.attributeMgr(cfg,false);
					UserVo.ins.artifactInfos[i] = itemId;
					AttributeUtlis.attributeMgr(Acfg[itemId+""],true);
					flag = true;
					break;
				}
			}
			if(!flag)
			{
				UserVo.ins.artifactInfos.push(itemId);
				AttributeUtlis.attributeMgr(Acfg[itemId],true);
			}
		}
		DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN,-1);
		
	}

	//初始化属性  叠加前面的
	public initArtPropertys(info?:UserVo):void
	{
		info = info?info:UserVo.ins;
		var acfg:any = ConfigMgr.gameConfig["artifact"];
		for(let i = 0; i < info.artifactInfos.length; i++){
			let id: number = info.artifactInfos[i];
			let cfg = acfg[id];
			// for(var j:number = cfg.artifactType*100+1;j<=id;j++)
			// {
				AttributeUtlis.attributeMgr(cfg,true,info.playerAttrInfo,info.jobId);
			// }
		}
	}

	public listSort(a:number,b:number): number{
		if(a > b)
			return -1;
		else if(a < b)
			return 1;
		return 0;
	}
}