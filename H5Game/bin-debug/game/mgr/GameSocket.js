var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameSocket = (function (_super) {
    __extends(GameSocket, _super);
    function GameSocket() {
        var _this = _super.call(this, ParamMgr.serverUrl) || this;
        _this.type = egret.WebSocket.TYPE_BINARY;
        _this.initEvnet();
        return _this;
    }
    Object.defineProperty(GameSocket, "ins", {
        get: function () {
            if (GameSocket._ins == null)
                GameSocket._ins = new GameSocket();
            return GameSocket._ins;
        },
        enumerable: true,
        configurable: true
    });
    GameSocket.prototype.initEvnet = function () {
        this.addEventListener(egret.Event.CONNECT, this.onSockConnect, this);
        this.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketDate, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    GameSocket.prototype.onSocketDate = function (evt) {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        //读取数据
        this.readBytes(byte);
        HttpMgr.serverMessage(byte);
    };
    GameSocket.prototype.onSocketError = function (evt) {
        GameLogic.GAME_STATUS = 1;
        ViewManager.ins().open(TipsWin, "确定", "网络已断开,请重新连接", "提示", "", function () {
            location.replace(document.referrer);
        }, null, this);
    };
    GameSocket.prototype.onSocketClose = function (evt) {
        SystemInstance.removeTimeHandle(this.sendHeart);
        GameLogic.GAME_STATUS = 1;
        ViewManager.ins().open(TipsWin, "确定", "网络已断开,请重新连接", "提示", "", function () {
            location.replace(document.referrer);
        }, null, this);
    };
    GameSocket.prototype.onSockConnect = function (evt) {
        SystemInstance.addTimeHandle(this.sendHeart, 30000, this);
    };
    GameSocket.prototype.sendHeart = function () {
        HttpMgr.ins.sendMessage(ClientPacket.s_10000, {}, ServerPacket.LOGIC_URL);
    };
    GameSocket.prototype.sendSocket = function (data, showLog) {
        if (showLog === void 0) { showLog = false; }
        if (this.connected) {
            data.bytes;
            // data.endian = egret.Endian.LITTLE_ENDIAN;
            this.writeBytes(data);
        }
        else {
        }
    };
    return GameSocket;
}(egret.WebSocket));
__reflect(GameSocket.prototype, "GameSocket");
//# sourceMappingURL=GameSocket.js.map