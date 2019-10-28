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
 * 指引的触发类型定义
 */
var tigger;
(function (tigger) {
    tigger[tigger["rebirthNum"] = 0] = "rebirthNum";
    tigger[tigger["points"] = 1] = "points";
    tigger[tigger["level"] = 2] = "level";
    tigger[tigger["guideEndId"] = 3] = "guideEndId";
    tigger[tigger["sceneType"] = 4] = "sceneType";
    tigger[tigger["closeUid"] = 5] = "closeUid";
    tigger[tigger["openUid"] = 6] = "openUid";
})(tigger || (tigger = {}));
/**
 * 指引ui的枚举定义
 */
var uid;
(function (uid) {
    uid[uid["fubenType"] = 0] = "fubenType";
    uid[uid["skill0"] = 1] = "skill0";
    uid[uid["skill1"] = 2] = "skill1";
    uid[uid["bag"] = 3] = "bag";
    uid[uid["equipBtn"] = 4] = "equipBtn";
    uid[uid["bagItem"] = 5] = "bagItem";
    uid[uid["itemcd"] = 6] = "itemcd";
    uid[uid["itemParent"] = 7] = "itemParent";
    uid[uid["mainUiBtn"] = 8] = "mainUiBtn";
    uid[uid["roleBtn"] = 9] = "roleBtn";
    uid[uid["forgeBtn0"] = 10] = "forgeBtn0";
    uid[uid["forgeBtn1"] = 11] = "forgeBtn1";
    uid[uid["forgeEquip"] = 12] = "forgeEquip";
    uid[uid["forgeBtn2"] = 13] = "forgeBtn2";
    uid[uid["forgeBtn3"] = 14] = "forgeBtn3";
    uid[uid["forgeBtn4"] = 15] = "forgeBtn4";
    uid[uid["forgeBtn5"] = 16] = "forgeBtn5";
    uid[uid["bossBtn"] = 17] = "bossBtn";
    uid[uid["af0"] = 18] = "af0";
    uid[uid["af1"] = 19] = "af1";
    uid[uid["af2"] = 20] = "af2";
    uid[uid["af3"] = 21] = "af3";
    uid[uid["afParent"] = 22] = "afParent";
    uid[uid["fb0"] = 23] = "fb0";
    uid[uid["fb1"] = 24] = "fb1";
    uid[uid["fb2"] = 25] = "fb2";
    uid[uid["fb11"] = 26] = "fb11";
    uid[uid["fb111"] = 27] = "fb111";
    uid[uid["rw0"] = 28] = "rw0";
    uid[uid["rw1"] = 29] = "rw1";
    uid[uid["rwParent"] = 30] = "rwParent";
    uid[uid["jn0"] = 31] = "jn0";
    uid[uid["jn1"] = 32] = "jn1";
    uid[uid["jn2"] = 33] = "jn2";
    uid[uid["jn3"] = 34] = "jn3";
    uid[uid["jn4"] = 35] = "jn4";
    uid[uid["jnP0"] = 36] = "jnP0";
    uid[uid["jnP1"] = 37] = "jnP1";
    uid[uid["jnP2"] = 38] = "jnP2";
    uid[uid["bs0"] = 39] = "bs0";
    uid[uid["bs1"] = 40] = "bs1";
    uid[uid["bs2"] = 41] = "bs2";
    uid[uid["bs3"] = 42] = "bs3";
    uid[uid["bs4"] = 43] = "bs4";
    uid[uid["bsParent"] = 44] = "bsParent";
    uid[uid["p0"] = 45] = "p0";
    uid[uid["p1"] = 46] = "p1";
    uid[uid["rl0"] = 47] = "rl0";
    uid[uid["rl1"] = 48] = "rl1";
    uid[uid["cj0"] = 49] = "cj0";
    uid[uid["cj1"] = 50] = "cj1";
    uid[uid["cjParent"] = 51] = "cjParent";
    uid[uid["back0"] = 52] = "back0";
    uid[uid["back1"] = 53] = "back1";
    uid[uid["back2"] = 54] = "back2";
    uid[uid["beginGame"] = 55] = "beginGame";
    uid[uid["beginGameP"] = 56] = "beginGameP";
    uid[uid["cs0"] = 57] = "cs0";
    uid[uid["cs1"] = 58] = "cs1";
})(uid || (uid = {}));
/**
 * 指引的状态定义
 */
var guideStep;
(function (guideStep) {
    guideStep[guideStep["init"] = 0] = "init";
    guideStep[guideStep["onTigger"] = 1] = "onTigger";
    guideStep[guideStep["onReady"] = 2] = "onReady";
    guideStep[guideStep["onAction"] = 3] = "onAction";
    guideStep[guideStep["End"] = 4] = "End";
})(guideStep || (guideStep = {}));
/**
 * 指引数据结构
 */
var TiggerStruct = (function () {
    function TiggerStruct(data) {
        this.id = data.id;
        this.min = data.min;
        this.max = data.max;
        this.value = data.value;
    }
    /**
     * 检测数据是否符合
     */
    TiggerStruct.prototype.check = function (data) {
        if (data == undefined) {
            return true;
        }
        else if (this.min != undefined && this.max != undefined) {
            return Boolean(data >= this.min && data <= this.max);
        }
        else if (this.min != undefined) {
            return Boolean(data >= this.min);
        }
        else if (this.max != undefined) {
            return Boolean(data <= this.max);
        }
        else if (this.value != undefined) {
            return Boolean(data == this.value);
        }
        else {
            return true;
        }
    };
    Object.defineProperty(TiggerStruct.prototype, "data", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TiggerStruct.prototype, "type", {
        /**
         * 获取触发类型
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    return TiggerStruct;
}());
__reflect(TiggerStruct.prototype, "TiggerStruct");
/**
 *指引对象
 * @author
 *  侦听指引的触发
 *  触发完成后自动添加到指引队列
 *  实现指引的动作
 *
 */
var Guide = (function () {
    function Guide(cfg, index) {
        this._id = 0;
        this._status = 0;
        this.tiggerNum = 0;
        this.tiggerVal = new Object(); //触发开始
        this.hideVal = new Object(); //触发隐藏
        this.endActions = new Object(); //触发关闭
        this.actions = new Array();
        /**
         * 点击动作
         */
        this.currUid = 0;
        if (!Guide.pointer) {
            Guide.pointer = new Pointer();
        }
        if (!cfg) {
            throw (new Error("无效的指引配置！" + index));
        }
        this._id = cfg.id;
        //初始触发事件
        var tiggers = cfg.tiggers;
        this.tiggerNum = tiggers.length;
        tiggers.sort(function (a, b) {
            if (a["id"] > b["id"]) {
                return 1;
            }
            else {
                return 0;
            }
        });
        for (var i = 0; i < tiggers.length; i++) {
            this.tiggerVal[String(tiggers[i].id)] = new TiggerStruct(tiggers[i]);
            GuideMgr.addTiggerEventListener(tiggers[i].id, this.tiggerFunc, this);
        }
        //初始隐藏事件
        var hidetgrs = cfg.hideTiggers;
        if (hidetgrs) {
            for (i = 0; i < hidetgrs.length; i++) {
                this.hideVal[String(hidetgrs[i].id)] = new TiggerStruct(hidetgrs[i]);
            }
        }
        //初始关闭事件
        var endacts = cfg.breakOff;
        if (endacts) {
            for (i = 0; i < endacts.length; i++) {
                this.endActions[String(endacts[i].id)] = new TiggerStruct(endacts[i]);
                GuideMgr.addTiggerEventListener(endacts[i].id, this.breakOff, this);
            }
        }
        //初始动作列表
        var acts = cfg.actions;
        for (i = 0; i < acts.length; i++) {
            this.actions.push(acts[i]);
        }
        this._status = guideStep.onTigger;
    }
    Object.defineProperty(Guide.prototype, "status", {
        /**
         * 是否已经结束
         */
        get: function () {
            return this._status;
        },
        /**
         * 是否已经结束
         */
        set: function (s) {
            this._status = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guide.prototype, "id", {
        /**
         * 获取指引id
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 触发计数
     */
    Guide.prototype.tiggerFunc = function (evt) {
        if (this._status != guideStep.onTigger) {
            return;
        }
        var data = this.tiggerVal[evt.type];
        if (!data || data.check(evt.data)) {
            GuideMgr.removeTiggerEventListener(evt.type, this.tiggerFunc, this);
            if (Number(evt.type) == tigger.guideEndId) {
                this.tiggerNum = 0;
                for (var k in this.tiggerVal) {
                    data = this.tiggerVal[k];
                    if (data && Number(k) != tigger.guideEndId) {
                        this.tiggerNum++;
                        GuideMgr.addTiggerEventListener(Number(k), this.tiggerFunc, this);
                    }
                }
                if (this.tiggerNum != 0) {
                    return;
                }
            }
            this.tiggerNum--;
            if (this.tiggerNum <= 0) {
                this._status = guideStep.onReady;
                GuideMgr.addGuide(this);
            }
        }
    };
    /**
     * 触发关闭
     */
    Guide.prototype.breakOff = function (evt) {
        if (this._status != guideStep.onAction) {
            return;
        }
        var tigger = this.endActions[evt.type];
        if (!tigger || tigger.check(evt.data)) {
            for (var k in this.breakOff) {
                GuideMgr.removeTiggerEventListener(k.toString(), this.breakOff, this);
            }
            this.end();
        }
    };
    /**
     * 开始指引
     */
    Guide.prototype.start = function () {
        this._status = guideStep.onAction;
        var i, act;
        for (i = this.actions.length - 1; i >= 0; i--) {
            act = this.actions[i];
            GuideMgr.addUidEventListener(Number(act.uid), this.actFunc, this);
        }
    };
    /**
     * 更新指引,用于定位指引箭头
     */
    Guide.prototype.update = function () {
        if (this._status == guideStep.End) {
            return;
        }
        var i, act, disObj;
        var show = false;
        if (this.actions.length == 0)
            this.end();
        for (i = this.actions.length - 1; i >= 0; i--) {
            act = this.actions[i];
            if (this.currUid < i)
                continue;
            //引导切换功能页-是否跳过
            if (act.uid == uid.mainUiBtn) {
                var view = ViewManager.ins().getView(MainUIWin);
                if (view.g0.visible) {
                    this.currUid++;
                    act = this.actions[i + 1];
                }
            }
            disObj = UIDmgr.getUIByUID(Number(act.uid));
            if (disObj && SystemInstance.checkDisplayVisibled(disObj)) {
                Guide.pointer.pointerTo(disObj, act.parent, act);
                show = true;
                //trace("指引ui",act.uid).toChannel(chl.guide);
                break;
            }
        }
        Guide.pointer.visible = (this.checkHide() && show) ? true : false;
    };
    /**
     * 检测是否隐藏
     */
    Guide.prototype.checkHide = function () {
        var k, data, val;
        for (k in this.hideVal) {
            data = this.hideVal[k];
            switch (data.type) {
                case tigger.openUid:
                    var dis = UIDmgr.getUIByUID(data.data);
                    if (dis && SystemInstance.checkDisplayVisibled(dis)) {
                        return true;
                    }
                    break;
                case tigger.closeUid:
                    var dis = UIDmgr.getUIByUID(data.data);
                    if (!dis || !SystemInstance.checkDisplayVisibled(dis)) {
                        return true;
                    }
                    break;
                case tigger.sceneType:
                    //暂时不处理
                    // if (data.check(GameMap.ins().mapType)) {
                    return true;
                    // }
                    break;
            }
        }
        return false;
    };
    Guide.prototype.actFunc = function (evt) {
        if (evt.data) {
            var uid = Number(evt.data);
            var act = this.actions[this.actions.length - 1];
            if (Number(act.uid) == uid) {
                this.end();
            }
            for (var i = 0; i < this.actions.length; i++) {
                if (this.actions[i].uid == uid) {
                    this.currUid = i + 1;
                    break;
                }
            }
        }
    };
    /**
     * 结束
     */
    Guide.prototype.end = function () {
        for (var i = 0; i < this.actions.length; i++) {
            GuideMgr.removeUidEventListener(String(this.actions[i].uid), this.actFunc, this);
        }
        this._status = guideStep.End;
        if (Guide.pointer) {
            Guide.pointer.hide();
        }
        GuideMgr.dispatchTiggerEvent(tigger.guideEndId, this._id);
    };
    //指引配置，json格式
    Guide.guideCfg = [
        {
            id: 1,
            tiggers: //此字段子项皆为与逻辑
            [],
            actions: [
                { uid: uid.beginGame, des: "点击开始游戏", dir: 0 },
            ],
            hideTiggers: [
                { id: tigger.sceneType, value: MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des: []
        },
        {
            id: 4,
            tiggers: //此字段子项皆为与逻辑
            [],
            actions: [
                { uid: uid.mainUiBtn, des: "点击主页", dir: 3 },
                { uid: uid.jn0, des: "打开技能界面", dir: 2 },
                { uid: uid.jn1, des: "选择第一个技能", dir: 2 },
                { uid: uid.jn3, des: "直接装配技能", dir: 2 },
                { uid: uid.back0, des: "返回主页", dir: 1 },
                { uid: uid.back1, des: "返回战斗界面", dir: 2 },
                { uid: uid.skill0, des: "释放技能", dir: 2 },
            ],
            hideTiggers: [
                { id: tigger.sceneType, value: MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des: []
        },
        // {
        //     id: 3,//引导装配更换技能并释放
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.jn0,des:"打开技能界面",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.jn4,des:"选择第二个技能",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.jn3,des:"直接装配技能",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.back0,des:"返回主页",dir:1,xy:[1,0,0,-125]},
        //         { uid:uid.back1,des:"返回战斗界面",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.skill0,des:"释放技能",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
        //     ]
        // },
        {
            id: 3,
            tiggers: //此字段子项皆为与逻辑
            [],
            actions: [
                { uid: uid.mainUiBtn, des: "点击主页", dir: 3, },
                { uid: uid.bag, des: "进入背包", dir: 2 },
                { uid: uid.equipBtn, des: "打开装备背包", dir: 2, },
                { uid: uid.bagItem, parent: uid.itemParent, des: "点击装备物品", dir: 0, },
                { uid: uid.itemcd, des: "点击穿戴装备", dir: 0, },
                { uid: uid.back0, des: "关闭界面返回", dir: 1, },
                { uid: uid.back1, des: "回到关卡", dir: 2 },
            ],
            hideTiggers: [
                { id: tigger.sceneType, value: MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des: []
        },
        // {
        //     id: 5,//强化
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.forgeBtn0,des:"点击锻造\n进入强化界面",dir:2,xy:[0,0,0,100]},
        //         { uid:uid.forgeBtn1,des:"选择强化的装备",dir:3,xy:[0,0,0,70]},
        //         { uid:uid.forgeBtn2,des:"选择强化功能",dir:2,xy:[0,0,70,70]},
        //         { uid:uid.forgeBtn3,des:"点击强化装备",dir:2,xy:[0,0,-120,80]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-150,-125]},
        //         // { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
        //     ]
        // },
        {
            id: 2,
            tiggers: //此字段子项皆为与逻辑
            [],
            actions: [
                { uid: uid.bossBtn, des: "进入关卡BOSS", dir: 2 },
            ],
            hideTiggers: [
                { id: tigger.sceneType, value: MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des: []
        },
        {
            id: 5,
            tiggers: //此字段子项皆为与逻辑
            [],
            actions: [
                { uid: uid.cs0, des: "点击重生", dir: 1 },
                { uid: uid.cs1, des: "点击重生", dir: 2 },
            ],
            hideTiggers: [
                { id: tigger.sceneType, value: MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des: []
        },
    ];
    return Guide;
}());
__reflect(Guide.prototype, "Guide");
/**
 *指引管理器
 * @author
 *  控制符合触发条件的指引按触发的时间顺序运行
 *  提供的触发事件的派发接口
 *  提供触发事件的侦听接口
 *  提供指引操作的事件派发接口
 *  提供指引操作事件侦听接口
 *
 */
var GuideMgr = (function () {
    function GuideMgr() {
        this.guides = new Array();
        this.tiggerDispatcher = new egret.EventDispatcher();
        this.uidDispatcher = new egret.EventDispatcher();
        /**
         * 初始化
         */
        this.openFistGuide = false;
        this.guideQueues = new Array();
        SystemInstance.addTimeHandle(this.update, 100, this);
    }
    GuideMgr.isGuidIng = function (id) {
        return (GuideMgr.currentGuide && GuideMgr.currentGuide.id == id);
    };
    GuideMgr.createAndInit = function (records) {
        GuideMgr._instance = new GuideMgr();
        var i, bit, record;
        var index = 0;
        var hasDonels = new Array();
        var cfgs = new Array();
        for (i = 0; i < Guide.guideCfg.length; i++) {
            if (cfgs[Guide.guideCfg[i].id] != undefined) {
                throw (new Error("指引编号定义重复！" + Guide.guideCfg[i].id));
            }
            cfgs[Guide.guideCfg[i].id] = Guide.guideCfg[i];
        }
        GuideMgr._instance.records = new Array();
        for (i = 0; i < records.length; i++) {
            record = records[i];
            GuideMgr._instance.records.push(record);
            for (bit = 0; bit < 32; bit++) {
                if (cfgs[index]) {
                    if ((record & (1 << bit)) == 0 && !UserVo.NO_GUIDE) {
                        GuideMgr._instance.guides.push(new Guide(cfgs[index], index));
                        if (index == 1)
                            GuideMgr._instance.openFistGuide = true;
                    }
                    else {
                        hasDonels.push(index);
                    }
                }
                index++;
            }
        }
        for (i = 0; i < hasDonels.length; i++) {
            GuideMgr.dispatchTiggerEvent(tigger.guideEndId, hasDonels[i]);
        }
    };
    /**
     * 返回指定的指引是否已完成
     */
    GuideMgr.checkGuideHasDone = function (guideId) {
        var index = Math.floor(guideId / 32);
        var record = GuideMgr._instance.records[index];
        if (record != undefined) {
            return Boolean(record & Math.pow(2, guideId % 32));
        }
        else {
            return false;
        }
    };
    GuideMgr.prototype.setRecords = function (value) {
        this.records = value;
    };
    GuideMgr.prototype.haveGuide = function (id) {
        var index = Math.floor(id / 32);
        var record = this.records[index];
        if (record == undefined) {
            record = 0;
        }
        var bit = id % 32;
        var res = record & (1 << bit);
        return res > 0;
    };
    /**
     * 保存
     */
    GuideMgr.prototype.save = function (id) {
        var index = Math.floor(id / 32);
        var record = this.records[index];
        if (record == undefined) {
            record = 0;
        }
        var bit = id % 32;
        record |= (1 << bit);
        this.records[index] = record;
        HttpMgr.ins.sendMessage(ClientPacket.S_10036, { guideStep: record }, ServerPacket.LOGIC_URL, true);
    };
    /**
     * 更新指引
     */
    GuideMgr.prototype.update = function () {
        // if (GlobalData.rolelst[0].nLevel >= 40) {
        //     return;
        // }
        if (this.guideQueues.length <= 0) {
            return;
        }
        var guide = this.guideQueues[0];
        if (guide.status == guideStep.onReady) {
            guide.start();
            GuideMgr.currentGuide = guide;
        }
        else if (guide.status == guideStep.End) {
            this.save(guide.id);
            this.guideQueues.shift();
            GuideMgr.currentGuide = null;
        }
        else {
            guide.update();
        }
    };
    /**
     * 添加指引到队列里
     */
    GuideMgr.addGuide = function (guide) {
        GuideMgr._instance.guideQueues.push(guide);
    };
    /**
     * 派发触发事件
     */
    GuideMgr.dispatchTiggerEvent = function (tiggerId, data) {
        GuideMgr._instance.tiggerDispatcher.dispatchEventWith(tiggerId.toString(), undefined, data);
    };
    /**
     * 派发uid事件
     */
    GuideMgr.dispatchUidEvent = function (uid) {
        if (GuideMgr._instance && GuideMgr._instance.uidDispatcher) {
            GuideMgr._instance.uidDispatcher.dispatchEventWith(uid.toString(), undefined, uid);
        }
    };
    /**
     * 侦听触发事件
     */
    GuideMgr.addTiggerEventListener = function (tiggerId, func, thisObject) {
        GuideMgr._instance.tiggerDispatcher.addEventListener(tiggerId.toString(), func, thisObject);
    };
    GuideMgr.removeTiggerEventListener = function (tiggerId, func, thisObject) {
        GuideMgr._instance.tiggerDispatcher.removeEventListener(tiggerId, func, thisObject);
    };
    /**
     * 侦听触发事件
     */
    GuideMgr.addUidEventListener = function (uId, func, thisObject) {
        GuideMgr._instance.uidDispatcher.addEventListener(uId.toString(), func, thisObject);
    };
    GuideMgr.removeUidEventListener = function (tiggerId, func, thisObject) {
        GuideMgr._instance.uidDispatcher.removeEventListener(tiggerId, func, thisObject);
    };
    GuideMgr.recordSize = 1;
    return GuideMgr;
}());
__reflect(GuideMgr.prototype, "GuideMgr");
/**
 *ui元素管理器
 * @author
 *  将目标ui绑定到指引系统里，通过事件驱动指引的触发和运行
 *  为全局提供直接访问各个容器子ui的接口
 *
 */
var UIDmgr = (function () {
    function UIDmgr() {
    }
    /**
     * 获取uid对象
     */
    UIDmgr.getUIByUID = function (uid) {
        return UIDmgr.uilst[uid];
    };
    /**
     * 返回指定ui是否被绑定
     */
    UIDmgr.hasBinding = function (disObj, uikey) {
        var obj = UIDmgr.uilst[uikey];
        if (obj) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 接触绑定
     */
    UIDmgr.releaseUID = function (disObj) {
        var uikey = UIDmgr.idlst[disObj.hashCode.toString()];
        if (uikey != undefined) {
            disObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
            UIDmgr.uilst[Number(uikey)] = undefined;
            delete UIDmgr.idlst[disObj.hashCode.toString()];
        }
    };
    /**
     * 设置唯一的UID
     */
    UIDmgr.bindingUID = function (disObj, uikey) {
        var obj = UIDmgr.uilst[uikey];
        if (obj) {
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
            UIDmgr.uilst[Number(uikey)] = undefined;
            delete UIDmgr.idlst[obj.hashCode.toString()];
            // if (obj != disObj) {
            //     throw (new Error("指引ui编号定义重复！" + uikey));
            // }
        } //else {
        UIDmgr.uilst[uikey] = disObj;
        UIDmgr.idlst[disObj.hashCode.toString()] = uikey;
        disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        //}
    };
    /**
     * 占有UID
     */
    UIDmgr.changeUID = function (disObj, uikey) {
        var obj = UIDmgr.uilst[uikey];
        if (obj) {
            delete UIDmgr.idlst[obj.hashCode.toString()];
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        }
        UIDmgr.uilst[uikey] = disObj;
        UIDmgr.idlst[disObj.hashCode.toString()] = uikey;
        disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
    };
    /**
     * 点击绑定ui事件
     */
    UIDmgr.onTouch = function (evt) {
        var target = evt.currentTarget;
        if (target) {
            var id = Number(UIDmgr.idlst[target.hashCode.toString()]);
            if (id == undefined || id === NaN) {
                throw (new Error("指引uid触发错误!"));
            }
            GuideMgr.dispatchUidEvent(id);
        }
    };
    UIDmgr.forceTouch = function (t) {
        var target = t;
        if (target) {
            var id = Number(UIDmgr.idlst[target.hashCode.toString()]);
            if (id == undefined || id === NaN) {
                throw (new Error("指引uid触发错误!"));
            }
            GuideMgr.dispatchUidEvent(id);
        }
    };
    /**
     * 移除事件
     */
    UIDmgr.onRemovedUIDToStage = function (evt) {
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        evt.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        var target = evt.currentTarget;
        if (target) {
            UIDmgr.releaseUID(target);
        }
    };
    UIDmgr.uilst = new Array();
    UIDmgr.idlst = new Object();
    return UIDmgr;
}());
__reflect(UIDmgr.prototype, "UIDmgr");
/**
 * 指引动画
 */
var Pointer = (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        var _this = _super.call(this) || this;
        /**
         * 指向
         */
        _this.obj = {};
        var obj = ConfigMgr.gameConfig["globalConfig"];
        _this.pointerURL = ParamMgr.gameSynRes + "/assets/model/other/10019.json?v=" + obj.otherVer;
        RES.getResByUrl(_this.pointerURL, _this.onJson, _this, RES.ResourceItem.TYPE_JSON);
        return _this;
    }
    /**
     * 加载完json
     */
    Pointer.prototype.onJson = function (data, url) {
        if (url == this.pointerURL) {
            this.pointerJson = data;
            RES.getResByUrl(this.pointerURL.replace("json", "png"), this.onPng, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    /**
     * 加载完Png
     */
    Pointer.prototype.onPng = function (data, url) {
        var mcDataFactory;
        // if (url.indexOf("pointer") != -1) {
        mcDataFactory = new egret.MovieClipDataFactory(this.pointerJson, data);
        this.pointer = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        this.addChild(this.pointer);
        this.pointer.frameRate = 6;
        this.pointer.play(-1);
        // }
        if (this.pointer && this.obj.call)
            this.pointerTo(this.obj.target, this.obj.parent, this.act);
    };
    Pointer.prototype.pointerTo = function (target, parent, ac) {
        this.act = ac;
        if (!target.stage || !this.pointer) {
            this.obj.target = target;
            this.obj.parent = parent;
            return;
        }
        var container;
        var tx;
        var ty;
        if (parent) {
            {
                container = UIDmgr.getUIByUID(parent);
                tx = target.x;
                ty = target.y;
            }
        }
        else {
            container = target.stage;
            var p = target.parent.localToGlobal(target.x, target.y);
            tx = p.x;
            ty = p.y;
        }
        container.addChild(this);
        this.bounds = target.getTransformedBounds(container, this.bounds);
        this.bounds.width *= target.scaleX;
        this.bounds.height *= target.scaleY;
        if (this.act.dir == 0) {
            this.pointer.rotation = 0;
            this.pointer.y = ty + this.bounds.height;
            this.pointer.x = tx + this.bounds.width / 2;
        }
        else if (this.act.dir == 1) {
            this.pointer.rotation = 90;
            this.pointer.x = tx;
            this.pointer.y = ty + this.bounds.height / 2;
        }
        else if (this.act.dir == 2) {
            this.pointer.rotation = 180;
            this.pointer.y = ty;
            this.pointer.x = tx + this.bounds.width / 2;
        }
        else {
            this.pointer.rotation = 270;
            this.pointer.y = ty + this.bounds.height / 2;
            ;
            this.pointer.x = tx + this.bounds.width;
            ;
        }
        if (!this.pointer.isPlaying)
            this.pointer.play(-1);
    };
    Pointer.prototype.hide = function () {
        this.pointer.stop();
        if (this.parent)
            this.parent.removeChild(this);
    };
    return Pointer;
}(egret.Sprite));
__reflect(Pointer.prototype, "Pointer");
//# sourceMappingURL=GuideMgr.js.map