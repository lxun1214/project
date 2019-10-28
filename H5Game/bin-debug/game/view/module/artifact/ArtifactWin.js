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
var ArtifactWin = (function (_super) {
    __extends(ArtifactWin, _super);
    function ArtifactWin() {
        var _this = _super.call(this) || this;
        _this.isSatisfy = false;
        _this.isActivation = false; //是否激活
        _this.skinName = "ArtifactSkin";
        return _this;
        // this.pt.titleImg.source = "t_3";
    }
    ArtifactWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.glowFilter = new egret.GlowFilter(0xFF3030, 0.8, 35, 35, 2, 3 /* HIGH */, false, false);
        this.mc = ObjectPool.pop("clips.BmpClip");
        this["aft"].addChild(this.mc);
    };
    ArtifactWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.selectIndex = param[0] | 0;
        this.itemList.itemRenderer = ArtifactItemRender;
        // this.playerView.update();
        this.panel1.setTile("当前属性加成", 0);
        this.panel2.setTile("下级属性加成", 1);
        this.update();
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.UPDATE_ARTIFACT_WIN, this.update, this);
        this.addTouchEvent(this.btns, this.onTop);
        UIDmgr.bindingUID(this["gb"], uid.afParent);
    };
    ArtifactWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this);
        DataEventDispatcher.dispatcher.removeEventListener(GameEvent.UPDATE_ARTIFACT_WIN, this.update, this);
    };
    ArtifactWin.prototype.update = function () {
        var initList = [];
        for (var i = 1; i < 100; i++) {
            var id = 40001 + i * 100;
            var cfg = ConfigMgr.gameConfig["artifact"][id];
            if (!cfg)
                break;
            initList.push(cfg);
        }
        this.itemList.dataProvider = new eui.ArrayCollection(initList);
        this.artList = UserVo.ins.artifactInfos;
        this.selectItem();
    };
    ArtifactWin.prototype.onBarItemTap = function (e) {
        // console.log(e.itemIndex);
        if (this.currItem)
            this.currItem.filters = [];
        this.currItem = e.itemRenderer;
        if (!this.curItem)
            this.curItem = this.itemList.getVirtualElementAt(0);
        if (this.currItem)
            this.currItem.filters = [this.glowFilter];
        // this.curItem = e.item;
        this.selectIndex = e.itemIndex ? e.itemIndex : 0;
        this.selectItem();
    };
    ArtifactWin.prototype.selectItem = function () {
        var id = 40001 + (this.selectIndex + 1) * 100;
        var cfg = ConfigMgr.gameConfig["item"][id];
        if (!cfg)
            return;
        // this.aft.source = ResMgr.getGameOtherPng("art_" + cfg.iconID);
        ModelResMgr.getOtherEffect(cfg.iconID, this.mc);
        this.mc.play(-1);
        var bagData = BagVo.ins().getIdItem(id);
        // this.isSatisfy = bagData && bagData.itemNum >= 1;
        var artCfg = ConfigMgr.gameConfig["artifact"][id];
        this.curItem = artCfg;
        this.isActivation = false;
        for (var i = 0; i < this.artList.length; i++) {
            var data = ConfigMgr.gameConfig["artifact"][this.artList[i]];
            if (data && data.artifactType == artCfg.artifactType) {
                this.isActivation = true;
                this.curItem = data;
                break;
            }
        }
        this.artNameImg.source = ResMgr.getGameOtherPng("art_name_" + cfg.iconID);
        this.panel1.updateType(this.curItem.itemId);
        this.panel2.updateType(this.curItem.itemId + 1);
        var isPOP = false;
        if (!this.isActivation) {
            this.labNo.visible = true;
            if (artCfg.access == 1) {
                this.isSatisfy = UserVo.ins.MAX_POINTS >= artCfg.btainConditions;
                this.labNeed.text = "通关关卡：" + artCfg.btainConditions;
            }
            else if (artCfg.access == 2) {
                this.isSatisfy = UserVo.ins.rebirthNum >= artCfg.btainConditions;
                this.labNeed.text = "重生：" + artCfg.btainConditions;
            }
            else if (artCfg.access == 3) {
                this.isSatisfy = UserVo.ins.vipLevel >= artCfg.btainConditions;
                this.labNeed.text = "VIP等级：" + artCfg.btainConditions;
            }
            else if (artCfg.access == 4) {
                this.isSatisfy = BagVo.ins().getIdItem(artCfg.itemId) ? true : false;
                var d = BagVo.ins().getItem(artCfg.itemId);
                this.labNeed.text = d.name + "X 1(首充可获得)";
            }
            else if (artCfg.access == 5) {
                this.isSatisfy = BagVo.ins().getIdItem(artCfg.itemId) ? true : false;
                var d = BagVo.ins().getItem(artCfg.itemId);
                this.labNeed.text = d.name + "X 1(商城可购买获得)";
            }
            //isPOP = artCfg.btainConditions == 0;
            this.btns.icon = "激活";
            UIDmgr.bindingUID(this.btns, uid.af2);
        }
        else {
            this.btns.icon = "升级";
            this.labNo.visible = false;
            isPOP = this.curItem.strengthenArtifactStone == 0;
            this.labNeed.text = "消耗神器石：" + UserVo.ins.strengthenArtifactStone + "/" + this.curItem.strengthenArtifactStone;
            UIDmgr.bindingUID(this.btns, uid.af3);
            this.isSatisfy = UserVo.ins.strengthenArtifactStone >= this.curItem.strengthenArtifactStone;
        }
        this.btns.visible = true;
        if (isPOP) {
            this.labNeed.text = "神器已达最大等级";
            this.btns.visible = false;
        }
        this.labNeed.textColor = this.isSatisfy ? ColorUtlis.COLOR_GREEN : ColorUtlis.COLOR_RED;
    };
    ArtifactWin.prototype.onTop = function () {
        if (!this.curItem && GuideMgr.currentGuide && (GuideMgr.currentGuide.id == 10 || GuideMgr.currentGuide.id == 11))
            this.curItem = this.itemList.getVirtualElementAt(0);
        if (!this.isSatisfy) {
            if (!this.isActivation) {
                UserTips.ins().showTipsBigToSmall("条件不足，不可激活神器");
            }
            else {
                UserTips.ins().showTipsBigToSmall("神器石不足");
            }
            return;
        }
        if (!this.isActivation) {
            ArtifactVo.ins().sendActivation(this.curItem.itemId);
        }
        else {
            ArtifactVo.ins().sendReinforced(this.curItem.itemId);
        }
    };
    return ArtifactWin;
}(BaseEuiView));
__reflect(ArtifactWin.prototype, "ArtifactWin");
ViewManager.ins().reg(ArtifactWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ArtifactWin.js.map