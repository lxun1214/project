class GameScene {
    public static ins: GameScene;

    public input: eui.TextInput;


    private gameRoot: eui.UILayer;

    public constructor(root: eui.UILayer) {
        GameScene.ins = this;
        this.gameRoot = root;

        LayerManager.mapLayer.name = "地图层";
        root.addChild(LayerManager.mapLayer);

        LayerManager.UI_MainUI.touchEnabled = LayerManager.UI_Main.touchEnabled = LayerManager.UI_Popup.touchEnabled = LayerManager.UI_Tips.touchEnabled = false;
        root.addChild(LayerManager.UI_Main);
        root.addChild(LayerManager.UI_MainUI);
        root.addChild(LayerManager.UI_Popup);
        root.addChild(LayerManager.UI_Tips);

        LayerManager.guideLayer.name = "引导层";
        LayerManager.guideLayer.touchEnabled = false;
        root.addChild(LayerManager.guideLayer);


        GameMap.ins(LayerManager.mapLayer);
        GameMap.ins().setDisplaySize(this.gameRoot.stage.stageWidth,this.gameRoot.stage.stageHeight);
        // var btn: eui.Button = new eui.Button();
        // btn.label = "测试";
        // btn.width = 150;
        // btn.height = 30;
        // btn.x = (GlobalVo.GAME_W - btn.width) >> 1;
        // btn.y = GlobalVo.GAME_H - 500;
        // root.addChild(btn);
        // btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //     GameLogic.GAME_STATUS = GameLogic.GAME_STATUS == 0?1:0;
            //  location.replace(document.referrer);
            // ViewManager.ins().open(TipsWin,"确定啊","显示内容","测试窗口","取消啊",()=>{
            //     egret.log("确定回调");
            // },()=>{
            //     egret.log("取消回调");
            // },this)
        // },this);

        this.input = new eui.TextInput();
        this.input.visible = false;
        this.input.text = "点击输入GM指令sssssssssssss";
        // this.input.y = 50;
        // this.input.x = 400;
        this.input.width = 200;
        this.input.height = 50;
        root.addChild(this.input);

        SkillMgr.ins;
        ViewManager.ins().open(MainUIWin);
        GameLogic.ins.changeMap(UserVo.ins.points);

         SoundManager.ins().playEffect("bgm_mp3");
    }
}