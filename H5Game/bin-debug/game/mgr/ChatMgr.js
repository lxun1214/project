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
var ChatMgr = (function (_super) {
    __extends(ChatMgr, _super);
    function ChatMgr() {
        var _this = _super.call(this) || this;
        _this.chatArr = [];
        return _this;
    }
    ChatMgr.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    ChatMgr.prototype.addChatMessage = function (d) {
        var vo = ObjectPool.pop("ChatVo");
        vo.type = d.type;
        vo.des = d.content;
        vo.id = d.id;
        vo.playName = d.playName;
        vo.vipLvl = d.vipLevel;
        vo.sex = d.sex;
        this.chatArr.push(vo);
        DataEventDispatcher.dispatchEventWith(GameEvent.UP_CHAT);
    };
    return ChatMgr;
}(BaseClass));
__reflect(ChatMgr.prototype, "ChatMgr");
var ChatVo = (function () {
    function ChatVo() {
    }
    return ChatVo;
}());
__reflect(ChatVo.prototype, "ChatVo");
//# sourceMappingURL=ChatMgr.js.map