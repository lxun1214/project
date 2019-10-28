var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtoBufMgr = (function () {
    function ProtoBufMgr() {
        this.messageIdDic = {};
        this.messageNameDic = {};
        //请求协议
        var key;
        for (var k in ClientPacket) {
            key = parseInt(k.toString().split("_")[1]);
            this.messageIdDic[key] = ClientPacket[k];
            this.messageNameDic[ClientPacket[k]] = key;
        }
        //返回消息
        for (var k in ServerPacket) {
            key = parseInt(k.toString().split("_")[1]);
            this.messageIdDic[key] = ServerPacket[k];
            this.messageNameDic[ServerPacket[k]] = key;
        }
    }
    Object.defineProperty(ProtoBufMgr, "ins", {
        get: function () {
            if (ProtoBufMgr._ins == null)
                ProtoBufMgr._ins = new ProtoBufMgr();
            return ProtoBufMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**通过协议ID获取协议名称 */
    ProtoBufMgr.prototype.getMessageName = function (id) {
        return this.messageIdDic[id];
    };
    /**通过协议名称获取协议ID */
    ProtoBufMgr.prototype.getMessageId = function (name) {
        return this.messageNameDic[name];
    };
    ProtoBufMgr.prototype.loadProtoBuf = function () {
        var a = ProtoBufMgr.filenames;
        var s = ProtoBufMgr.total = a.length;
        this.messageArr = [];
        for (var i = 0; i < s; i++) {
            protobuf.load(ParamMgr.ressite + ParamMgr.gameSynRes + "/pb/" + a[i] + ".proto?v=" + ConfigMgr.gameConfig["globalConfig"].protoVer, this.loadComplete);
        }
    };
    ProtoBufMgr.prototype.loadComplete = function (err, root) {
        var c = ProtoBufMgr.ins.getMessageMb(root);
        ProtoBufMgr.ins.messageArr.push(c);
        //LoadingUI.ins.onProgress(ProtoBufMgr.ins.messageArr.length,ProtoBufMgr.total);
        if (ProtoBufMgr.ins.messageArr.length == ProtoBufMgr.total) {
            egret.log("proto加载完毕！");
            DataEventDispatcher.dispatchEventWith(ProtoBufMgr.LOAD_PROTO_END);
        }
    };
    ProtoBufMgr.prototype.getMessageMb = function (a) {
        var c = a["nested"];
        for (var k in c) {
            if (egret.getQualifiedClassName(c[k]) != "Namespace" && egret.getQualifiedClassName(c[k]) != "i")
                return c;
            return this.getMessageMb(c[k]);
        }
    };
    /** 通过消息名获取tbase消息体的 类（可以new）。*/
    ProtoBufMgr.prototype.getMessageClass = function ($name) {
        for (var i = 0; i < this.messageArr.length; i++) {
            var protocol = this.messageArr[i]["" + $name];
            if (protocol != undefined) {
                return protocol;
            }
        }
        return null;
    };
    ProtoBufMgr.LOAD_PROTO_END = "LOAD_PROTO_END";
    ProtoBufMgr.filenames = [
        "basePack",
        "pb_user",
        "pb_player"
    ];
    return ProtoBufMgr;
}());
__reflect(ProtoBufMgr.prototype, "ProtoBufMgr");
//# sourceMappingURL=ProtoBufMgr.js.map