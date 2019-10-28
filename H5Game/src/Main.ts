//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare function showLoad(v0,v1?,s?)
declare function clickThis(vo)
class Main extends eui.UILayer {

    protected createChildren(): void {
		 Main.instance = this;
        super.createChildren();
        // this.loadingView = new LoadingUI();
        // this.addChild(this.loadingView);
        // var d:number= 0;
        // egret.setInterval(()=>{
        //     d ++ ;
        //     this.loadingView.onProgress(d%10,10);
        // },this,1000);
        // return;
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }
        // UserVo.NO_GUIDE = DEBUG;
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.left = this.right = this.top = this.bottom = 0;
        // StageUtils.ins().setScaleMode(egret.StageScaleMode.SHOW_ALL);
        // StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;

        eui.Label.default_fontFamily = "Microsoft YaHei";
		try {
			let main_stage: egret.Stage = StageUtils.ins().getStage();
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
			} else {
				// egret.log("屏幕适配  PC");
				if (winWidth >= winHeight) {
					StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
					StageUtils.ins().getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
				} else {
					StageUtils.ins().getStage().orientation = egret.OrientationMode.PORTRAIT;
					StageUtils.ins().getStage().scaleMode = egret.StageScaleMode.FIXED_NARROW;
				}
			}
			egret.log("屏幕适配模式 2   orientation:" + main_stage.orientation + " scaleMode:" + main_stage.scaleMode);
		} catch (e) {
			egret.log("自适应屏幕出错:" + e);
		}
        egret.log(egret.Capabilities.os);
        ParamMgr.initParam();
        this.runGame().catch(e => {
            console.log(e);
        })

        egret.log("当前游戏版本号:" + ParamMgr.ver);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            if(e.target instanceof eui.Button)
                SoundManager.ins().playEffect("butt0n_mp3");
        },this);
    }
	 public static instance: Main
    public window_W_H(width: number, height: number): void {
        if (egret.Capabilities.isMobile) {
            // this.stage.orientation = egret.OrientationMode.PORTRAIT;
            // this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            return;
        } else {
             if (width >= height) {
                 this.stage.orientation = egret.OrientationMode.AUTO;
                 this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
             } else {
                this.stage.orientation = egret.OrientationMode.PORTRAIT;
                this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
             }
        }
    }
    private async runGame() {
        this.loadingView = new LoadingUI();
        this.loadingView.addEventListener(LoadingUI.LOAD_UI_CREATE,this.beginGameLoad,this);
    }

    private async beginGameLoad()
    {
        this.addChild(this.loadingView);
        showLoad(-1);
        await this.loadResource();
        this.loadData();
    }

    private loadingView:LoadingUI;
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            LoadingUI.ins.onProgress(1,7);
            await this.loadTheme();
            LoadingUI.ins.onProgress(2,7);
            await RES.loadGroup("preload");
            LoadingUI.ins.onProgress(3,7);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private loadNum:number = 0;
    public loadData():void
    {
        switch(this.loadNum)
        {
            case 0:
               LoadingUI.ins.onProgress(4,7);
                DataEventDispatcher.dispatcher.addEventListener(ConfigMgr.LOAD_CONFIG_END,this.loadComplete,this);
                ConfigMgr.ins.loadConfig();
                break;
            case 1:
            	LoadingUI.ins.onProgress(5,7);
                DataEventDispatcher.dispatcher.removeEventListener(ConfigMgr.LOAD_CONFIG_END,this.loadComplete,this);
                DataEventDispatcher.dispatcher.addEventListener(ProtoBufMgr.LOAD_PROTO_END,this.loadComplete,this);
                ProtoBufMgr.ins.loadProtoBuf();
                break;
            case 2:
                LoadingUI.ins.onProgress(6,7);
                DataEventDispatcher.dispatcher.removeEventListener(ProtoBufMgr.LOAD_PROTO_END,this.loadComplete,this);
                DataEventDispatcher.dispatcher.addEventListener(TMXMgr.LOAD_TMX_END,this.loadComplete,this);
                TMXMgr.ins().loadTmx();
                break;
            default:
                DataEventDispatcher.dispatcher.removeEventListener(TMXMgr.LOAD_TMX_END,this.loadComplete,this);
                //showLoad(-1);
                this.prepareGame();
                break;
        }
    }
    private loadComplete():void
    {
        this.loadNum ++;
        this.loadData();
    }

    /**
     * 准备进入游戏
     * Create scene interface
     */
    private loginV:LoginView;
    protected prepareGame(): void {
        this.removeChild(this.loadingView);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2002,this.loginBack,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2005,this.loginBack,this);
        if(ParamMgr.SPID != 0)//1手游迷
        {
            // let decode = this.base64_decode(ParamMgr.tickets);
            // let _arr = decode.split("&");
            // let arr  = _arr.map((e)=>{
            //     return e.split("=")
            // });

            // ParamMgr.username = arr[0][1].replace(/\'/g,"");
            // ParamMgr.nickname = arr[1][1].replace(/\'/g,"");
            var data:Object = {
                    sdkType:ParamMgr.SPID,
                    sdkUserId:ParamMgr.username,
                    optional:"optional"
            }
            HttpMgr.ins.sendMessage(ClientPacket.S_1005,data,ServerPacket.LOGIN_URL);
            return;
        }

        this.loginV = new LoginView();
        this.loginV.x = (GlobalVo.GAME_W - this.loginV.width)/2;
        this.loginV.y = (GlobalVo.GAME_H - this.loginV.height)/2;
        this.addChild(this.loginV);
        
    }

    private sl:SelectLogin;
    //登陆返回
    private loginBack(e:egret.Event):void
    {
        // this.loginV.dispose();
        // this.loginV = null;
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2002,this.loginBack,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2003,this.serverList,this);
        if(!e.data.isSuccess)
        {
            UserTips.ins().showTipsBigToSmall("游戏登陆失败,请重新刷新游戏!");
            return;
        }
        UserVo.ins.userId = e.data.userId;
        this.recommend = e.data.serverInfo;
        HttpMgr.ins.sendMessage(ClientPacket.S_1003,{},ServerPacket.LOGIN_URL,true);
    }
    private recommend:any;
    private serverList(e:egret.Event):void
    {
        if(this.loginV)
        {
            this.loginV.dispose();
            this.loginV = null;
        }
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2003,this.serverList,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_2004,this.serverUrlBack,this);
        this.sl = new SelectLogin(this.recommend,e.data.pbServerInfoList);
        this.sl.x = (GlobalVo.GAME_W - this.sl.width)/2;
        this.sl.y = (GlobalVo.GAME_H - this.sl.height)/2;
        this.addChild(this.sl);
    }

    //服务器地址返回
    private serverUrlBack(e:egret.Event):void
    {
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_2004,this.serverUrlBack,this);
        DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20001,this.goGameBack,this);
         GlobalVo.token = e.data.token;
         ParamMgr.gameUrl = "http://" +  e.data.serverIp + ":" + e.data.serverPort + "/";
         ServerPacket.LOGIC_URL = e.data.serverAddress;
         GameSocket.ins.addEventListener(egret.Event.CONNECT,()=>{
            var data:Object = {
            userId:UserVo.ins.userId,
            token:GlobalVo.token,
            serverId:GlobalVo.serverId
            }
            HttpMgr.ins.sendMessage(ClientPacket.S_10001,data,ServerPacket.LOGIC_URL,true);
         },this);
         //GameSocket.ins.connect(e.data.serverIp, e.data.serverPort);
         GameSocket.ins.connectByUrl("ws://" + e.data.serverIp + ":" + e.data.serverPort  + "/" + ServerPacket.LOGIC_URL );
    }

    //进入游戏返回
    private cr:CreateRole;
    private goGameBack(e:egret.Event):void
    {
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_20001,this.goGameBack,this);
        DataEventDispatcher.dispatcher.removeEventListener(ServerPacket.C_20002,this.goGameBack,this);
        if(!this.cr)
            UserVo.ins.uuid = e.data.uuid;
        if(!e.data.playerInfo)
        {
            DataEventDispatcher.dispatcher.addEventListener(ServerPacket.C_20002,this.goGameBack,this);
            //进入创角
            this.sl.dispose();
            this.sl = null
            this.cr = new CreateRole();
            this.cr.x = (GlobalVo.GAME_W - this.cr.width)/2;
            this.cr.y = (GlobalVo.GAME_H - this.cr.height)/2;
            this.addChild(this.cr);
            return;
        }else
        {
            UserVo.ins.setData(e.data.playerInfo)
            this.createGameScene();
        }
        if(this.sl)
        {
             this.sl.dispose();
             this.sl = null;
        }
        if(this.cr)
        {
            this.cr.dispose();
            this.cr = null;
        }
    }

    //进入游戏、创建场景
    public loadUiII:eui.Component;
    protected createGameScene():void
    {
        HttpMgr.ins.sendMessage(ClientPacket.S_10003,null,ServerPacket.LOGIC_URL,true);
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
    }

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



    public base64_encode(str):string{
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";        
        var i = 0, len= str.length, string = '';
    
        while (i < len){
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len){
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len){
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
            string += base64EncodeChars.charAt(c3 & 0x3F)
        }
            return string
    }
}
