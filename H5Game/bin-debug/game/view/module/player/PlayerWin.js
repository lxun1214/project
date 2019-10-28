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
/**
 * 角色界面
 */
var PlayerWin = (function (_super) {
    __extends(PlayerWin, _super);
    function PlayerWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerSkin";
        return _this;
    }
    PlayerWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.dg.itemRenderer = PropertyRender;
        this.role.source = "h_" + UserVo.ins.sex + "_png";
    };
    PlayerWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.update();
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            this.addTouchEvent(this["equip" + i], this.onEquip);
            this["equip" + i].name = i + "";
        }
        this.addTouchEvent(this.labTypes, this.onTap);
        this.addTouchEvent(this.btnGem, this.onTap);
        this.addTouchEvent(this.btnForge, this.onTap);
        this.addTouchEvent(this.btnArtifact, this.onTap);
        this.addEvent(GameEvent.UPDATE_PLAYER_WIN, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UPDATE_BAG_DATA, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UP_STRENGTH, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UP_ADVANCE, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UPDATE_ARTIFACT_WIN, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UPDATE_GEM_DATA, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, DataEventDispatcher.dispatcher, this.update);
        this.addEvent(GameEvent.UP_PLAYER_PROPERTY + propertyType.fightPower, DataEventDispatcher.dispatcher, this.upPower);
        UIDmgr.bindingUID(this.btnForge, uid.forgeBtn0);
        UIDmgr.bindingUID(this.btnArtifact, uid.af0);
        UIDmgr.bindingUID(this.btnGem, uid.bs0);
        this.upPower();
        // var c:clips.BmpClip = ModelResMgr.getOtherEffect(2022);
        // c.play(-1);
        // this["g0"].addChild(c);
        this.addEvent(GameEvent.RED_ARTIFACE, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_STRENG, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_EQUIP_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_GEM_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.addEvent(GameEvent.RED_GEM_LVL, DataEventDispatcher.dispatcher, this.upRed);
        this.upRed(null);
    };
    PlayerWin.prototype.upPower = function () {
        this.f.text = UserVo.ins.fightPower + "";
    };
    PlayerWin.prototype.upRed = function (e) {
        if (!e || e.type == GameEvent.RED_ARTIFACE)
            ViewManager.redToTarge(this.btnArtifact, (RemindMgr.artifactTips.indexOf(1) != -1) || (RemindMgr.artifactTips.indexOf(2) != -1));
        if (!e || e.type == GameEvent.RED_STRENG || GameEvent.RED_EQUIP_LVL)
            ViewManager.redToTarge(this.btnForge, (RemindMgr.StrengEquips.length > 0) || (RemindMgr.upEquipsLvl.length > 0));
        if (!e || e.type == GameEvent.RED_GEM_LVL)
            ViewManager.redToTarge(this.btnGem, (RemindMgr.GEM));
    };
    PlayerWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_PLAYER_WIN, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_BAG_DATA, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_STRENGTH, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_ADVANCE, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_ARTIFACT_WIN, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_GEM_DATA, this.update, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UP_PLAYER_PROPERTY + propertyType.level, this.update, this);
    };
    PlayerWin.prototype.update = function () {
        if (!UserVo.ins.Columns)
            return;
        for (var i = 0; i < UserVo.ins.Columns.length; i++) {
            var itemInfo = UserVo.ins.Columns[i].itemInfo;
            this["equip" + i].data = itemInfo ? itemInfo : null;
        }
        var a = [];
        for (var j = 0; j < 12; j++) {
            if (!PlayerWin.HERO_TYPE[j])
                continue;
            else {
                a.push([ConfigMgr.gameConfig["attributeName"][PlayerWin.HERO_TYPE[j]].value, Math.floor(UserVo.ins.playerAttrInfo[PlayerWin.HERO_TYPE[j]])]);
            }
        }
        this.dg.dataProvider = new eui.ArrayCollection(a);
    };
    PlayerWin.prototype.onTap = function (e) {
        var uiView = ViewManager.ins().getView(UIView);
        switch (e.currentTarget) {
            case this.labTypes:
                ViewManager.ins().open(PlayerTypesView);
                break;
            case this.btnForge:
                ViewManager.ins().open(ForgeWin);
                break;
            case this.btnGem:
                ViewManager.ins().open(GemWin);
                break;
            case this.btnArtifact:
                ViewManager.ins().open(ArtifactWin);
                break;
        }
    };
    PlayerWin.prototype.onEquip = function (e) {
        var equip = e.currentTarget;
        var index = parseInt(equip.name);
        // if(!equip.data){
        ViewManager.ins().open(PlayerEquipReplaceView, equip.data, index);
        // }else{
        // 	ViewManager.ins().open(PlayerEquipReplaceView,equip.data,index);
        // }
    };
    PlayerWin.HERO_TYPE = ["attackInit", "armorInit", "magicAttack", "magicArmorInit", "critRate", "critDamage", "blood"];
    return PlayerWin;
}(BaseEuiView));
__reflect(PlayerWin.prototype, "PlayerWin");
ViewManager.ins().reg(PlayerWin, LayerManager.UI_MainUI);
//# sourceMappingURL=PlayerWin.js.map