class ConfigMgr {
	public static LOAD_CONFIG_END:string = "LOAD_CONFIG_END";
	private static _ins:ConfigMgr;
	public static get ins():ConfigMgr
	{
		if(ConfigMgr._ins == null)
			ConfigMgr._ins = new ConfigMgr();
		return ConfigMgr._ins;
	}

	public constructor() {
	}

	private configLoad:egret.URLLoader;
	public loadConfig()
	{
 		this.configLoad = new egret.URLLoader();
        this.configLoad.dataFormat = egret.URLLoaderDataFormat.BINARY;

        this.configLoad.addEventListener(egret.Event.COMPLETE, this.loadZipCom, this);
		// this.configLoad.addEventListener(egret.ProgressEvent.PROGRESS,LoadingUI.ins.onProgress, this);
        this.configLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadZipErr, this);

        var url: string = ParamMgr.ressite + ParamMgr.gameSynRes + "/config/config.ce?v=" + ParamMgr.ver;
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        this.configLoad.load(request);
	}


	 public static gameConfig:any;
	 private loadZipCom(e): void {
        var zip:JSZip = new JSZip(e.target.data);
		ConfigMgr.gameConfig = {};
		for(var k in zip["files"]){
			var datas: egret.ByteArray = new egret.ByteArray(zip.file(k).asArrayBuffer());
			var s:string = datas.readUTFBytes(datas.readAvailable);
			if(DEBUG)
				egret.log(k);
			ConfigMgr.gameConfig[k.replace(".json","")] = JSON.parse(s);
		}

		var b:Array<any> = ConfigMgr.gameConfig["globalConfig"]["guideCondition"];
        for(var i:number=0;i<Guide.guideCfg.length;i++)
        {
            for(var j:number=0;j<b.length;j++)
            {
                if(Guide.guideCfg[i].id == b[j].guideId)
                {
                    Guide.guideCfg[i].tiggers = b[j].tiggers;
                    Guide.guideCfg[i].des = b[j].des;
                    break;
                }
            }
        }
		egret.log("配置加载完毕！");
		this.debugVer();
		DataEventDispatcher.dispatchEventWith(ConfigMgr.LOAD_CONFIG_END);
    }
	private loadZipErr(data): void {
        egret.log("配置加载错误！");
    }

	private debugVer():void
	{
		if(DEBUG){
			ConfigMgr.gameConfig["mapVer"] = 
    		ConfigMgr.gameConfig["humanVer"] = 
    		ConfigMgr.gameConfig["monsterVer"] = 
			ConfigMgr.gameConfig["weaponVer"] = 
			ConfigMgr.gameConfig["helmetVer"] = 
			ConfigMgr.gameConfig["skillVer"] = 
			ConfigMgr.gameConfig["otherVer"] =
			ConfigMgr.gameConfig["wingVer"] =
			ConfigMgr.gameConfig["protoVer"] = 
   			ConfigMgr.gameConfig["soundVer"] =
			   ParamMgr.ver;
		}
	}
}