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
var ChatWin = (function (_super) {
    __extends(ChatWin, _super);
    function ChatWin() {
        var _this = _super.call(this) || this;
        _this.dy = 0;
        _this.skinName = "ChatSkin";
        _this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //if(UserVo.ins.level < 50)
            //	return UserTips.ins().showTipsBigToSmall("等级不足50级无法发送!");
            if (_this.txt.text == "")
                return UserTips.ins().showTipsBigToSmall("请输入要发送的内容!");
            if (_this.txt.text.length > 24)
                return UserTips.ins().showTipsBigToSmall("发送的内容长度不能超过24!");
            HttpMgr.ins.sendMessage(ClientPacket.S_30000, { type: 0, content: _this.txt.text }, ServerPacket.LOGIC_URL, true);
            _this.txt.text = "";
        }, _this);
        return _this;
    }
    ChatWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addEvent(GameEvent.UP_CHAT, DataEventDispatcher.dispatcher, this.addMessage);
        this.addMessage();
    };
    ChatWin.prototype.addMessage = function () {
        var render;
        var d = this.g0.numChildren;
        var n = ChatMgr.ins().chatArr.length;
        if (n == d)
            return;
        while (n != d) {
            render = ObjectPool.pop("ChatRender");
            render.data = ChatMgr.ins().chatArr[d];
            render.y = this.dy;
            this.dy += render.height + 5;
            this.g0.addChild(render);
            d++;
        }
        this.checkDel();
    };
    ChatWin.prototype.checkDel = function () {
        var n = ChatMgr.ins().chatArr.length;
        if (n >= 100) {
            var r;
            while (n > 30) {
                ChatMgr.ins().chatArr.shift();
                n--;
                r = this.g0.getChildAt(0);
                r.dispose();
            }
            this.dy = 0;
            for (var i = 0; i < 30; i++) {
                r = this.g0.getChildAt(i);
                r.y = this.dy;
                this.dy += r.height + 5;
            }
        }
    };
    return ChatWin;
}(BaseEuiView));
__reflect(ChatWin.prototype, "ChatWin");
ViewManager.ins().reg(ChatWin, LayerManager.UI_MainUI);
//# sourceMappingURL=ChatWin.js.map