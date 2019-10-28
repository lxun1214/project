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
var GemItemBase = (function (_super) {
    __extends(GemItemBase, _super);
    function GemItemBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "GemItemSkin";
        _this.itemIcon.labName.visible = false;
        return _this;
    }
    GemItemBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.mc = ModelResMgr.getOtherEffect(10027);
        this["g0"].addChild(this.mc);
    };
    GemItemBase.prototype.euiCompete = function () {
        this.btnGroup.visible = false;
    };
    GemItemBase.prototype.dataChanged = function () {
        this.clearData();
        if (this.data) {
            if (this.data.isOpen) {
                this.mc.stop();
                this.mc.visible = false;
            }
            else {
                this.mc.play(-1);
                this.mc.visible = true;
            }
        }
        if (!this.data || this.data.gemId == 0)
            return;
        this.addTouchEvent(this.upBtn, this.onTap);
        this.addTouchEvent(this.downBtn, this.onTap);
        var itemId = this.data.gemId;
        this.itemIcon.data = BagVo.ins().getItem(itemId);
        // this.setIcon(this.itemConfing.iconID);
        this.labLv.text = "LV." + GemVo.ins().getGemLv(itemId);
        // this.labName.text = this.itemConfing.name;
        // this.labName.textColor = ColorUtlis.QUALITY_COLOR[this.itemConfing.rank];
        // this.setQuality(this.itemConfing.rank);
        // this.setGemType();
    };
    /**
     * 品质
     */
    // public setQuality(rank: number): void{
    // 	this.itemIcon.setQuality(rank);
    // }
    // public setIcon(str: string): void{
    // 	this.itemIcon.setIcon(ResMgr.getGameItemPng(str));
    // }
    // private setGemType(): void{
    // 	this.labType.text = GemVo.ins().getGemType(this.data.gemId);//this.itemConfing.description;
    // }
    GemItemBase.prototype.onTap = function (e) {
        if (this.upBtn == e.currentTarget) {
            GemVo.ins().upGem(this.data);
        }
        else if (this.downBtn == e.currentTarget) {
            GemVo.ins().sendGemRemoveRequest(this.data.loc);
        }
    };
    GemItemBase.prototype.setBtnGrou = function (flag, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 8; }
        this.btnGroup.visible = flag;
        if (flag && x == 0)
            x = this.itemIcon.width + 5;
        this.btnGroup.x = x;
        this.btnGroup.y = y;
    };
    GemItemBase.prototype.clearData = function () {
        this.itemIcon.setIcon("");
        this.itemIcon.setQuality(-1);
        this.labLv.text = "";
        // this.labName.text = "";
        // this.labType.text = "";
        this.removeTouchEvent(this.upBtn, this.onTap);
        this.removeTouchEvent(this.downBtn, this.onTap);
        // this.filters = [this.glowFilter];
    };
    return GemItemBase;
}(BaseItemRender));
__reflect(GemItemBase.prototype, "GemItemBase");
//# sourceMappingURL=GemItemBase.js.map