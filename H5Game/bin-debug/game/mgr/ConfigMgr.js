var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigMgr = (function () {
    function ConfigMgr() {
    }
    Object.defineProperty(ConfigMgr, "ins", {
        get: function () {
            if (ConfigMgr._ins == null)
                ConfigMgr._ins = new ConfigMgr();
            return ConfigMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    ConfigMgr.prototype.loadConfig = function () {
        this.configLoad = new egret.URLLoader();
        this.configLoad.dataFormat = egret.URLLoaderDataFormat.BINARY;
        this.configLoad.addEventListener(egret.Event.COMPLETE, this.loadZipCom, this);
        // this.configLoad.addEventListener(egret.ProgressEvent.PROGRESS,LoadingUI.ins.onProgress, this);
        this.configLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadZipErr, this);
        var url = ParamMgr.ressite + ParamMgr.gameSynRes + "/config/config.ce?v=" + ParamMgr.ver;
        var request = new egret.URLRequest(url);
        //开始加载
        this.configLoad.load(request);
    };
    ConfigMgr.prototype.loadZipCom = function (e) {
        var zip = new JSZip(e.target.data);
        ConfigMgr.gameConfig = {};
        for (var k in zip["files"]) {
            var datas = new egret.ByteArray(zip.file(k).asArrayBuffer());
            var s = datas.readUTFBytes(datas.readAvailable);
            if (true)
                egret.log(k);
            ConfigMgr.gameConfig[k.replace(".json", "")] = JSON.parse(s);
        }
        var b = ConfigMgr.gameConfig["globalConfig"]["guideCondition"];
        for (var i = 0; i < Guide.guideCfg.length; i++) {
            for (var j = 0; j < b.length; j++) {
                if (Guide.guideCfg[i].id == b[j].guideId) {
                    Guide.guideCfg[i].tiggers = b[j].tiggers;
                    Guide.guideCfg[i].des = b[j].des;
                    break;
                }
            }
        }
        egret.log("配置加载完毕！");
        this.debugVer();
        DataEventDispatcher.dispatchEventWith(ConfigMgr.LOAD_CONFIG_END);
    };
    ConfigMgr.prototype.loadZipErr = function (data) {
        egret.log("配置加载错误！");
    };
    ConfigMgr.prototype.debugVer = function () {
        if (true) {
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
    };
    ConfigMgr.LOAD_CONFIG_END = "LOAD_CONFIG_END";
    return ConfigMgr;
}());
__reflect(ConfigMgr.prototype, "ConfigMgr");
//# sourceMappingURL=ConfigMgr.js.map