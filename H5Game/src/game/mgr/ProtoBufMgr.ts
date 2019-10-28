class ProtoBufMgr {
	public static LOAD_PROTO_END:string = "LOAD_PROTO_END";
	private static _ins:ProtoBufMgr;
	public static get ins():ProtoBufMgr
	{
		if(ProtoBufMgr._ins == null)
			ProtoBufMgr._ins = new ProtoBufMgr();
		return ProtoBufMgr._ins;
	}
	static filenames:Array<string> = [
		"basePack",
		"pb_user",
		"pb_player"
	];

	private messageIdDic:Object;
	private messageNameDic:Object;
	private messageArr:Array<any>;
	public constructor() {
		this.messageIdDic = {};
		this.messageNameDic = {};

		//请求协议
		var key:number;
		for(var k in ClientPacket)
		{
			key = parseInt(k.toString().split("_")[1]);
			this.messageIdDic[key] = ClientPacket[k];
			this.messageNameDic[ClientPacket[k]] = key;
		}

		//返回消息
		for(var k in ServerPacket)
		{
			key = parseInt(k.toString().split("_")[1]);
			this.messageIdDic[key] = ServerPacket[k];
			this.messageNameDic[ServerPacket[k]] = key;
		}
	}

	/**通过协议ID获取协议名称 */
	public getMessageName(id:number):string{
		return this.messageIdDic[id];
	}

	/**通过协议名称获取协议ID */
	public getMessageId(name:string):number{
		return this.messageNameDic[name];
	}

	public static total:number;
	public loadProtoBuf():void
	{
		var a:Array<string> = ProtoBufMgr.filenames;
		var s:number = ProtoBufMgr.total = a.length;
		this.messageArr = []; 
		for(var i:number=0;i<s;i++)
		{
			protobuf.load(ParamMgr.ressite + ParamMgr.gameSynRes + "/pb/" + a[i] + ".proto?v=" + ConfigMgr.gameConfig["globalConfig"].protoVer,this.loadComplete);
		}
	}

	private loadComplete(err: any, root: any):void
	{
		var c: Object = ProtoBufMgr.ins.getMessageMb(root);
		ProtoBufMgr.ins.messageArr.push(c);
		//LoadingUI.ins.onProgress(ProtoBufMgr.ins.messageArr.length,ProtoBufMgr.total);
		if(ProtoBufMgr.ins.messageArr.length == ProtoBufMgr.total)
		{
			egret.log("proto加载完毕！");
			DataEventDispatcher.dispatchEventWith(ProtoBufMgr.LOAD_PROTO_END);
		}
	}

	private getMessageMb(a:Object):any
	{
		var c:Object = a["nested"];
		for(var k in c)
		{
			if(egret.getQualifiedClassName (c[k]) != "Namespace" && egret.getQualifiedClassName (c[k]) != "i")
				return c;
			return this.getMessageMb(c[k]);
		}
	}

	/** 通过消息名获取tbase消息体的 类（可以new）。*/
	public getMessageClass($name:String):any{			
		for(var i:number = 0; i < this.messageArr.length; i ++){
			var protocol:any = this.messageArr[i][""+$name];
			if(protocol != undefined){
				return protocol;
			}
		}
		return null;
	}
}