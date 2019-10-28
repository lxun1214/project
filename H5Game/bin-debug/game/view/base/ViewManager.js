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
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this._opens = [];
        _this._regesterInfo = {};
        _this._views = {};
        _this._hCode2Key = {};
        _this._opens = [];
        return _this;
    }
    ViewManager.ins = function () {
        return _super.ins.call(this);
    };
    /**
     * 注册面板
     * @param viewClass 类名
     * @param layer 层级
     */
    ViewManager.prototype.reg = function (viewClass, layer) {
        if (viewClass == null)
            return;
        var keys = egret.getQualifiedClassName(viewClass);
        if (this._regesterInfo[keys]) {
            return;
        }
        this._regesterInfo[keys] = [viewClass, layer];
    };
    ViewManager.prototype.getKey = function (viewClass) {
        return egret.getQualifiedClassName(viewClass);
    };
    /**
     * 销毁一个面板
     * @param tar
     */
    ViewManager.prototype.destroy = function (tar) {
        var keys = this._hCode2Key[tar.hashCode];
        delete this._views[keys];
    };
    /**
     * 统一打开窗口函数
     * @param viewClass 类名
     * @param param 打开窗口传入的参数
     */
    ViewManager.prototype.open = function (viewClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!SystemOpenMgr.checkOpen(viewClass, true))
            return;
        else {
            if (param) {
                for (var i = 0; i < param.length; i++) {
                    if (param[i] instanceof BaseView) {
                        if (!SystemOpenMgr.checkOpen(param[i], true))
                            return;
                    }
                }
            }
        }
        var key = this.getKey(viewClass);
        var info = this._regesterInfo[key];
        if (!viewClass.openCheck.apply(viewClass, param))
            return null;
        var view = this.openEasy.apply(this, [viewClass].concat(param));
        return view;
    };
    /**
     * 统一关闭窗口
     * @param viewClass 类名
     * @param param 传入的参数
     */
    ViewManager.prototype.close = function (viewClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!this.isShow(viewClass))
            return null;
        var key = this.getKey(viewClass);
        var view = this._views[key];
        if (view) {
            var viewIndex = this._opens.indexOf(key);
            if (viewIndex >= 0) {
                this._opens.splice(viewIndex, 1);
            }
            view.close.bind(view).apply(void 0, param);
            view.$onClose.apply(view);
            if (view.parent == LayerManager.UI_MainUI) {
                var tw = egret.Tween.get(view);
                tw.to({ x: -GlobalVo.GAME_W }, 200).call(function () {
                    view.x = GlobalVo.GAME_W;
                    view.removeFromParent();
                }, this);
            }
            else
                view.removeFromParent();
        }
        return view;
    };
    /**
     * 检测一个UI是否打开
     * @param viewClass 类名，类名字符串，类对象
     * @returns boolean;
     */
    ViewManager.prototype.isShow = function (viewClass) {
        return this._opens.indexOf(this.getKey(viewClass)) >= 0;
    };
    ViewManager.prototype.openEasy = function (viewClass) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var keys = this.getKey(viewClass);
        var view = this._views[keys];
        var info = this._regesterInfo[keys];
        if (!view) {
            view = new info[0]();
            this._views[keys] = view;
            this._hCode2Key[view.hashCode] = keys;
        }
        if (!view) {
            console.log("UI_" + keys + "不存在");
            return null;
        }
        if (view.isShow())
            return view;
        if (info[1] == LayerManager.UI_MainUI) {
            view.x = GlobalVo.GAME_W;
            var tw = egret.Tween.get(view);
            tw.to({ x: 0 }, 200);
        }
        view.addToParent(info[1]);
        view.open.bind(view).apply(void 0, param);
        if (this._opens.indexOf(keys) == -1) {
            this._opens.push(keys);
        }
        return view;
    };
    ViewManager.prototype.getView = function (nameClass) {
        var key = this.getKey(nameClass);
        return this._views[key];
    };
    /**
     * 关闭一级窗口
     */
    ViewManager.prototype.closeTopLevel = function (viewClass) {
        if (viewClass === void 0) { viewClass = null; }
        for (var i = this._opens.length - 1; i >= 0; i--) {
            var keys = this._opens[i];
            var view = this.getView(egret.getDefinitionByName(keys));
            if (view == viewClass) {
                continue;
            }
            if (view.isTopLevel) {
                this.close(keys, []);
            }
        }
    };
    ViewManager.getView = function (id) {
        switch (id) {
            case ViewID.shop:
                return ShopWin;
            case ViewID.pveII:
                return PVEWinII;
            case ViewID.pvp:
                return PVPWin;
        }
        return null;
    };
    ViewManager.redToTarge = function (targe, add) {
        var img = ViewManager.redDic[targe.hashCode];
        if (add) {
            if (!img) {
                if (targe["red"])
                    img = targe["red"];
                if (!img) {
                    img = new eui.Image();
                    img.x = targe.x + targe.width - 32;
                    img.y = targe.y;
                    img.source = RES.getRes("red");
                    // targe.addEventListener(egret.Event.RESIZE,()=>{
                    // 	img.x = targe.x + targe.width - 32;
                    // 	img.y = targe.y;
                    // },this);
                    if (targe.parent)
                        targe.parent.addChild(img);
                    // else
                    // 	throw new Error("红点添加错误!");
                }
                img.touchEnabled = false;
                ViewManager.redDic[targe.hashCode] = img;
            }
            img.visible = true;
        }
        else {
            if (img)
                img.visible = false;
        }
    };
    ViewManager.effectToTarge = function (targe, add) {
        var img = ViewManager.redDic[targe.hashCode];
        if (add) {
            if (!img) {
                if (targe["red"])
                    img = targe["red"];
                if (!img) {
                    img = ObjectPool.pop("clips.BmpClip");
                    img.x = targe.x + targe.width / 2;
                    img.y = targe.y + targe.height + 19 / 2;
                    ModelResMgr.getOtherEffect(10013, img);
                    if (targe.parent)
                        targe.parent.addChild(img);
                    // else
                    // 	throw new Error("红点添加错误!");
                }
                img.play(-1);
                img.touchEnabled = false;
                ViewManager.effectDic[targe.hashCode] = img;
            }
            img.visible = true;
        }
        else {
            if (img) {
                img.stop();
                img.visible = false;
            }
        }
    };
    ViewManager.redDic = {};
    ViewManager.effectDic = {};
    return ViewManager;
}(BaseClass));
__reflect(ViewManager.prototype, "ViewManager");
var ViewID;
(function (ViewID) {
    ViewID[ViewID["dx"] = 0] = "dx";
    ViewID[ViewID["shop"] = 1] = "shop";
    ViewID[ViewID["pvp"] = 2] = "pvp";
    ViewID[ViewID["pveII"] = 3] = "pveII";
    ViewID[ViewID["points"] = 4] = "points";
})(ViewID || (ViewID = {}));
//# sourceMappingURL=ViewManager.js.map