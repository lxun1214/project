var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpMgr = (function () {
    // private httpPool:Array<egret.HttpRequest>;
    function HttpMgr() {
        // this.httpPool = new Array<egret.HttpRequest>();
    }
    Object.defineProperty(HttpMgr, "ins", {
        get: function () {
            if (HttpMgr._ins == null)
                HttpMgr._ins = new HttpMgr();
            return HttpMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    HttpMgr.prototype.sendMessage = function (msgName, data, url, clearPool) {
        if (clearPool === void 0) { clearPool = false; }
        var msg = ProtoBufMgr.ins.getMessageClass(msgName); //ProtoBufMgr.ins.getMessageClass(LaunchChallengeRequest_10022)
        var message = {
            "cmd": ProtoBufMgr.ins.getMessageId(msgName),
            "body": msg.encode(msg.create(data)).finish(),
        };
        var ProMessage = ProtoBufMgr.ins.getMessageClass("BaseMessage");
        var messageBuffer = ProMessage.encode(ProMessage.create(message)).finish();
        if (url == ServerPacket.LOGIC_URL) {
            GameSocket.ins.sendSocket(new egret.ByteArray(messageBuffer));
            return;
        }
        // if(clearPool)
        // 	this.httpPool.length = 0;
        var gameHttp;
        // if(this.httpPool.length > 0)
        // 	gameHttp = this.httpPool.pop();
        // else
        gameHttp = new egret.HttpRequest();
        gameHttp.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        gameHttp.open((url == ServerPacket.LOGIN_URL ? ParamMgr.serverUrl : ParamMgr.gameUrl) + url, egret.HttpMethod.POST);
        gameHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        gameHttp.send(messageBuffer);
        gameHttp.once(egret.Event.COMPLETE, this.onPostComplete, this);
        gameHttp.once(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        gameHttp.once(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
    };
    HttpMgr.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        HttpMgr.serverMessage(new egret.ByteArray(request.response));
    };
    HttpMgr.serverMessage = function (buffer) {
        var uint8 = new Uint8Array(HttpMgr.getUint8Array(buffer));
        var baseMsg = ProtoBufMgr.ins.getMessageClass("BaseMessage");
        if (uint8.length == 0) {
            egret.log("收到空数据!");
            return;
        }
        var data = baseMsg.decode(uint8);
        //解析具体数据
        var msgName = ProtoBufMgr.ins.getMessageName(data.cmd);
        if (!msgName) {
            egret.log(data.cmd + "协议暂未注册!");
            return;
        }
        var msg = ProtoBufMgr.ins.getMessageClass(msgName);
        var obj = msg.decode(data.body);
        var c = "C_" + data.cmd;
        if (data.cmd != 10) {
            MessageMgr.messageHandler(ServerPacket[c], obj);
        }
        else {
            var o = ErrorMgr.ins().showError(obj.errorCode);
            // var s:string = o?o.msg:obj.errorCode + "";
            // UserTips.ins().showTips(s);
        }
    };
    HttpMgr.prototype.onPostIOError = function (event) {
        console.log("post error : " + event);
        // this.httpPool.push(event.target);
    };
    HttpMgr.prototype.onPostProgress = function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    HttpMgr.getUint8Array = function (byte) {
        var data = [];
        for (var i = 0; i < byte.dataView.byteLength; i++) {
            data.push(byte.dataView.getUint8(i));
        }
        return data;
    };
    return HttpMgr;
}());
__reflect(HttpMgr.prototype, "HttpMgr");
//# sourceMappingURL=HttpMgr.js.map