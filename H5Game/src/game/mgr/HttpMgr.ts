class HttpMgr {
	private static _ins:HttpMgr;
	public static get ins():HttpMgr
	{
		if(HttpMgr._ins == null)
			HttpMgr._ins = new HttpMgr();
		return HttpMgr._ins;
	}
	// private httpPool:Array<egret.HttpRequest>;
	public constructor() {
		// this.httpPool = new Array<egret.HttpRequest>();
	}

	public sendMessage(msgName:string,data:any,url:string,clearPool:boolean=false):void
	{
		var msg:any = ProtoBufMgr.ins.getMessageClass(msgName);//ProtoBufMgr.ins.getMessageClass(LaunchChallengeRequest_10022)
		var message: any = {
            "cmd": ProtoBufMgr.ins.getMessageId(msgName),
            "body": msg.encode(msg.create(data)).finish(),
            // "uuid": UserVo.ins.uuid
        }
		var ProMessage:any = ProtoBufMgr.ins.getMessageClass("BaseMessage");
 		var messageBuffer: any = ProMessage.encode(ProMessage.create(message)).finish();
		 if(url == ServerPacket.LOGIC_URL)
		 {
			 GameSocket.ins.sendSocket(new egret.ByteArray(messageBuffer));
			 return;
		 }

		// if(clearPool)
		// 	this.httpPool.length = 0;

		var gameHttp:egret.HttpRequest;
		// if(this.httpPool.length > 0)
		// 	gameHttp = this.httpPool.pop();
		// else
			gameHttp = new egret.HttpRequest();
		gameHttp.responseType = egret.HttpResponseType.ARRAY_BUFFER;
		gameHttp.open((url == ServerPacket.LOGIN_URL?ParamMgr.serverUrl:ParamMgr.gameUrl)+ url,egret.HttpMethod.POST);
		gameHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		gameHttp.send(messageBuffer);
		gameHttp.once(egret.Event.COMPLETE,this.onPostComplete,this);
		gameHttp.once(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
		gameHttp.once(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
	}

	private onPostComplete(event:egret.Event) {
        var request = <egret.HttpRequest>event.currentTarget;
		HttpMgr.serverMessage(new egret.ByteArray(request.response));
    }

	static serverMessage(buffer:egret.ByteArray):void
	{
		var uint8: Uint8Array = new Uint8Array(HttpMgr.getUint8Array(buffer));
		var baseMsg:any = ProtoBufMgr.ins.getMessageClass("BaseMessage");
		if(uint8.length == 0)
		{
			egret.log("收到空数据!");
			return;
		}
		var data: any = baseMsg.decode(uint8);
		//解析具体数据
		var msgName = ProtoBufMgr.ins.getMessageName(data.cmd);
		if(!msgName)
		{
			egret.log(data.cmd + "协议暂未注册!");
			return;
		}
		var msg = ProtoBufMgr.ins.getMessageClass(msgName);
		var obj:any = msg.decode(data.body);
		var c:string = "C_" + data.cmd;
		if(data.cmd != 10)
		{
			MessageMgr.messageHandler(ServerPacket[c],obj);
		}
		else
		{
			var o:any = ErrorMgr.ins().showError(obj.errorCode);
			// var s:string = o?o.msg:obj.errorCode + "";
			// UserTips.ins().showTips(s);
		}
	}

    private onPostIOError(event:egret.IOErrorEvent):void {
        console.log("post error : " + event);
		// this.httpPool.push(event.target);
    }

    private onPostProgress(event:egret.ProgressEvent):void {
        console.log("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }

	static getUint8Array(byte: egret.ByteArray): Array<number> { 
        let data: Array<number> = [];
        for (let i: number = 0; i < byte.dataView.byteLength; i++) {
             data.push(byte.dataView.getUint8(i));
        }
        return data;
    }

	// static getUint8ArrayII(byte: egret.ByteArray): Array<number> { 
    //     let data: Array<number> = [];
    //     for (let i: number = 0; i < byte.dataView.byteLength; i++) {
    //          data.push(byte.dataView.getUint8(i));
    //     }
    //     return data;
    // }
}