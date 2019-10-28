class GameSocket extends egret.WebSocket{
	private static _ins:GameSocket;
	public static get ins():GameSocket
	{
		if(GameSocket._ins == null)
			GameSocket._ins = new GameSocket();
		return GameSocket._ins;
	}    
	public constructor() {
		super(ParamMgr.serverUrl);
		this.type = egret.WebSocket.TYPE_BINARY;
        this.initEvnet();
	}
    public initEvnet(): void {
        this.addEventListener(egret.Event.CONNECT, this.onSockConnect, this,);
        this.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketDate, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }
	protected onSocketDate(evt: egret.ProgressEvent): void {
        //创建 ByteArray 对象
        var byte: egret.ByteArray = new egret.ByteArray();
        //读取数据
        this.readBytes(byte);
		HttpMgr.serverMessage(byte);
    }
	protected onSocketError(evt: egret.Event): void {
		GameLogic.GAME_STATUS = 1;
		ViewManager.ins().open(TipsWin,"确定","网络已断开,请重新连接","提示","",()=>{
                location.replace(document.referrer);
            },null,this)
    }

	protected onSocketClose(evt: egret.Event): void {
		SystemInstance.removeTimeHandle(this.sendHeart);
		GameLogic.GAME_STATUS = 1;
		ViewManager.ins().open(TipsWin,"确定","网络已断开,请重新连接","提示","",()=>{
                location.replace(document.referrer);
            },null,this)
    }
	protected onSockConnect(evt: egret.Event): void {
		SystemInstance.addTimeHandle(this.sendHeart,30000,this);
	}
	private sendHeart():void
	{
		HttpMgr.ins.sendMessage(ClientPacket.s_10000,{},ServerPacket.LOGIC_URL);
	}

	 public sendSocket(data: egret.ByteArray, showLog: Boolean = false): void {
        if (this.connected) {data.bytes
			// data.endian = egret.Endian.LITTLE_ENDIAN;
			this.writeBytes(data);
        }
        else {
			
        }
    }
}