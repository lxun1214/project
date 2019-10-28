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
var ArtifactVo = (function (_super) {
    __extends(ArtifactVo, _super);
    function ArtifactVo() {
        var _this = _super.call(this) || this;
        _this.equipPos = -1;
        _this.gemPos = -1;
        return _this;
    }
    ArtifactVo.ins = function () {
        return _super.ins.call(this);
    };
    ArtifactVo.prototype.initEvent = function () {
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20018, this.onActivation, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20019, this.onReinforced, this);
    };
    /**
     * 请求神器激活
     */
    ArtifactVo.prototype.sendActivation = function (itemId) {
        var data = { itemId: itemId };
        HttpMgr.ins.sendMessage(ClientPacket.S_10018, data, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 神器激活返回
     */
    ArtifactVo.prototype.onActivation = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("神器激活成功！", false);
            this.updateArtList(e.data.itemId);
            // DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN,-1);
        }
    };
    /**
     * 请求神器升级
     */
    ArtifactVo.prototype.sendReinforced = function (itemId) {
        var data = { itemId: itemId };
        HttpMgr.ins.sendMessage(ClientPacket.S_10019, data, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 神器升级返回
     */
    ArtifactVo.prototype.onReinforced = function (e) {
        if (e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("神器升级成功！", false);
            this.updateArtList(e.data.itemId);
            // DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN,-1);
        }
    };
    /**
     * 更新神器列表
     */
    ArtifactVo.prototype.updateArtList = function (itemId) {
        var Acfg = ConfigMgr.gameConfig["artifact"];
        if (!UserVo.ins.artifactInfos) {
            UserVo.ins.artifactInfos = [];
            UserVo.ins.artifactInfos.push(itemId);
            AttributeUtlis.attributeMgr(Acfg[itemId], true);
        }
        else {
            var flag = false;
            for (var i = 0; i < UserVo.ins.artifactInfos.length; i++) {
                var id = UserVo.ins.artifactInfos[i];
                var cfg = Acfg[id];
                if (cfg.artifactType == Acfg[itemId].artifactType) {
                    AttributeUtlis.attributeMgr(cfg, false);
                    UserVo.ins.artifactInfos[i] = itemId;
                    AttributeUtlis.attributeMgr(Acfg[itemId + ""], true);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                UserVo.ins.artifactInfos.push(itemId);
                AttributeUtlis.attributeMgr(Acfg[itemId], true);
            }
        }
        DataEventDispatcher.dispatchEventWith(GameEvent.UPDATE_ARTIFACT_WIN, -1);
    };
    //初始化属性  叠加前面的
    ArtifactVo.prototype.initArtPropertys = function (info) {
        info = info ? info : UserVo.ins;
        var acfg = ConfigMgr.gameConfig["artifact"];
        for (var i = 0; i < info.artifactInfos.length; i++) {
            var id = info.artifactInfos[i];
            var cfg = acfg[id];
            // for(var j:number = cfg.artifactType*100+1;j<=id;j++)
            // {
            AttributeUtlis.attributeMgr(cfg, true, info.playerAttrInfo, info.jobId);
            // }
        }
    };
    ArtifactVo.prototype.listSort = function (a, b) {
        if (a > b)
            return -1;
        else if (a < b)
            return 1;
        return 0;
    };
    return ArtifactVo;
}(BaseClass));
__reflect(ArtifactVo.prototype, "ArtifactVo");
//# sourceMappingURL=ArtifactVo.js.map