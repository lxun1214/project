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
 * 神器Item
 */
var ArtifactItemRender = (function (_super) {
    __extends(ArtifactItemRender, _super);
    function ArtifactItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "ArtifactItemSkin";
        return _this;
    }
    ArtifactItemRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ArtifactItemRender.prototype.euiCompete = function () {
        this.dataChanged();
        DataEventDispatcher.dispatcher.addEventListener(GameEvent.RED_ARTIFACE, this.upRed, this);
    };
    ArtifactItemRender.prototype.upRed = function () {
        ViewManager.redToTarge(this.itemIcon, RemindMgr.artifactTips[this.itemIndex] != 0);
    };
    ArtifactItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        // this.itemConfing = this.data;
        var itemId = this.data.itemId;
        this.itemConfing = BagVo.ins().getItem(itemId);
        this.setIcon(this.itemConfing.iconID);
        // this.labName.text = this.itemConfing.name;
        // this.setCount(this.data.itemNum);
        this.setQuality(this.itemConfing.rank);
        this.validateNow();
        if (this.itemIndex == 0)
            UIDmgr.bindingUID(this, uid.af1);
        this.upRed();
    };
    ArtifactItemRender.prototype.setIcon = function (str) {
        this.itemIcon.setIcon(ResMgr.getGameItemPng(str));
    };
    /**
     * 品质
     */
    ArtifactItemRender.prototype.setQuality = function (rank) {
        this.itemIcon.setQuality(rank);
    };
    return ArtifactItemRender;
}(BaseItemRender));
__reflect(ArtifactItemRender.prototype, "ArtifactItemRender");
//# sourceMappingURL=ArtifactItemRender.js.map