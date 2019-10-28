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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadNum = 0;
        return _this;
    }
    Main.prototype.createChildren = function () {
        Main.instance = this;
        _super.prototype.createChildren.call(this);
        // this.loadingView = new LoadingUI();
        // this.addChild(this.loadingView);
        // var d:number= 0;
        // egret.setInterval(()=>{
        //     d ++ ;
        //     this.loadingView.onProgress(d%10,10);
        // },this,1000);
        // return;
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        // UserVo.NO_GUIDE = DEBUG;
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.left = this.right = this.top = this.bottom = 0;
        // StageUtils.ins().setScaleMode(egret.StageScaleMode.SHOW_ALL);
        // StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
        eui.Label.default_fontFamily = "Microsoft YaHei";
        try {
            var main_stage = StageUtils.ins().getStage();
            //egret.log("屏幕适配模式   orientation:" + main_stage.orientation + " scaleMode:" + main_stage.scaleMode);
            var winWidth = 0;
            var winHeight = 0;
            if (window.innerWidth)
                winWidth = window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))
                winWidth = document.body.clientWidth;
            if (window.innerHeight)
                winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                winHeight = document.body.clientHeight;
            if (egret.Capabilities.isMobile) {
                egret.log("屏幕适配 IsMobile");
                var userAgent = navigator.userAgent;
                egret.log("IsMobile userAgent: " + userAgent);
                // if (navigator.userAgent.indexOf("iPhone") > -1
                // 	|| navigator.userAgent.indexOf("iPhone") > -1
                // 	|| navigator.userAgent.indexOf("Mac") > -1
                // ) {
                // 	//苹果手机?
                // } else {
                //非苹果手机
                StageUtils.ins().getStage().orientation = egret.OrientationMode.PORTRAIT;
                StageUtils.ins().getStage().scaleMode = egret.StageScaleMode.FIXED_NARROW;
                // }
                // return;
            }
            else {
                // egret.log("屏幕适配  PC");
                if (winWidth >= winHeight) {
                    StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
                    StageUtils.ins().getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
                }
                else {
                    StageUtils.ins().getStage().orientation = egret.OrientationMode.PORTRAIT;
                    StageUtils.ins().getStage().scaleMode = egret.StageScaleMode.FIXED_NARROW;
                }
            }
            egret.log("屏幕适配模式 2   orientation:" + main_stage.orientation + " scaleMode:" + main_stage.scaleMode);
        }
        catch (e) {
            egret.log("自适应屏幕出错:" + e);
        }
        egret.log(egret.Capabilities.os);
        ParamMgr.initParam();
        this.runGame().catch(function (e) {
            console.log(e);
        });
        egret.log("当前游戏版本号:" + ParamMgr.ver);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target instanceof eui.Button)
                SoundManager.ins().playEffect("butt0n_mp3");
        }, this);
    };
    Main.prototype.window_W_H = function (width, height) {
        if (egret.Capabilities.isMobile) {
            // this.stage.orientation = egret.OrientationMode.PORTRAIT;
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            return;
        }
        else {
            if (width >= height) {
                this.stage.orientation = egret.OrientationMode.AUTO;
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                this.stage.orientation = egret.OrientationMode.PORTRAIT;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            }
        }
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadingView = new LoadingUI();
                this.loadingView.addEventListener(LoadingUI.LOAD_UI_CREATE, this.beginGameLoad, this);
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.beginGameLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addChild(this.loadingView);
                        showLoad(-1);
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.loadData();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        LoadingUI.ins.onProgress(1, 7);
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        LoadingUI.ins.onProgress(2, 7);
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 3:
                        _a.sent();
                        LoadingUI.ins.onProgress(3, 7);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.loadData = function () {
        switch (this.loadNum) {
            case 0:
                LoadingUI.ins.onProgress(4, 7);
                DataEventDispatcher.dispatcher.addEventListener(ConfigMgr.LOAD_CONFIG_END, this.loadComplete, this);
                ConfigMgr.ins.loadConfig();
                break;
            case 1:
                LoadingUI.ins.onProgress(5, 7);
                DataEventDispatcher.dispatcher.removeEventListener(ConfigMgr.LOAD_CONFIG_END, this.loadComplete, this);
                DataEventDispatcher.dispatcher.addEventListener(ProtoBufMgr.LOAD_PROTO_END, this.loadComplete, this);
                ProtoBufMgr.ins.loadProtoBuf();
                break;
            case 2:
                LoadingUI.ins.onProgress(6, 7);
                DataEventDispatcher.dispatcher.removeEventListener(ProtoBufMgr.LOAD_PROTO_END, this.loadComplete, this);
                DataEventDispatcher.dispatcher.addEventListener(TMXMgr.LOAD_TMX_END, this.loadComplete, this);
                TMXMgr.ins().loadTmx();
                break;
            default:
                DataEventDispatcher.dispatcher.removeEventListener(TMXMgr.LOAD_TMX_END, this.loadComplete, this);
                //showLoad(-1);
                this.prepareGame();
                break;
        }
    };
    Main.prototype.loadComplete = function () {
        this.loadNum++;
        this.loadData();
    };
    Main.prototype.prepareGame = function () {
        this.removeChild(this.loadingView);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2002, this.loginBack, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2005, this.loginBack, this);
        if (ParamMgr.SPID != 0) {
            // let decode = this.base64_decode(ParamMgr.tickets);
            // let _arr = decode.split("&");
            // let arr  = _arr.map((e)=>{
            //     return e.split("=")
            // });
            // ParamMgr.username = arr[0][1].replace(/\'/g,"");
            // ParamMgr.nickname = arr[1][1].replace(/\'/g,"");
            var data = {
                sdkType: ParamMgr.SPID,
                sdkUserId: ParamMgr.username,
                optional: "optional"
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_1005, data, ServerPacket.LOGIN_URL);
            return;
        }
        this.loginV = new LoginView();
        this.loginV.x = (GlobalVo.GAME_W - this.loginV.width) / 2;
        this.loginV.y = (GlobalVo.GAME_H - this.loginV.height) / 2;
        this.addChild(this.loginV);
    };
    //登陆返回
    Main.prototype.loginBack = function (e) {
        // this.loginV.dispose();
        // this.loginV = null;
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2002, this.loginBack, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2003, this.serverList, this);
        if (!e.data.isSuccess) {
            UserTips.ins().showTipsBigToSmall("游戏登陆失败,请重新刷新游戏!");
            return;
        }
        UserVo.ins.userId = e.data.userId;
        this.recommend = e.data.serverInfo;
        HttpMgr.ins.sendMessage(ClientPacket.S_1003, {}, ServerPacket.LOGIN_URL, true);
    };
    Main.prototype.serverList = function (e) {
        if (this.loginV) {
            this.loginV.dispose();
            this.loginV = null;
        }
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2003, this.serverList, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2004, this.serverUrlBack, this);
        this.sl = new SelectLogin(this.recommend, e.data.pbServerInfoList);
        this.sl.x = (GlobalVo.GAME_W - this.sl.width) / 2;
        this.sl.y = (GlobalVo.GAME_H - this.sl.height) / 2;
        this.addChild(this.sl);
    };
    //服务器地址返回
    Main.prototype.serverUrlBack = function (e) {
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2004, this.serverUrlBack, this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20001, this.goGameBack, this);
        GlobalVo.token = e.data.token;
        ParamMgr.gameUrl = "http://" + e.data.serverIp + ":" + e.data.serverPort + "/";
        ServerPacket.LOGIC_URL = e.data.serverAddress;
        GameSocket.ins.addEventListener(egret.Event.CONNECT, function () {
            var data = {
                userId: UserVo.ins.userId,
                token: GlobalVo.token,
                serverId: GlobalVo.serverId
            };
            HttpMgr.ins.sendMessage(ClientPacket.S_10001, data, ServerPacket.LOGIC_URL, true);
        }, this);
        //GameSocket.ins.connect(e.data.serverIp, e.data.serverPort);
        GameSocket.ins.connectByUrl("ws://" + e.data.serverIp + ":" + e.data.serverPort + "/" + ServerPacket.LOGIC_URL);
    };
    Main.prototype.goGameBack = function (e) {
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_20001, this.goGameBack, this);
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_20002, this.goGameBack, this);
        if (!this.cr)
            UserVo.ins.uuid = e.data.uuid;
        if (!e.data.playerInfo) {
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20002, this.goGameBack, this);
            //进入创角
            this.sl.dispose();
            this.sl = null;
            this.cr = new CreateRole();
            this.cr.x = (GlobalVo.GAME_W - this.cr.width) / 2;
            this.cr.y = (GlobalVo.GAME_H - this.cr.height) / 2;
            this.addChild(this.cr);
            return;
        }
        else {
            UserVo.ins.setData(e.data.playerInfo);
            this.createGameScene();
        }
        if (this.sl) {
            this.sl.dispose();
            this.sl = null;
        }
        if (this.cr) {
            this.cr.dispose();
            this.cr = null;
        }
    };
    Main.prototype.createGameScene = function () {
        HttpMgr.ins.sendMessage(ClientPacket.S_10003, null, ServerPacket.LOGIC_URL, true);
        // DataEventDispatcher.dispatcher.addEventListener(BaseMap.LOAD_MAP_COMPLETE,this.initModel,this);
        clips.ClipGroup.loadNum = 10;
        new ModelResMgr();
        new GameScene(this);
        // this.loadUiII = new eui.Component();
        // this.loadUiII.verticalCenter = this.loadUiII.horizontalCenter = 0;
        // this.loadUiII.skinName = "LoadUISkinII";
        // this.addChild(this.loadUiII);
        // SystemInstance.addTimeHandle(this.upProgress,500,this);
        //申请背包数据
        // HttpMgr.ins.sendMessage(ClientPacket.S_10003,null,ServerPacket.LOGIC_URL,true);
    };
    // private lx:number = 0;
    // private upProgress():void
    // {
    //     this.lx += 10;
    //     if(this.lx >= 100)
    //         this.lx = 100;
    //     this.loadUiII["pro"].value = this.lx;
    // }
    // private initModel():void
    // {
    //     this.removeChild(this.loadUiII);
    //     this.loadUiII = null;
    //     DataEventDispatcher.dispatcher.removeEventListener(BaseMap.LOAD_MAP_COMPLETE,this.initModel,this);
    //     SystemInstance.removeTimeHandle(this.upProgress);
    // }
    Main.prototype.base64_encode = function (str) {
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var i = 0, len = str.length, string = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            string += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return string;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map