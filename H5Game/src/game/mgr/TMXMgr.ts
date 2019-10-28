class TMXMgr extends BaseClass{
	public static LOAD_TMX_END:string = "LOAD_TMX_END";
	public constructor() {
		super();
	}
	public static ins(...args:any[]):TMXMgr{
		return super.ins(args) as TMXMgr;	
	}
	private myload:egret.URLLoader;
	public loadTmx():void
	{
 		this.myload = new egret.URLLoader();
        this.myload.dataFormat = egret.URLLoaderDataFormat.BINARY;

        this.myload.addEventListener(egret.Event.COMPLETE, this.loadZipCom, this);
		this.myload.addEventListener(egret.ProgressEvent.PROGRESS,LoadingUI.ins.onProgress, this);
        this.myload.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadZipErr, this);

        var url: string = ResMgr.getMapImage("xy/xy");
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        this.myload.load(request);
	}

	 public mapDic:Object;
	 private loadZipCom(e): void {
        var zip:JSZip = new JSZip(e.target.data);
		this.mapDic = {};
		var data: any;
		for(var k in zip["files"])
		{
			this.mapDic[k] = new egret.ByteArray(zip.file(k).asArrayBuffer());
		}
		// egret.log("地图加载完毕！");
		DataEventDispatcher.dispatchEventWith(TMXMgr.LOAD_TMX_END);
    }
	private loadZipErr(data): void {
        egret.log("地图加载错误！");
    }
}