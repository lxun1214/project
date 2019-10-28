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
var ChatRender = (function (_super) {
    __extends(ChatRender, _super);
    function ChatRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChatRenderSkin";
        return _this;
    }
    ChatRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var v = this.data;
        if (!v.id || v.id == "") {
            this.g0.visible = false;
            this.ln.text = "系统广播:";
            this.icon.source = null;
        }
        else {
            this.vip.text = v.vipLvl + "";
            this.g0.visible = v.vipLvl > 0;
            // this.ln.x = v.vipLvl>0?64:0;
            this.icon.source = "human" + v.sex + "_png";
            this.ln.text = v.playName + ":";
        }
        // this.ln.width = this.ln.textWidth+5;
        this.ld.text = v.des;
        this.ld.height = 89;
        // this.ld.x = this.ln.x + this.ln.width + 5;
        // this.height = this.ld.height = this.ld.textHeight + 5;
    };
    ChatRender.prototype.dispose = function () {
        if (this.parent)
            this.parent.removeChild(this);
        ObjectPool.push(this);
    };
    return ChatRender;
}(eui.ItemRenderer));
__reflect(ChatRender.prototype, "ChatRender");
//# sourceMappingURL=ChatRender.js.map